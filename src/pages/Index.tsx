import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { TopCustomers } from "@/components/dashboard/TopCustomers";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
} from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tổng quan</h1>
          <p className="text-muted-foreground">Chào mừng trở lại! Đây là tổng quan hoạt động của cửa hàng.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Tổng doanh thu"
            value="1.28 tỷ"
            change={12.5}
            icon={DollarSign}
            iconColor="text-primary"
            iconBgColor="bg-primary/10"
          />
          <StatsCard
            title="Đơn hàng"
            value="1,234"
            change={8.2}
            icon={ShoppingCart}
            iconColor="text-success"
            iconBgColor="bg-success/10"
          />
          <StatsCard
            title="Khách hàng"
            value="5,678"
            change={-2.4}
            icon={Users}
            iconColor="text-warning"
            iconBgColor="bg-warning/10"
          />
          <StatsCard
            title="Sản phẩm"
            value="456"
            change={5.7}
            icon={Package}
            iconColor="text-info"
            iconBgColor="bg-info/10"
          />
        </div>

        {/* Revenue Chart */}
        <RevenueChart />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TopProducts />
          <TopCustomers />
        </div>

        {/* Recent Orders */}
        <RecentOrders />
      </div>
    </DashboardLayout>
  );
};

export default Index;