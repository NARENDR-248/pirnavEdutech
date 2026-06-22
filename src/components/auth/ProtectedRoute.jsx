import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";

/**
 * ProtectedRoute — Authentication guard
 *
 * Blocks access to routes that require authentication.
 * Redirects unauthenticated users to /login with the intended
 * destination preserved in the `redirect` query param so we can
 * redirect back after successful login.
 *
 * Props:
 *   - children: The protected content to render (if using composition)
 *
 * Usage (option 1 — element wrapping in routes):
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 *
 * Usage (option 2 — layout with <Outlet />):
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // ── TODO: Replace with real auth check ─────────────────────
  // import { useAuth } from "../../context/AuthContext";
  // const { user, isAuthenticated, isLoading } = useAuth();
  //
  // if (isLoading) return <FullPageSpinner />;
  // if (!isAuthenticated) { ... redirect ... }
  // return children || <Outlet />;

  // Placeholder: for now we simulate a logged-in user.
  // Remove this once the real AuthContext is wired in.
  const isAuthenticated = true; // ← replace with real check

  if (!isAuthenticated) {
    // Preserve the page the user was trying to reach so we can
    // redirect there after login.
    const redirectParam = encodeURIComponent(
      location.pathname + location.search
    );
    return (
      <Navigate
        to={`${ROUTES.AUTH.LOGIN}?redirect=${redirectParam}`}
        replace
      />
    );
  }

  // If children are passed, render them; otherwise render <Outlet />
  // This makes the component flexible for both composition patterns.
  return children || <Outlet />;
};

export default ProtectedRoute;

// eslint-disable-next-line react-refresh/only-export-components
export { ProtectedRoute };
