# Brick & Bolt - Demo E-commerce Store

A modern, fast, lightweight Vite + React e-commerce showcase application designed for reliable continuous integration and continuous deployment (CI/CD) on Vercel.

## Features

- **Frontend-Only Architecture**: Zero backend servers, zero databases, and zero external API dependencies.
- **Instant Client-Side Interactions**:
  - Live search across titles, categories, and tags.
  - Category navigation and scale filters (`1:8 Scale`, `1:10 Scale`, etc.).
  - Sort by Popularity, Price (Low to High / High to Low), or Name.
  - Interactive shopping cart with item increment/decrement, subtotal calculation, and order simulation.
  - Dark / Light mode toggle with automatic system preference detection.
- **Zero Environment Variables Required**: Ready to build and deploy immediately.

---

## Local Development

From the repository root:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## Production Build

To test the production build locally:

```bash
cd frontend
npm run build
npm run preview
```

---

## Vercel Deployment Settings

When importing this repository into [Vercel](https://vercel.com):

| Setting | Value |
| --- | --- |
| **Framework Preset** | Vite |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Environment Variables** | *(None needed)* |

---

## Project Structure

```
toys-voiceai/
├── .gitignore
├── README.md
└── frontend/
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vite.config.js
    ├── public/
    │   └── images/
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── data/
        │   └── products.js
        └── components/
            ├── home/
            │   ├── Filters.jsx
            │   ├── Hero.jsx
            │   ├── ProductCard.jsx
            │   └── ProductGrid.jsx
            ├── layout/
            │   ├── Footer.jsx
            │   └── Header.jsx
            └── ui/
                ├── CartModal.jsx
                ├── ScrollProgress.jsx
                └── Toast.jsx
```
