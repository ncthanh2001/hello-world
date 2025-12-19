import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Package, CheckCircle, XCircle, Search, Filter, Eye, Download } from "lucide-react";

const orders = [
  {
    id: "ORD-2024001",
    customer: "Nguyễn Văn An",
    email: "an.nguyen@email.com",
    total: 34990000,
    status: "pending",
    items: 3,
    date: "2024-01-15 14:30",
    payment: "COD",
  },
  {
    id: "ORD-2024002",
    customer: "Trần Thị Bình",
    email: "binh.tran@email.com",
    total: 6490000,
    status: "processing",
    items: 1,
    date: "2024-01-15 13:45",
    payment: "Banking",
  },
  {
    id: "ORD-2024003",
    customer: "Lê Minh Châu",
    email: "chau.le@email.com",
    total: 49990000,
    status: "completed",
    items: 2,
    date: "2024-01-15 10:20",
    payment: "Credit Card",
  },
  {
    id: "ORD-2024004",
    customer: "Phạm Đức Dũng",
    email: "dung.pham@email.com",
    total: 11990000,
    status: "cancelled",
    items: 1,
    date: "2024-01-14 16:00",
    payment: "Banking",
  },
  {
    id: "ORD-2024005",
    customer: "Hoàng Thu Hà",
    email: "ha.hoang@email.com",
    total: 31990000,
    status: "processing",
    items: 4,
    date: "2024-01-14 11:30",
    payment: "COD",
  },
  {
    id: "ORD-2024006",
    customer: "Vũ Quang Huy",
    email: "huy.vu@email.com",
    total: 18990000,
    status: "completed",
    items: 2,
    date: "2024-01-14 09:15",
    payment: "Credit Card",
  },
  {
    id: "ORD-2024007",
    customer: "Đặng Thị Kim",
    email: "kim.dang@email.com",
    total: 7490000,
    status: "pending",
    items: 1,
    date: "2024-01-13 20:00",
    payment: "Banking",
  },
  {
    id: "ORD-2024008",
    customer: "Bùi Văn Long",
    email: "long.bui@email.com",
    total: 25990000,
    status: "completed",
    items: 3,
    date: "2024-01-13 15:45",
    payment: "COD",
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

export default function Orders() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Đơn hàng</h1>
            <p className="text-muted-foreground">Quản lý tất cả đơn hàng của bạn</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Xuất Excel
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Chờ xử lý</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">8</p>
                  <p className="text-sm text-muted-foreground">Đang xử lý</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">156</p>
                  <p className="text-sm text-muted-foreground">Hoàn thành</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">5</p>
                  <p className="text-sm text-muted-foreground">Đã hủy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo mã đơn, khách hàng..."
                  className="pl-10 bg-background"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="pending">Chờ xử lý</SelectItem>
                  <SelectItem value="processing">Đang xử lý</SelectItem>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Thanh toán" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="cod">COD</SelectItem>
                  <SelectItem value="banking">Banking</SelectItem>
                  <SelectItem value="card">Credit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Danh sách đơn hàng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead className="hidden md:table-cell">Ngày đặt</TableHead>
                  <TableHead className="hidden sm:table-cell">Thanh toán</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  return (
                    <TableRow key={order.id} className="border-border">
                      <TableCell className="font-medium text-card-foreground">
                        {order.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-card-foreground">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {order.date}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="font-normal">
                          {order.payment}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-card-foreground">
                        {formatCurrency(order.total)}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig.className}>
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
