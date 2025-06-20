import { AdminDashboard } from "@/pages/AdminDashboard";
import { TeamMemberDashboard } from "@/pages/TeamMemberDashboard";
import { getCurrentUser } from "@/utils/auth";
import { Navigate } from "react-router-dom";

const DashboardWrapper = () => {
  const user = getCurrentUser();
  const roles = user?.roles || [];

  const hasRole = (name: string) => roles.some((r: any) => r.name === name);

  if (hasRole("admin") || hasRole("super_admin")) {
    return <AdminDashboard />;
  }

  if (hasRole("team_viewer")) {
    return <TeamMemberDashboard />;
  }

  return <Navigate to="/login" />; // Redirect to bulletin board if no valid role found
};

export default DashboardWrapper;
