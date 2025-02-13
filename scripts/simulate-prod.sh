#!/bin/bash

# Clean previous builds
rm -rf dist

# Build the application
echo "Building application..."
npm run build

# Create temporary nginx config
echo "Setting up Nginx config..."
cat > nginx.local.conf << EOF
server {
    listen 8080;
    server_name localhost;

    location / {
        proxy_pass http://localhost:5025;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Start the production server
echo "Starting production server..."
NODE_ENV=production PORT=5025 node ../dist/index.js &
SERVER_PID=$!

# Give the server a moment to start
sleep 2

echo "Application running at: http://localhost:5025"
echo "To stop the server, press Ctrl+C"

# Wait for Ctrl+C
trap "kill $SERVER_PID; exit 0" INT
wait 