import { createContext, useContext } from "react";
import useTheme from "../hooks/useTheme";

const ThemeContext = createContext(null);

/**
 * ThemeProvider
 * Wrap your <App /> with this once. Every descendant component can then
 * call useThemeContext() to get { isDark, toggle } without prop drilling.
 *
 * Usage in main.jsx / App.jsx:
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 */
export const ThemeProvider = ({ children }) => {
  const theme = useTheme();
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

/**
 * useThemeContext
 * Call this inside any component to get { isDark, toggle }.
 * Example:
 *   const { isDark } = useThemeContext();
 *   <section className={t.section(isDark)}>...</section>
 */
export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return ctx;
};
