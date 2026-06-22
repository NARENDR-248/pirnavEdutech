import { Navigate, useLocation, Outlet } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";

/**
 * RoleBasedRoute — Role-based access control guard
 *
 * Renders children / <Outlet /> only if the current user's role
 * matches one of the `allowedRoles` prop. Otherwise redirects
 * to the user's appropriate dashboard.
 *
 * Props:
 *   - allowedRoles: Array of role strings (e.g. ["super-admin", "org-admin"])
 *   - children:     (optional) content to render instead of <Outlet />
 *
 * Usage:
 *   <Route element={<RoleBasedRoute allowedRoles={["super-admin"]} />}>
 *     <Route path="dashboard" element={<SuperAdminDashboard />} />
 *     ...
 *   </Route>
 *
 * Redirect behavior:
 *   - super-admin → /super-admin/dashboard
 *   - org-admin   → /organization/dashboard
 *   - employee    → /employee/dashboard
 *   - unknown     → /login
 */
const RoleBasedRoute = ({ allowedRoles = [], children }) => {
  const location = useLocation();

  // ── TODO: Replace with real role from auth context ─────────
  // const { user } = useAuth();
  // const userRole = user?.role;
  //
  // Placeholder: detect role from URL path (mirrors DashboardLayout.detectRole)
  // Remove this once real AuthContext is wired in.
  const userRole = location.pathname.startsWith("/super-admin")
    ? "super-admin"
    : location.pathname.startsWith("/employee")
    ? "employee"
    : "org-admin";

  const isAllowed = allowedRoles.includes(userRole);

  if (!isAllowed) {
    // Redirect to the user's own dashboard based on their role
    const fallbackMap = {
      "super-admin": ROUTES.SUPER_ADMIN.DASHBOARD,
      "org-admin": ROUTES.ORG_ADMIN.DASHBOARD,
      employee: ROUTES.EMPLOYEE.DASHBOARD,
    };

    const redirectTo = fallbackMap[userRole] || ROUTES.AUTH.LOGIN;

    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children || <Outlet />;
};

export default RoleBasedRoute;

// eslint-disable-next-line react-refresh/only-export-components
export { RoleBasedRoute };
