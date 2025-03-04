import React from "react";
import { createRoot } from "react-dom/client"; // Импортируем createRoot
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";

const root = createRoot(document.getElementById("root")); // Создаём root
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);