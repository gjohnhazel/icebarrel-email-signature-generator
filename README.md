# Email Signature Generator Deployment Guide

This guide explains how to deploy the Email Signature Generator to an Amazon Linux 2023 Lightsail instance.

## Prerequisites

1. An AWS account with Lightsail access
2. A domain or subdomain pointing to your Lightsail instance (email.icebarrelautomations.com)
3. SSH access to your Lightsail instance
4. GitHub repository access

## Initial Server Setup

1. Connect to your Lightsail instance via SSH:
   ```bash
   ssh -i your-key.pem ec2-user@your-server-ip
   ```

2. Clone this repository:
   ```bash
   git clone https://github.com/gjohnhazel/icebarrel-email-signature-generator.git
   cd icebarrel-email-signature-generator
   ```

3. Run the server setup script:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

   This script will:
   - Install Node.js, Nginx, and PM2
   - Configure Nginx with your domain
   - Set up the application directory
   - Configure PM2 for process management

4. Set up SSL/TLS certificates:
   ```bash
   sudo dnf install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d email.icebarrelautomations.com
   ```

## GitHub Actions Setup

1. In your GitHub repository, go to Settings > Secrets and Variables > Actions

2. Add the following secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
   - `LIGHTSAIL_HOST`: Your server's IP address or hostname
   - `LIGHTSAIL_SSH_KEY`: Your private SSH key for server access

## How It Works

The deployment process is automated using GitHub Actions:

1. When you push to the `main` branch:
   - GitHub Actions runs type checks
   - Builds the application
   - Deploys to your Lightsail server
   - Restarts the application using PM2

2. The application will be available at:
   - https://email.icebarrelautomations.com

## Directory Structure

- `/home/ec2-user/app/` - Application root directory
  - `public/` - Static files
  - `index.js` - Server entry point
  - `ecosystem.config.js` - PM2 configuration

## Useful Commands

Check application status:
```bash
# View PM2 processes
pm2 list

# View application logs
pm2 logs email-signature

# Check Nginx status
sudo systemctl status nginx

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
```

## Troubleshooting

1. If the application isn't responding:
   ```bash
   # Check PM2 status
   pm2 list
   pm2 logs email-signature

   # Restart the application
   pm2 restart email-signature
   ```

2. If Nginx shows errors:
   ```bash
   # Test Nginx configuration
   sudo nginx -t

   # Check Nginx logs
   sudo tail -f /var/log/nginx/error.log
   ```

3. SSL/TLS issues:
   ```bash
   # Renew certificates
   sudo certbot renew --dry-run
   ```

## Environment Variables

Create a `.env` file in `/home/ec2-user/app/` with your environment variables:
```bash
NODE_ENV=production
PORT=3000
# Add other environment variables here
```

## Maintenance

- SSL certificates will auto-renew via certbot
- PM2 will automatically restart the application if it crashes
- Nginx is configured to handle proxy and static file serving

## Support

For issues or questions:
1. Check the application logs: `pm2 logs email-signature`
2. Review Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Open an issue in the GitHub repository 