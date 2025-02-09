import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ Import QueryClientProvider
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import "./index.css"; // Make sure this path is correct

const queryClient = new QueryClient(); // ✅ Create QueryClient instance

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* ✅ Wrap inside QueryClientProvider */}
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
