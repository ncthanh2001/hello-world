import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, ShoppingBag, CreditCard, Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Mock data - in real app, fetch from API
const customersData: Record<number, {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: string;
  joinedDate: string;
  address: string;
  city: string;
  groups: string[];
  source: string;
  notes: string;
  recentOrders: { id: string; date: string; total: number; status: string }[];
}> = {
  1: {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an.nguyen@email.com",
    phone: "0901234567",
    totalOrders: 23,
    totalSpent: 156780000,
    status: "vip",
    joinedDate: "15/03/2023",
    address: "123 Nguyễn Huệ, Quận 1",
    city: "TP. Hồ Chí Minh",
    groups: ["VIP", "Khách sỉ"],
    source: "Facebook",
    notes: "Khách hàng thân thiết, thường mua số lượng lớn",
    recentOrders: [
      { id: "ORD-2024001", date: "15/01/2024", total: 34990000, status: "completed" },
      { id: "ORD-2024002", date: "10/01/2024", total: 12500000, status: "completed" },
      { id: "ORD-2024003", date: "05/01/2024", total: 8900000, status: "completed" },
    ],
  },
  2: {
    id: 2,
    name: "Trần Thị Bình",
    email: "binh.tran@email.com",
    phone: "0912345678",
    totalOrders: 15,
    totalSpent: 98450000,
    status: "premium",
    joinedDate: "22/05/2023",
    address: "456 Lê Lợi, Quận 3",
    city: "TP. Hồ Chí Minh",
    groups: ["Premium"],
    source: "Google",
    notes: "",
    recentOrders: [
      { id: "ORD-2024010", date: "14/01/2024", total: 6490000, status: "processing" },
    ],
  },
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "vip":
      return <Badge className="bg-warning/10 text-warning border-0">VIP</Badge>;
    case "premium":
      return <Badge className="bg-primary/10 text-primary border-0">Premium</Badge>;
    case "completed":
      return <Badge className="bg-success/10 text-success border-0">Hoàn thành</Badge>;
    case "processing":
      return <Badge className="bg-info/10 text-info border-0">Đang xử lý</Badge>;
    default:
      return <Badge variant="secondary">Thường</Badge>;
  }
};

const getInitials = (name: string) => {
  return name.split(' ').slice(-2).map(n => n[0]).join('').toUpperCase();
};

export default function CustomerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const customerId = parseInt(id || "1");
  const customer = customersData[customerId] || customersData[1];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/customers")}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Chi tiết khách hàng</h1>
              <p className="text-muted-foreground">Thông tin đầy đủ về khách hàng</p>
            </div>
          </div>
          <Button onClick={() => navigate(`/customers/${customerId}/edit`)} className="gap-2">
            <Edit className="h-4 w-4" />
            Chỉnh sửa
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Profile Card */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-card-foreground">{customer.name}</h2>
                      {getStatusBadge(customer.status)}
                    </div>
                    <div className="grid gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {customer.address}, {customer.city}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Tham gia từ {customer.joinedDate}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">{customer.totalOrders}</p>
                      <p className="text-sm text-muted-foreground">Đơn hàng</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">{formatCurrency(customer.totalSpent)}</p>
                      <p className="text-sm text-muted-foreground">Tổng chi tiêu</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">Đơn hàng gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customer.recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                    >
                      <div>
                        <p className="font-medium text-card-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-semibold text-card-foreground">{formatCurrency(order.total)}</p>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">Nhóm khách hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {customer.groups.map((group) => (
                    <Badge key={group} variant="secondary">{group}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">Nguồn khách hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-card-foreground">{customer.source}</p>
              </CardContent>
            </Card>

            {customer.notes && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-card-foreground">Ghi chú</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{customer.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
