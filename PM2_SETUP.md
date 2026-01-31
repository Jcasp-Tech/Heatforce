# PM2 Setup Guide

This project includes PM2 configuration for process management in production.

## Prerequisites

Install PM2 globally (if not already installed):
```bash
npm install -g pm2
```

## Build the Application

Before starting with PM2, make sure to build the application:
```bash
npm run build
```

## PM2 Commands

### Start the application
```bash
npm run pm2:start
```
or
```bash
pm2 start ecosystem.config.js
```

### Stop the application
```bash
npm run pm2:stop
```
or
```bash
pm2 stop heatforce-app
```

### Restart the application
```bash
npm run pm2:restart
```
or
```bash
pm2 restart heatforce-app
```

### View logs
```bash
npm run pm2:logs
```
or
```bash
pm2 logs heatforce-app
```

### Monitor the application
```bash
npm run pm2:monit
```
or
```bash
pm2 monit
```

### Delete the application from PM2
```bash
npm run pm2:delete
```
or
```bash
pm2 delete heatforce-app
```

## Other Useful PM2 Commands

### List all running applications
```bash
pm2 list
```

### View detailed information
```bash
pm2 show heatforce-app
```

### Save PM2 process list (for auto-restart on server reboot)
```bash
pm2 save
pm2 startup
```

### Reload application (zero-downtime restart)
```bash
pm2 reload heatforce-app
```

## Configuration

The PM2 configuration is in `ecosystem.config.js`. Key settings:

- **name**: `heatforce-app` - Application name in PM2
- **port**: `6001` - Port the application runs on
- **instances**: `1` - Number of instances (set to `max` for cluster mode)
- **max_memory_restart**: `1G` - Restart if memory exceeds 1GB
- **autorestart**: `true` - Automatically restart on crash
- **logs**: Stored in `./logs/` directory

## Logs

Logs are stored in the `./logs/` directory:
- `pm2-error.log` - Error logs
- `pm2-out.log` - Output logs
- `pm2-combined.log` - Combined logs

Note: The `logs` directory is gitignored and will be created automatically by PM2.
