# ShopSmart - Full-Stack E-Commerce Platform

A modern, production-ready e-commerce application with comprehensive CI/CD, automated testing, and cloud deployment.

## Table of Contents

- [Current Repository State (Source of Truth)](#current-repository-state-source-of-truth)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Workflow & CI/CD](#workflow--cicd)
- [Design Decisions](#design-decisions)
- [Challenges & Solutions](#challenges--solutions)
- [Getting Started](#getting-started)
- [GitHub Actions EC2 Deployment](#github-actions-ec2-deployment)

---

## Current Repository State (Source of Truth)

This README contains architecture and process notes. For the exact, current implementation snapshot, use:

- `EXPLANATION.md` (kept aligned to present files)

Current verified state in this repository:

- Frontend: React + Vite storefront with Header, Banner, Product grid, Cart sidebar, Product modal, Footer
- Backend: Express service with `GET /api/health` and `GET /`
- Tests: Vitest (7), Playwright E2E (7), Jest backend (1)
- CI: lint + format + tests + frontend build (Node 18.x and 20.x)
- Deploy: EC2 SSH workflow, server deps install, PM2 restart/start, frontend build, nginx restart

### Commands To Show All Tasks Done

Run this from project root:

```bash
cd /Users/bhavanishanker/shopsmart

echo "===== CLEAN FULL TASK REPORT ====="
echo "[1] Git status" && git status --short
echo "[2] Recent commits" && git log --oneline -n 5

echo "[3] Frontend lint"
cd client && npm run -s lint && echo "PASS: frontend lint"

echo "[4] Frontend format"
npm run -s format:check && echo "PASS: frontend format"

echo "[5] Frontend unit+integration+e2e"
npm run -s test:all && echo "PASS: frontend tests"

echo "[6] Frontend build"
npm run -s build && echo "PASS: frontend build"

echo "[7] Backend lint"
cd ../server && npm run -s lint && echo "PASS: backend lint"

echo "[8] Backend format"
npm run -s format:check && echo "PASS: backend format"

echo "[9] Backend tests"
npm test --silent && echo "PASS: backend tests"

echo "===== CLEAN REPORT COMPLETE ====="
```

For cleaner E2E logs, start backend first:

```bash
# Terminal 1
npm --prefix /Users/bhavanishanker/shopsmart/server start

# Terminal 2
cd /Users/bhavanishanker/shopsmart/client
npm run -s test:e2e
```

---

## Architecture

### High-Level System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Repository                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Source Code (React + Express)                           │   │
│  │  - Frontend: React + Vite + Vitest                        │   │
│  │  - Backend: Express.js + Jest                             │   │
│  │  - Tests: Unit + Integration + E2E (Playwright)           │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ (push to main)
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│        GitHub Actions: CI Pipeline (.github/workflows/)          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  1. Lint (ESLint)                                         │   │
│  │  2. Format Check (Prettier)                              │   │
│  │  3. Unit Tests (Vitest + Jest)                            │   │
│  │  4. Integration Tests (Real API + DB mocks)              │   │
│  │  5. E2E Tests (Playwright browser simulation)             │   │
│  │  6. Build Verification                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                         │                                         │
│              All checks pass?                                     │
│                    YES ↓                                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Deploy To EC2 Workflow (SSH + PM2)                       │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│        AWS EC2 Instance (Production)                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  ShopSmart Backend (Node.js + Express)                    │   │
│  │  - Running via PM2 process manager                        │   │
│  │  - API Health Endpoint: /api/health                       │   │
│  │  - CORS enabled for frontend communication               │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            ↑
                            │ (HTTP API calls)
                            │
┌─────────────────────────────────────────────────────────────────┐
│        Frontend (Vercel or Browser)                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React App (Vite)                                         │   │
│  │  - Fetches http://44.200.47.10:5001/api/health           │   │
│  │  - Displays Backend Status                               │   │
│  │  - VITE_API_URL env var for routing                       │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Breakdown

**Backend:**

- Express.js REST API
- middleware: CORS, JSON parser
- Endpoint: GET /api/health (returns status, message, timestamp)
- Port: 5001 (configurable via PORT env var)

**Frontend:**

- React functional component
- useEffect hook for API calls on mount
- Environment-based API URL routing (VITE_API_URL)
- Responsive CSS styling
- Loading state management

**Testing Layers:**

1. **Unit Tests**: Individual function/component behavior in isolation
2. **Integration Tests**: Real service interaction (frontend calls real backend)
3. **E2E Tests**: Browser simulation of full user journey (Playwright)

---

## Project Structure

```
shopsmart/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Main CI pipeline (lint, test, build)
│       └── deploy-ec2.yml         # EC2 deployment automation
├── client/                        # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx               # Main React component
│   │   ├── App.test.jsx           # Basic tests
│   │   ├── __tests__/
│   │   │   ├── unit/             # Isolated component tests
│   │   │   └── integration/       # Real backend integration
│   │   └── index.css              # Styling
│   ├── e2e/
│   │   └── app.spec.js           # Playwright E2E tests
│   ├── package.json
│   ├── vite.config.js
│   └── .eslintrc.cjs
├── server/                        # Backend (Express)
│   ├── src/
│   │   ├── app.js                # Express app setup
│   │   └── index.js              # Server entry point
│   ├── tests/
│   │   └── app.test.js           # API endpoint tests
│   ├── package.json
│   └── .eslintrc.cjs
├── scripts/                       # Deployment & operational scripts (future)
├── .prettierrc.json              # Code formatting rules
├── .prettierignore               # Prettier ignore patterns
└── README.md                     # This file
```

---

## Technology Stack

| Layer               | Technology             | Purpose                  |
| ------------------- | ---------------------- | ------------------------ |
| **Frontend**        | React 18.2             | UI framework             |
|                     | Vite 5.4               | Build tool & dev server  |
|                     | Vitest 1.5             | Unit/integration testing |
| **Backend**         | Express 4.19           | REST API framework       |
|                     | Node.js 18/20          | Runtime                  |
|                     | Jest 29.7              | Backend testing          |
|                     | Supertest 6.3          | HTTP assertion           |
| **Testing**         | @testing-library/react | Component testing        |
|                     | Playwright 1.58        | E2E browser automation   |
| **Linting**         | ESLint 8.57            | Code style enforcer      |
|                     | Prettier 3.3           | Code formatter           |
| **CI/CD**           | GitHub Actions         | Automated pipelines      |
| **Deployment**      | EC2 + PM2              | Production hosting       |
| **Version Control** | Git + GitHub           | Source code management   |

---

## Workflow & CI/CD

### Trigger Events

| Event              | Workflow                              | Action                         |
| ------------------ | ------------------------------------- | ------------------------------ |
| Push to main       | ci.yml (CI) → deploy-ec2.yml (Deploy) | Tests run, then deploy if pass |
| Push to any branch | ci.yml                                | Tests run only (no deploy)     |
| Pull Request       | ci.yml                                | Block merge if tests/lint fail |
| Manual trigger     | deploy-ec2.yml                        | Deploy to EC2 on demand        |

### CI Pipeline Stages (`.github/workflows/ci.yml`)

```
1. Checkout Code
   ↓
2. Setup Node.js (matrix: 18.x, 20.x)
   ↓
3. Install Dependencies (client + server)
   ↓
4. ESLint Check (client + server)
   ↓
5. Prettier Format Check (client + server)
   ↓
6. Run Tests (client + server)
   ↓
7. Build Frontend (Vite)
   ↓
Status: ✅ PASS or ❌ FAIL
```

### Deployment Pipeline (`.github/workflows/deploy-ec2.yml`)

```
Trigger: push to main OR manual workflow_dispatch
   ↓
SSH Connect to EC2 (44.200.47.10)
   ↓
Git Clone (first time) or Pull (subsequent)
   ↓
Checkout main branch
   ↓
npm ci --omit=dev (install production deps only)
   ↓
Restart via:
  - systemctl restart (if service configured)
  - pm2 restart (if PM2 installed) ← Current method
  - nohup npm start (fallback)
   ↓
Status: ✅ Deployed & Running
```

---

## Design Decisions

### 1. **Monorepo Structure (client + server in one repo)**

**Why:** Simplified deployment, unified CI/CD, shared tooling.
**Trade-off:** Harder to scale if frontend/backend teams separate later.

### 2. **Environment-Based API Routing (VITE_API_URL)**

**Why:** Same frontend code works locally (localhost:5001), staging, and production without rebuild.
**Benefit:** Flexibility across environments without code changes.

### 3. **Real Service Integration Tests**

**Why:** Mock tests don't catch real API contract mismatches; booting real Express in tests catches those bugs.
**Cost:** Slightly slower test runs, but critical for system validation.

### 4. **PM2 for Process Management**

**Why:** Auto-restart on crash, persistent logs, easy process naming for multi-app scenarios.
**Alternative Considered:** systemd (works, but PM2 simpler for Node apps).

### 5. **Matrix Testing (Node 18.x + 20.x)**

**Why:** Catches version-specific bugs early (e.g., deprecations, API changes).
**Decision:** Ensures code works on current LTS and latest versions.

### 6. **ESLint + Prettier Enforced on PR**

**Why:** Prevents style bikeshedding, auto-formatting reduces merge conflicts, ensures consistency.
**Implementation:** CI fails if lint/format violations exist; easy fix via prettier --write.

### 7. **Separate CI and Deploy Workflows**

**Why:** Keep build/test logic separate from deployment logic.
**Benefit:** Deploy can be triggered manually without re-running expensive tests.

### 8. **SSH-Based EC2 Connection (No API keys exposed)**

**Why:** Safer than hardcoding server credentials; uses GitHub Secrets.
**Security:** Private key stored only in GitHub, never in code.

---

## Challenges & Solutions

### Challenge 1: Frontend-Backend API Mismatch

**Problem:** Frontend integration tests were mocked; couldn't catch real API contract breaks.
**Solution:** Created `frontend-backend.integration.test.jsx` that boots real Express app, tests actual API response.
**Result:** System-level validation before deployment.

---

### Challenge 2: Development vs. Production Environment Variables

**Problem:** Frontend code running locally needs localhost API, but production needs EC2 IP.
**Solution:** Introduced VITE_API_URL env var in App.jsx; Vite automatically injects it at build time.
**Result:** Same bundle works across environments.

---

### Challenge 3: Code Style Inconsistency Across Team

**Problem:** Different developers had different formatting preferences (semicolons, quotes, indentation).
**Solution:** Added Prettier + ESLint config files; CI enforces on every PR.
**Result:** Consistent codebase, zero style debates.

---

### Challenge 4: Lost Deployment History (No Trace of What Deployed)

**Problem:** Before GitHub Actions, manual deployments weren't logged.
**Solution:** All deployments now go through GitHub Actions with logs; can trace exactly what code is running.
**Result:** Full audit trail, reproducible deployments.

---

### Challenge 5: PM2 Process Management Without Persistent Config

**Problem:** Restarting EC2 would lose PM2 processes.
**Solution:** Deploy script calls `pm2 save` after restart to persist state.
**Result:** Processes auto-restart even after reboot.

---

### Challenge 6: EC2 SSH Key Rotation & Security

**Problem:** Sharing SSH key in chat is risky.
**Solution:** Use GitHub Secrets (encrypted) + remind to rotate key after setup.
**Recommendation:** Move to EC2 Instance Profile IAM role in future (removes key rotation burden).

---

### Challenge 7: Testing Multiple Node Versions

**Problem:** Code works locally on Node 18 but breaks on Node 20 in production.
**Solution:** Set up GitHub Actions matrix with [18.x, 20.x] to catch version-specific issues.
**Result:** Early detection of compatibility problems.

---

## Getting Started

### Prerequisites

- Node.js 18.x or 20.x
- npm 9+
- Git

### Local Development

```bash
# Install dependencies
cd client && npm install
cd ../server && npm install

# Start dev servers (separate terminals)
cd client && npm run dev          # Runs on http://localhost:5173
cd server && npm run dev          # Runs on http://localhost:5001

# Run tests
cd client && npm test             # Unit + integration tests
cd server && npm test             # Backend API tests

# E2E tests (requires frontend running)
cd client && npm run test:e2e
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format:check              # Check formatting
npx prettier --write .           # Auto-fix formatting
```

---

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
