# Deployment Guide

This guide covers deploying your Next.js app and LangGraph agent to various cloud platforms.

## Table of Contents
- [Railway (Recommended)](#railway-recommended)
- [Render](#render)
- [Vercel + Fly.io](#vercel--flyio)
- [Docker Compose (Any Platform)](#docker-compose-any-platform)

---

## Railway (Recommended)

Railway is the easiest option for this monorepo setup with both Next.js and Python services.

### Prerequisites
- Railway account (https://railway.app)
- GitHub repository connected to Railway

### Deployment Steps

1. **Install Railway CLI (optional)**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Create a New Project**
   - Go to https://railway.app/new
   - Connect your GitHub repository
   - Railway will auto-detect your project

3. **Configure Services**

   Railway should auto-create two services from the `railway.toml` config:
   - **web** (Next.js)
   - **agent** (LangGraph)

4. **Set Environment Variables**

   In the Railway dashboard, set these variables for both services:

   **Required:**
   - `OPENAI_API_KEY` - Your OpenAI API key

   **Optional (for LangSmith tracing):**
   - `LANGCHAIN_API_KEY` - Your LangSmith API key
   - `LANGCHAIN_TRACING_V2=true`
   - `LANGCHAIN_PROJECT` - Your project name

   **For Next.js service only:**
   - `NEXT_PUBLIC_AGENT_URL` - Set to the agent service URL (Railway provides this as `${{agent.RAILWAY_PRIVATE_DOMAIN}}` or use public domain)

5. **Deploy**
   ```bash
   railway up
   ```

   Or push to your connected GitHub branch to trigger auto-deploy.

6. **Access Your Apps**
   - Next.js: Railway provides a public URL
   - Agent: Use internal Railway URL for service-to-service communication

### Connecting Services

Railway provides private networking between services. Update your Next.js config to point to the agent:

```typescript
// In your Next.js app
const agentUrl = process.env.NEXT_PUBLIC_AGENT_URL || 'http://localhost:8123';
```

Set `NEXT_PUBLIC_AGENT_URL` to:
- Development: `http://localhost:8123`
- Production: `http://agent.railway.internal:8123` (Railway internal) or the public agent URL

---

## Render

Render offers similar capabilities with a `render.yaml` configuration file.

### Deployment Steps

1. **Create `render.yaml`** in your project root:

```yaml
services:
  # Next.js Web Service
  - type: web
    name: web
    runtime: node
    buildCommand: npm install && npm run build
    startCommand: npm run start
    envVars:
      - key: OPENAI_API_KEY
        sync: false
      - key: NEXT_PUBLIC_AGENT_URL
        value: https://agent.onrender.com
    healthCheckPath: /

  # LangGraph Agent Service
  - type: web
    name: agent
    runtime: docker
    dockerfilePath: ./agent/Dockerfile
    dockerContext: ./agent
    envVars:
      - key: OPENAI_API_KEY
        sync: false
      - key: LANGCHAIN_API_KEY
        sync: false
      - key: LANGCHAIN_TRACING_V2
        value: true
    healthCheckPath: /
```

2. **Deploy to Render**
   - Go to https://render.com/new
   - Connect your GitHub repository
   - Render will auto-detect `render.yaml` and create both services

3. **Set Environment Variables** in the Render dashboard

---

## Vercel + Fly.io

Use Vercel for Next.js (optimal) and Fly.io for the Python agent.

### Next.js on Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables** in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_AGENT_URL` - Set to your Fly.io agent URL

### LangGraph Agent on Fly.io

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Create `fly.toml`** in `agent/` directory:

```toml
app = "your-agent-name"
primary_region = "sjc"

[build]
  dockerfile = "Dockerfile"

[env]
  PORT = "8123"

[[services]]
  internal_port = 8123
  protocol = "tcp"

  [[services.ports]]
    port = 80
    handlers = ["http"]

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]

[http_service]
  internal_port = 8123
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
```

3. **Deploy to Fly.io**
   ```bash
   cd agent
   fly launch --no-deploy
   fly secrets set OPENAI_API_KEY=your-key
   fly deploy
   ```

---

## Docker Compose (Any Platform)

For platforms like Google Cloud Run, AWS ECS, or local development.

### Create `docker-compose.yml`

```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.web
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - NEXT_PUBLIC_AGENT_URL=http://agent:8123
    depends_on:
      - agent

  agent:
    build:
      context: ./agent
      dockerfile: Dockerfile
    ports:
      - "8123:8123"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - LANGCHAIN_API_KEY=${LANGCHAIN_API_KEY}
      - LANGCHAIN_TRACING_V2=true
```

### Create `Dockerfile.web` for Next.js

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```

### Run Locally

```bash
docker-compose up
```

### Deploy to Cloud Run (Example)

```bash
# Build and push images
gcloud builds submit --tag gcr.io/PROJECT_ID/web .
gcloud builds submit --tag gcr.io/PROJECT_ID/agent ./agent

# Deploy services
gcloud run deploy web --image gcr.io/PROJECT_ID/web --platform managed
gcloud run deploy agent --image gcr.io/PROJECT_ID/agent --platform managed
```

---

## Environment Variables Reference

### Required for Both Services
- `OPENAI_API_KEY` - Your OpenAI API key

### Optional (LangSmith Tracing)
- `LANGCHAIN_API_KEY` - LangSmith API key
- `LANGCHAIN_TRACING_V2=true` - Enable tracing
- `LANGCHAIN_PROJECT` - Project name in LangSmith

### Next.js Specific
- `NEXT_PUBLIC_AGENT_URL` - URL of the LangGraph agent service

---

## Troubleshooting

### Agent Service Not Starting
- Check that `OPENAI_API_KEY` is set correctly
- Verify Dockerfile builds successfully locally: `docker build -t agent ./agent`
- Check logs for Python dependency issues

### Next.js Can't Connect to Agent
- Verify `NEXT_PUBLIC_AGENT_URL` is set correctly
- For Railway/Render, use internal service URLs for better performance
- Check that agent service is healthy and responding

### Port Conflicts
- Railway/Render automatically assign ports
- For local development, ensure ports 3000 and 8123 are available

---

## Production Checklist

- [ ] Set all required environment variables
- [ ] Configure custom domain (if needed)
- [ ] Enable HTTPS/SSL
- [ ] Set up monitoring/logging
- [ ] Configure auto-scaling (if supported by platform)
- [ ] Set up CI/CD with GitHub Actions (optional)
- [ ] Review and set resource limits
- [ ] Test service-to-service communication
- [ ] Set up backup/disaster recovery plan
