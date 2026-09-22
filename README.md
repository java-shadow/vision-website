# Vision - Octavision Internal Portal

A premium, highly-responsive web application built to serve as the central hub for Octavision's enterprise tools. This landing page features a dynamic, interactive mobile simulator and a state-of-the-art glassmorphism design system. 

*Recently upgraded from Vite to a full-stack Next.js architecture.*

## 🚀 Key Features

*   **Interactive Mobile Simulator:** A custom CSS-driven phone frame that allows users to demo the app directly from their desktop browser.
*   **Geofenced Check-In Demo:** Real-time React state management simulating a secure, location-aware employee check-in process.
*   **Dynamic Data Rendering:** Highly scalable UI components driven by robust TypeScript data structures.
*   **Premium UI/UX:** Built with modern web design aesthetics including ambient glows, glassmorphism, and responsive Tailwind layouts.
*   **Strict Security Standards:** Information architecture highlighting AES-256 encryption, anti-spoof geofencing, and role-based access control.

## 💻 Tech Stack

*   **Framework:** [Next.js (App Router)](https://nextjs.org/) for modern React architecture, Server-Side Rendering (SSR), and optimized performance.
*   **Frontend Library:** [React 19](https://react.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) for strict type safety and enhanced developer experience (IntelliSense).
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) for rapid utility-first styling.
*   **Iconography:** [Lucide React](https://lucide.dev/) for crisp, scalable SVG icons.

## 🛠️ Local Development

Follow these steps to run the project locally on your machine:

**1. Clone the repository**
```bash
git clone https://github.com/java-shadow/vision-website.git
cd vision-website
```

**2. Install Dependencies**
Make sure you have Node.js installed, then run:
```bash
npm install
```

**3. Start the Development Server**
```bash
npm run dev
```

**4. View the App**
Open your browser and navigate to the localhost URL provided in your terminal (Next.js usually defaults to `http://localhost:3000/`).

## 📁 Project Structure (Next.js App Router)

*   `src/app/layout.tsx`: The root HTML wrapper that controls global metadata and the base document structure.
*   `src/app/page.tsx`: The core brain of the application containing the state logic (`use client`), data arrays, and UI layout.
*   `src/app/globals.css`: The global stylesheet importing Tailwind CSS directives.
*   `public/`: Contains static assets like the `logo.svg` and `logo.png` files.

## 📄 License
© Octavision. All rights reserved.
