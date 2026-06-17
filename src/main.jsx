import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { WishlistProvider } from "./context/WishlistContext"
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WishlistProvider>
    {/* ONE ThemeProvider at the root — every child shares the same isDark state */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </WishlistProvider>
  </React.StrictMode>
);
