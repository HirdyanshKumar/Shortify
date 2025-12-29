# Shortify 🚀

> **The Advanced URL Shortening & Analytics Protocol**

Shortify is a production-grade link management platform built with modern web technologies. It combines high-performance URL shortening with immersive cyberpunk aesthetics and deep analytical insights.

---

## ✨ Features

### 🔗 **Link Management**
*   **Custom Aliases**: Create vanity URLs (e.g., `shortify.com/my-brand`).
*   **Smart Redirects**: Instant 301/302 redirection.
*   **QR Codes**: Auto-generated downloadable QR codes for every link.
*   **Password Protection**: Secure your sensitive links with a password access gate.
*   **Status Control**: Instantly activate or deactivate links without deleting them.

### 📊 **Deep Analytics**
*   **Real-time Tracking**: Live click counts and unique visitor metrics.
*   **Geographic Data**: Visual breakdown of traffic by country/region.
*   **Device & Browser**: Detailed analysis of your audience's tech stack (Mobile vs Desktop, Custom User Agents).
*   **Time Series**: Interactive Area Charts showing traffic trends over the last 7 days.

### 🎨 **Modern UI/UX**
*   **Cyberpunk Aesthetic**: Dark mode by default, glassmorphism panels, and neon accents.
*   **3D Visuals**: Interactive Three.js elements on the landing page.
*   **Responsive**: Fully optimized for mobile, tablet, and desktop dashboards.

---

## 🏗 Technology Stack

### **Frontend**
*   **Next.js 16 (App Router)**: Server-Side Rendering (SSR) & React Server Components.
*   **TailwindCSS 4**: High-performance, utility-first styling.
*   **Recharts**: Data visualization library.
*   **React Three Fiber (R3F)**: 3D capabilities.
*   **Framer Motion / GSAP**: Advanced animations.

### **Backend**
*   **Node.js & Express**: Scalable REST API architecture.
*   **MongoDB & Mongoose**: Flexible NoSQL schema for high-volume analytics.
*   **JWT & Bcrypt**: Secure authentication and data encryption.
*   **Redis** (Planned): Caching layer for high-speed redirects.

---

## 🛠 Local Development Setup

Prerequisites: **Node.js v18+**, **MongoDB**, and **npm**.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/shortify.git
cd shortify
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/shortify
JWT_SECRET=supersecretkey_change_me
JWT_EXPIRES_IN=30d
FRONTEND_URL=http://localhost:5173
```

Start the server:
```bash
npm run dev
# Server running at http://localhost:3000
```

### 3. Frontend Setup
Open a new terminal, navigate to frontend, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
BASE_URL=http://localhost:3000
```

Start the client (Vite/Next):
```bash
npm run dev
# App running at http://localhost:5173
```

---

## 🌱 Database Seeding

We provide an automated seed script to populate your local database with sample users, links, and analytics data for testing.

**⚠️ WARNING**: This will clear all existing data in the connected database.

1.  Ensure backend dependencies are installed.
2.  Run the seed script from the `backend/` directory:

```bash
node src/utils/autoSeed.js
```

### 🔑 Demo Credentials
After seeding, use these credentials to log in and explore the populated dashboard:

*   **Email**: `demo@mail.com`
*   **Password**: `password123`

---

## 🤝 Contribution

1.  Fork the repo.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

---

**Developed with ❤️ by Hirdyansh Kumar**
