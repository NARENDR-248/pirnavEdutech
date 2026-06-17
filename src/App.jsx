import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
export default function App() {
  return (
  <>
   <AppRoutes/>
   </>
    
   
  );
}

// ─── How Navbar uses the toggle ───────────────────────────────────────────────
//
// In Navbar.jsx, REPLACE:
//
//   const [isDark, setIsDark] = useState(true);
//   const toggleTheme = useCallback(() => setIsDark((d) => !d), []);
//
// WITH:
//
//   import { useThemeContext } from "../hooks/ThemeContext";
//   const { isDark, toggle: toggleTheme } = useThemeContext();
//
// That's it. The ThemeToggle pill and WishlistButton already receive isDark
// as a prop from Navbar, so no other changes needed there.