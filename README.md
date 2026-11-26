# AMAC Group - Fresh Fruits & Vegetables Company

A modern, high-performance website built with **Next.js 15**, **React 19**, **Tailwind CSS**, and **Node.js** for **AMAC Group**, international growers, packers, and exporters of premium fruits and vegetables.

---

## 🚀 Testing & Deployment Guide

This repository is ready to be tested and deployed immediately across any hosting provider:

### 1. Vercel (Recommended - Zero Configuration)
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Next.js is automatically detected. Click **Deploy**.

### 2. Node.js Server / VPS (Ubuntu, Debian, Windows Server, etc.)
```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Start production server on port 3000
npm start
```

### 3. Docker Deployment
```bash
# Build the Docker container
docker build -t amac-group-web .

# Run the container
docker run -p 3000:3000 amac-group-web
```

### 4. Health Check Endpoint
After deploying, verify the deployment status anytime:
- `GET /api/health` -> Returns JSON status, timestamp, Node.js version, and environment.

---

## 🛠️ Features
- **Modern Responsive Design**: Optimized for mobile, tablet, and desktop viewports.
- **Produce Showcase**: Valencia Oranges, Strawberries, Table Grapes, Pomegranates, Onions, Potatoes, Peppers, Garlic.
- **Specifications Modal**: Direct views of harvest season, packaging options, storage temperatures, and shelf life.
- **Interactive Wholesale RFQ**: Direct quotation form with simulated reference ticket generation.
- **Global Standards**: Highlights GlobalG.A.P., ISO 22000, BRCGS, and cold-chain compliance.
- **SEO & Metadata Ready**: OpenGraph metadata, structured headers, and clean semantic HTML.
