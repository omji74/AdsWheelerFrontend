# AdsWheeler – Transit & Rickshaw Advertising Platform

Build a modern frontend using **React, Vite, Tailwind CSS, and Lucide Icons**.

### 1. Rickshaw Ad Simulator
- Interactive SVG models for Bajaj CNG Auto and Electric Toto.
- Brand name, slogan, theme colors, and wrap selection: Top Hood, Rear Panel, Full Body.
- Live preview with road glow effects and animations.

### 2. Driver Income Calculator
- Daily distance slider: 40–150 km.
- Vehicle selection: Auto Rickshaw / E-Rickshaw.
- Live monthly payout estimate: ₹3,000–₹6,500, plus annual bonus.

### 3. Role-Based Dashboards
- **Marketplace:** Search, vehicle filters, price sorting, and campaign applications.
- **Driver Portal:** Active campaigns, verification status, contracts, and UPI payments (Paid/Pending).
- **Advertiser Hub:** Reach, impressions, active drivers, campaign management, and one-click application approvals.

### 4. UI & Backend
- Glassmorphism design, neon glow effects, responsive layout, and confetti interactions.
- Backend health indicator using `GET /api/health`.
- Offline demo mode using `localStorage` when the backend is unavailable.

### 5. Run the Project

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Start the backend on port `5001`:

```bash
cd ../AdsWheelerBackend
npm run dev
```

Configure the frontend to proxy `/api` requests to `http://localhost:5001`.