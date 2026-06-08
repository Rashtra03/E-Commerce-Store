# SastaBajaar 🛒

A premium, light-mode, glassmorphic E-Commerce React application built with **Vite** and **Tailwind CSS v4**.

## ✨ Features

- **Dynamic Filters**: Live product search and category selection (integrated reactively using React Router `useSearchParams`).
- **Product Management (CRUD)**: Create, read, edit, and delete products easily.
- **Persistent Storage**: Uses `localStorage` to cache products so that your custom created or edited items persist on page reloads.
- **Premium UI/UX**: Designed using modern light glassmorphic interfaces, custom scrollbars, animated dual-revolving loaders, and interactive toast notifications.
- **Fakestore API Integration**: Populates the store with initial mock data on first load.

## 🛠️ Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (with custom `@theme` properties)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **ID Generation**: Nanoid

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone this repository:
   ```bash
   git clone <your-repository-url>
   cd Product_sell
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```
