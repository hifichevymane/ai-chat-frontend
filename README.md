# AI Chat Frontend

A modern, minimal frontend for an AI chat application, built with React, TypeScript, and Vite. This project provides a fast, developer-friendly environment with hot module replacement, code linting, and Tailwind CSS for styling.

## 🚀 Technologies Used

- [React](https://react.dev/) — UI library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) — Typed superset of JavaScript
- [Vite](https://vitejs.dev/) — Next-generation frontend tooling
- [React Router](https://reactrouter.com/) — Declarative routing for React
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [ofetch](https://github.com/unjs/ofetch) — Lightweight fetch wrapper
- [React Markdown](https://github.com/remarkjs/react-markdown) — Render Markdown in React
- [remark-gfm](https://github.com/remarkjs/remark-gfm) — GitHub Flavored Markdown support
- [ESLint](https://eslint.org/) — Linting utility for JavaScript and TypeScript

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [pnpm](https://pnpm.io/) (used as the package manager)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ai-chat-frontend
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory and set the backend API URL:

```env
VITE_BACKEND_API_URL=https://your-backend-url.com
```

### 4. Run the development server
```bash
pnpm dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### 5. Build for production
```bash
pnpm build
```

### 6. Preview the production build
```bash
pnpm preview
```

## 📋 Scripts
- `pnpm dev` — Start the development server
- `pnpm build` — Build the app for production
- `pnpm preview` — Preview the production build
- `pnpm lint` — Run ESLint on the codebase
