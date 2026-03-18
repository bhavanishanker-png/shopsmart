# Instructions

1. Use SQLITE3 for database storage implementation
1. Use Prisma for ORM
1. Implement at least one full CRUD RESTful API
1. Deploy it on Render for backend and vercel for frontend
1. Resolve CORS issue if needed after deployment

---

## REPO_ACCESS_TOKEN (optional but recommended)

👉 **GitHub Personal Access Token (PAT)**

### Why it's needed

Allows an EC2 instance (or any external server) to clone/pull this private repository without using your main GitHub credentials.

### How to create the token

1. Go to **GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give it a descriptive name (e.g., `shopsmart-ec2-deploy`)
4. Set an appropriate expiration date
5. Under **Select scopes**, check **`repo`** (Full control of private repositories)
6. Click **Generate token** and copy the token immediately (it won't be shown again)

### How to add it as a repository secret (for CI/CD)

1. Go to your GitHub repository → **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `REPO_ACCESS_TOKEN`
4. Value: paste your token
5. Click **Add secret**

The CI workflow will automatically use `REPO_ACCESS_TOKEN` when available, falling back to the default `GITHUB_TOKEN` for public or same-organization workflows.

### How to use it on an EC2 instance

Set the token as an environment variable on your EC2 instance (e.g., in `/etc/environment`, your user profile, or your deployment script) and reference it in the clone URL to avoid exposing the token in shell history:

```bash
export REPO_ACCESS_TOKEN="<your-token>"
git clone https://${REPO_ACCESS_TOKEN}@github.com/bhavanishanker-png/shopsmart.git
```

For subsequent `git pull` operations you can configure the in-memory credential cache so the token is never written to disk:

```bash
git config --global credential.helper "cache --timeout=3600"
git -c credential.helper="!f() { echo username=x-token-auth; echo password=${REPO_ACCESS_TOKEN}; }; f" \
    clone https://github.com/bhavanishanker-png/shopsmart.git
```

> **Security note:** Never hard-code or commit your token to the repository. Always store it as an environment variable or in a secret manager (e.g., AWS Secrets Manager) and reference it at runtime.
