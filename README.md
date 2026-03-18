# Instructions

1. Use SQLITE3 for database storage implementation
1. Use Prisma for ORM
1. Implement at least one full CRUD RESTful API
1. Deploy it on Render for backend and vercel for frontend
1. Resolve CORS issue if needed after deployment

## GitHub Actions EC2 Deployment

This repository now includes automated EC2 deployment via GitHub Actions:

- Workflow: `.github/workflows/deploy-ec2.yml`
- Trigger: `push` to `main` or manual `workflow_dispatch`
- Behavior on EC2:
  - Pull latest code from `main`
  - Install backend dependencies with `npm ci --omit=dev`
  - Restart service using `systemctl` (if configured), otherwise `pm2`, otherwise `npm start`

### Required GitHub Secrets

- `EC2_HOST`: Public IP or DNS of your EC2 instance
- `EC2_USER`: SSH user (for example `ubuntu`)
- `EC2_SSH_KEY`: Private SSH key (PEM content)
- `EC2_PORT`: SSH port (usually `22`)

Optional:

- `REPO_ACCESS_TOKEN`: Only needed if the repository is private

### Optional GitHub Repository Variables

- `EC2_APP_DIR`: Deploy path on EC2 (default: `~/shopsmart`)
- `EC2_SERVICE_NAME`: systemd service name to restart (without `.service`)
- `EC2_PM2_APP_NAME`: PM2 process name (default: `shopsmart-backend`)
