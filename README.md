# Vision - Octavision Internal Portal

A premium, highly-responsive web application built to serve as the central hub for Octavision's enterprise tools. This landing page features a dynamic, interactive mobile simulator and a state-of-the-art glassmorphism design system.

##  Key Features

*   **Interactive Mobile Simulator:** A custom CSS-driven phone frame that allows users to demo the app directly from their desktop browser.
*   **Geofenced Check-In Demo:** Real-time React state management simulating a secure, location-aware employee check-in process.
*   **Dynamic Data Rendering:** Highly scalable UI components driven by robust TypeScript data structures.
*   **Premium UI/UX:** Built with modern web design aesthetics including ambient glows, glassmorphism, and responsive Tailwind layouts.
*   **Strict Security Standards:** Information architecture highlighting AES-256 encryption, anti-spoof geofencing, and role-based access control.

##  Tech Stack

*   **Frontend Library:** [React 19](https://react.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) for strict type safety and enhanced developer experience (IntelliSense).
*   **Build Tool:** [Vite](https://vitejs.dev/) for lightning-fast Hot Module Replacement (HMR).
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) for rapid utility-first styling.
*   **Iconography:** [Lucide React](https://lucide.dev/) for crisp, scalable SVG icons.
*   **Linting:** [Oxlint](https://oxc.rs/docs/guide/usage/linter) - A lightning-fast Rust-based linter to ensure code quality.

##  Local Development

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
Open your browser and navigate to the localhost URL provided in your terminal (usually `http://localhost:5173/`).

*Note: To view the website on your mobile device during development, make sure your phone and computer are on the same Wi-Fi network and start the server using `npm run dev -- --host`.*

##  Project Structure

*   `src/App.tsx`: The core brain of the application containing the state logic, data arrays, and UI layout.
*   `src/main.tsx`: The entry point that mounts the React app to the DOM.
*   `src/index.css`: The global stylesheet importing Tailwind CSS.
*   `public/`: Contains static assets like the `logo.svg` and `logo.png` files.

##  License
© 2026 Octavision. All rights reserved.
