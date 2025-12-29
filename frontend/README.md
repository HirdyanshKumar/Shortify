# Shortify Frontend Documentation

This is the client-side application for **Shortify**, a cyberpunk-themed URL shortener and analytics dashboard. Built with **Next.js 16** and **React 19**, it features immersive 3D visuals, real-time analytics, and a responsive, glassmorphism-inspired UI.

---

## 🎨 Tech Stack & Packages

We leverage the latest modern web technologies to deliver a high-performance and visually stunning experience.

### Core Framework
- **[Next.js 16](https://nextjs.org/)**: The React framework for the web. Used for App Router, server-side rendering, and efficient client navigation.
- **[React 19](https://react.dev/)**: The latest library for building user interfaces.

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[clsx](https://www.npmjs.com/package/clsx) & [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)**: Utilities for constructing className strings conditionally and merging Tailwind classes without conflicts.
- **[lucide-react](https://lucide.dev/)**: Beuatiful, consistent, and lightweight icons.

### Visuals & Animations
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** & **[Drei](https://github.com/pmndrs/drei)**: Renders 3D elements (like the holographic cube on the landing page) using Three.js in React.
- **[GSAP](https://greensock.com/gsap/)**: Industrial-grade animation library used for complex UI transitions and timeline animations.
- **[Lottie React](https://lottiefiles.com/)**: Renders lightweight JSON-based animations.

### Data Visualization
- **[Recharts](https://recharts.org/)**: A composable charting library built on React components. Used in the Analytics dashboard for traffic graphs and distribution pies.

---

## 📂 Project Structure

```bash
frontend/
├── app/                  # Next.js App Router
│   ├── [shortId]/        # Route for handling short link redirects
│   ├── dashboard/        # Authenticated user dashboard
│   │   ├── analytics/    # Detailed analytics page
│   │   └── page.tsx      # Main dashboard view
│   ├── login/            # Login page
│   ├── signup/           # Registration page
│   ├── unlock/           # Password protection unlock page
│   ├── layout.tsx        # Root layout (fonts, global styles)
│   └── page.tsx          # Landing page with 3D hero
├── lib/
│   ├── api.ts            # Centralized API client for backend communication
│   └── utils.ts          # Utility functions (class merging, formatting)
├── public/               # Static assets
└── types/                # TypeScript definitions
```

---

## 🚀 Key Features & Pages

### 1. Landing Page (`/`)
*   **Visuals**: Features a 3D rotating holographic cube and starry background using R3F.
*   **Animations**: GSAP-powered entrance animations for text and buttons.
*   **Functionality**: Entry point to Login or Dashboard.

### 2. Dashboard (`/dashboard`)
*   **URL Management**: Create new short URLs, set custom aliases, and toggle privacy.
*   **List View**: Grid of active Short Links with quick actions (Copy, Delete, Toggle Status, QR Code).
*   **Real-time Updates**: Toggle link status ON/OFF instantly without page reloads.

### 3. Analytics (`/dashboard/analytics/[id]`)
*   **Traffic Chart**: Interactive Area Chart showing engagements over the last 7 days.
*   **Breakdowns**: Pie charts visualizing:
    *   **Device Types** (Mobile vs Desktop)
    *   **Browsers** (Chrome, Safari, etc.)
    *   **Regions** (Traffic by country)
*   **Metrics**: Total clicks, Unique users, and Last active timestamp.

### 4. Redirect & Unlock (`/[shortId]` & `/unlock/...`)
*   **Smart Routing**: Catches short links and queries backend.
*   **Safety Checks**: Handles 404s (Not Found) vs 410s (Expired).
*   **Security**: Redirects password-protected links to the Unlock page to verify credentials before access.

---

## 🔌 API Integration

All backend communication is handled via `lib/api.ts`.

*   **Fetcher**: A wrapper around `fetch` that automatically handles:
    *   Base URL injection.
    *   `Authorization` headers (reading token from `localStorage`).
    *   JSON parsing and error throwing.
*   **API Object**: Organized by domain (`auth`, `url`, `analytics`) for clean usage in components.
    *   Example: `await api.url.create(data)` or `await api.analytics.getSummary(id)`.

---

## 🛠 Setup & Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    Create a `.env` file (optional, defaults to localhost:3000):
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3000/api
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The app will start at `http://localhost:5173`.

4.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```
