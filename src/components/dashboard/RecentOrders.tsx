import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, CheckCircle, XCircle } from "lucide-react";

const orders = [
  {
    id: "ORD-2024001",
    customer: "Nguyễn Văn An",
    total: 34990000,
    status: "pending",
    time: "2 phút trước",
  },
  {
    id: "ORD-2024002",
    customer: "Trần Thị Bình",
    total: 6490000,
    status: "processing",
    time: "15 phút trước",
  },
  {
    id: "ORD-2024003",
    customer: "Lê Minh Châu",
    total: 49990000,
    status: "completed",
    time: "1 giờ trước",
  },
  {
    id: "ORD-2024004",
    customer: "Phạm Đức Dũng",
    total: 11990000,
    status: "cancelled",
    time: "2 giờ trước",
  },
  {
    id: "ORD-2024005",
    customer: "Hoàng Thu Hà",
    total: 31990000,
    status: "processing",
    time: "3 giờ trước",
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};

const getStatusConfig = (status: string) => {
  switch (status) {
    case "pending":
      return { 
        label: "Chờ xử lý", 
        icon: Clock, 
        className: "bg-warning/10 text-warning border-0" 
      };
    case "processing":
      return { 
        label: "Đang xử lý", 
        icon: Package, 
        className: "bg-info/10 text-info border-0" 
      };
    case "completed":
      return { 
        label: "Hoàn thành", 
        icon: CheckCircle, 
        className: "bg-success/10 text-success border-0" 
      };
    case "cancelled":
      return { 
        label: "Đã hủy", 
        icon: XCircle, 
        className: "bg-destructive/10 text-destructive border-0" 
      };
    default:
      return { 
        label: "Không rõ", 
        icon: Clock, 
        className: "bg-muted text-muted-foreground" 
      };
  }
};

export function RecentOrders() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Đơn hàng gần đây
          </CardTitle>
          <a href="/orders" className="text-sm text-primary hover:underline">
            Xem tất cả
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {orders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <StatusIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-card-foreground">
                      {formatCurrency(order.total)}
                    </p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                  <Badge className={statusConfig.className}>
                    {statusConfig.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}