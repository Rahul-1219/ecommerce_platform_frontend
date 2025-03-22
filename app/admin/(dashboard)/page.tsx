import DashboardCard from "@/components/custom/dashboard-card";
import { getDashboardStats } from "../action";

const Dashboard = async () => {
  const stats = await getDashboardStats();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4 w-full max-w-7xl mx-auto">
      <DashboardCard
        data={{ title: "Total Users", ...stats?.data?.userStats }}
      />
      <DashboardCard
        data={{ title: "Total Categories", ...stats?.data?.categoryStats }}
      />
      <DashboardCard
        data={{ title: "Total Products", ...stats?.data?.productState }}
      />
    </div>
  );
};

export default Dashboard;
