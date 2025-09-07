export const dynamic = "force-dynamic";
import DashboardCard from "@/components/custom/dashboard-card";
import DashboardCharts from "@/components/custom/dashboard-charts";
import { getDashboardStats } from "../action";

const Dashboard = async () => {
  const stats = await getDashboardStats();
  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 space-y-8">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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

      {/* Charts Section - full width, half & half */}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Orders Chart */}
        <div className="flex-1 min-w-0">
          <DashboardCharts
            ordersStats={stats?.data?.ordersStats}
            singleChart="orders"
          />
        </div>

        {/* Revenue Chart */}
        <div className="flex-1 min-w-0">
          <DashboardCharts
            paymentStats={stats?.data?.paymentStats}
            singleChart="payments"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
