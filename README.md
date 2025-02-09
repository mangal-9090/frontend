# 🌍 Event Platform - Frontend

This is the **React (Vite + TypeScript) frontend** for the **Event Platform**, where users can **register, log in, and manage events** with real-time attendee tracking.

## 🚀 Features
- 🔹 User authentication (Login, Register, Guest Login)
- 🔹 Dashboard with **event filtering** (All, Upcoming, Past)
- 🔹 Event **creation and management**
- 🔹 **Real-time attendee tracking** with WebSockets (Socket.IO)
- 🔹 **Fully responsive UI** using Tailwind CSS

## 📦 Tech Stack
- ⚛️ **React** (Vite + TypeScript)
- 🎨 **Tailwind CSS** (ShadCN components)
- 🔌 **Axios** for API calls
- 🌍 **Socket.IO Client** for real-time updates
- 🔐 **React Query** for state management
- 🛠 **Vercel** for deployment

## 📂 Project Structure
frontend/ │── src/ │ ├── components/ # Reusable UI components │ ├── pages/ # Page-level components │ ├── context/ # Authentication & state management │ ├── services/ # API service functions │ ├── assets/ # Static assets (images, icons) │── public/ # Static public files │── index.html # Main HTML file │── package.json # Project dependencies │── vite.config.ts # Vite configuration