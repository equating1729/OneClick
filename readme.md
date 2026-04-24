# Vercel Clone — Custom Deployment Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue?logo=typescript)]()
[![Redis](https://img.shields.io/badge/Redis-Queue-red?logo=redis)]()
[![Cloudflare R2](https://img.shields.io/badge/Cloudflare-R2-orange?logo=cloudflare)]()


A simplified Vercel-like deployment system that builds and serves frontend applications from GitHub repositories using a distributed architecture.

---

## Features

- Deploy projects using a GitHub repository URL  
- Background build system using Redis as a job queue  
- Object storage using Cloudflare R2 (S3-compatible)  
- Automated build pipeline (`npm install` + `npm run build`)  
- Dynamic static file serving via request handler  
- Deployment status tracking  

---

## Architecture

```text
User / Client
      │
      ▼
Upload Server (Port 3000)
      ├── Clone repository
      ├── Upload source files to R2
      └── Push job → Redis
                │
                ▼
             Redis
                │
                ▼
Deploy Server (Worker)
      ├── Download source from R2
      ├── Install dependencies
      ├── Build project
      ├── Upload dist/ to R2
      └── Update deployment status
                │
                ▼
Request Handler (Port 3001)
      ├── Resolve deployment ID
      ├── Fetch files from R2
      └── Serve response
                │
                ▼
              Browser
