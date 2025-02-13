#!/bin/bash

# Exit on any error
set -e

echo "Starting server setup..."

# Update system packages
echo "Updating system packages..."
sudo dnf update -y

# Install development tools and required packages
echo "Installing required packages..."
sudo dnf install -y git wget

# Install Node.js using nvm for better version management
echo "Installing Node.js..."
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Reload shell environment
source ~/.bashrc

# Install Node.js
nvm install 18
nvm alias default 18

# Install nginx
echo "Installing and configuring Nginx..."
sudo dnf install -y nginx

# Install PM2 globally
echo "Installing PM2..."
npm install -y pm2 -g

# Create app directory and set permissions
echo "Setting up application directory..."
sudo mkdir -p /home/ec2-user/app
sudo chown ec2-user:ec2-user /home/ec2-user/app

# Configure Nginx with better security headers
echo "Configuring Nginx..."
sudo tee /etc/nginx/conf.d/email-signature.conf << EOF
server {
    listen 80;
    server_name email.icebarrelautomations.com;

    root /home/ec2-user/app/public;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';";

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/x-javascript application/xml;
    gzip_disable "MSIE [1-6]\.";

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Deny access to . files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
EOF

# Remove default Nginx configuration
sudo rm -f /etc/nginx/conf.d/default.conf

# Test Nginx configuration
echo "Testing Nginx configuration..."
sudo nginx -t

# Start and enable Nginx
echo "Starting Nginx..."
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure PM2 to start on boot
echo "Configuring PM2 startup..."
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user

# Create a basic ecosystem file for PM2
echo "Creating PM2 ecosystem file..."
cat > /home/ec2-user/app/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'email-signature',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Print success message
echo "✅ Server setup completed successfully!"
echo
echo "Next steps:"
echo "1. Set up SSL/TLS certificates using certbot:"
echo "   sudo dnf install certbot python3-certbot-nginx -y"
echo "   sudo certbot --nginx -d email.icebarrelautomations.com"
echo "2. Configure environment variables in /home/ec2-user/app/.env"
echo "3. The GitHub Actions workflow will handle the rest of the deployment"
echo
echo "To check status:"
echo "- Nginx status: sudo systemctl status nginx"
echo "- PM2 status: pm2 list"
echo "- Application logs: pm2 logs email-signature" 