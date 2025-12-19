import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, MoreHorizontal, Mail, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const customers = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an.nguyen@email.com",
    phone: "0901234567",
    totalOrders: 23,
    totalSpent: 156780000,
    status: "vip",
    joinedDate: "15/03/2023",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "binh.tran@email.com",
    phone: "0912345678",
    totalOrders: 15,
    totalSpent: 98450000,
    status: "premium",
    joinedDate: "22/05/2023",
  },
  {
    id: 3,
    name: "Lê Minh Châu",
    email: "chau.le@email.com",
    phone: "0923456789",
    totalOrders: 12,
    totalSpent: 87230000,
    status: "premium",
    joinedDate: "10/07/2023",
  },
  {
    id: 4,
    name: "Phạm Đức Dũng",
    email: "dung.pham@email.com",
    phone: "0934567890",
    totalOrders: 9,
    totalSpent: 65890000,
    status: "regular",
    joinedDate: "05/09/2023",
  },
  {
    id: 5,
    name: "Hoàng Thu Hà",
    email: "ha.hoang@email.com",
    phone: "0945678901",
    totalOrders: 8,
    totalSpent: 54320000,
    status: "regular",
    joinedDate: "18/10/2023",
  },
  {
    id: 6,
    name: "Vũ Quang Huy",
    email: "huy.vu@email.com",
    phone: "0956789012",
    totalOrders: 6,
    totalSpent: 42150000,
    status: "regular",
    joinedDate: "25/11/2023",
  },
];

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
    default:
      return <Badge variant="secondary">Thường</Badge>;
  }
};

const getInitials = (name: string) => {
  return name.split(' ').slice(-2).map(n => n[0]).join('').toUpperCase();
};

const Customers = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tất cả khách hàng</h1>
            <p className="text-muted-foreground">Quản lý danh sách khách hàng của cửa hàng</p>
          </div>
          <Button className="gap-2" onClick={() => navigate("/customers/create")}>
            <Plus className="h-4 w-4" />
            Thêm khách hàng
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm khách hàng..."
                  className="pl-10 bg-secondary border-0"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Lọc</Button>
                <Button variant="outline">Xuất Excel</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Danh sách khách hàng ({customers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Khách hàng</TableHead>
                  <TableHead className="text-muted-foreground">Liên hệ</TableHead>
                  <TableHead className="text-muted-foreground text-center">Đơn hàng</TableHead>
                  <TableHead className="text-muted-foreground text-right">Tổng chi tiêu</TableHead>
                  <TableHead className="text-muted-foreground">Phân loại</TableHead>
                  <TableHead className="text-muted-foreground">Ngày tham gia</TableHead>
                  <TableHead className="text-muted-foreground w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id} className="border-border hover:bg-secondary/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-card-foreground">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-card-foreground">
                      {customer.totalOrders}
                    </TableCell>
                    <TableCell className="text-right text-primary font-medium">
                      {formatCurrency(customer.totalSpent)}
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{customer.joinedDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover">
                          <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Xóa</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Customers;