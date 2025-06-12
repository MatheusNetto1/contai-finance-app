// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LaunchesProvider } from "./contexts/LaunchesContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LaunchesProvider>
      <App />
    </LaunchesProvider>
  </React.StrictMode>
);