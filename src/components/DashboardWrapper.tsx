// components/DashboardWrapper.tsx
import { AdminDashboard } from "@/pages/AdminDashboard";
import { getCurrentUser } from "@/utils/auth";

const DashboardWrapper = () => {
  const user = getCurrentUser();
  const role = user?.role || user?.roles?.[0]?.name;

  switch (role) {
    case "super_admin":
    case "admin":
      return <AdminDashboard />;
    default:
      return <div>User Dashboard Placeholder</div>;
  }
};

export default DashboardWrapper;
