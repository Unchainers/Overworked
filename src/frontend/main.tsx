import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import "./src/index.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
