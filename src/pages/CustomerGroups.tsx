import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, MoreHorizontal, Users, Percent, Gift } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const customerGroups = [
  {
    id: 1,
    name: "VIP",
    description: "Khách hàng chi tiêu trên 100 triệu",
    customerCount: 45,
    discount: 15,
    benefits: ["Miễn phí vận chuyển", "Ưu tiên hỗ trợ", "Quà tặng sinh nhật"],
    color: "warning",
  },
  {
    id: 2,
    name: "Premium",
    description: "Khách hàng chi tiêu từ 50-100 triệu",
    customerCount: 128,
    discount: 10,
    benefits: ["Miễn phí vận chuyển đơn > 500k", "Ưu tiên hỗ trợ"],
    color: "primary",
  },
  {
    id: 3,
    name: "Thành viên",
    description: "Khách hàng đã đăng ký tài khoản",
    customerCount: 1256,
    discount: 5,
    benefits: ["Tích điểm mua hàng"],
    color: "secondary",
  },
  {
    id: 4,
    name: "Khách mới",
    description: "Khách hàng đăng ký trong 30 ngày",
    customerCount: 89,
    discount: 20,
    benefits: ["Giảm 20% đơn đầu tiên", "Miễn phí vận chuyển"],
    color: "success",
  },
  {
    id: 5,
    name: "Đối tác",
    description: "Đại lý và đối tác kinh doanh",
    customerCount: 12,
    discount: 25,
    benefits: ["Chiết khấu đặc biệt", "Thanh toán sau", "Hỗ trợ chuyên biệt"],
    color: "info",
  },
];

const getColorClass = (color: string) => {
  switch (color) {
    case "warning":
      return "bg-warning/10 text-warning border-0";
    case "primary":
      return "bg-primary/10 text-primary border-0";
    case "success":
      return "bg-success/10 text-success border-0";
    case "info":
      return "bg-info/10 text-info border-0";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const CustomerGroups = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Nhóm khách hàng</h1>
            <p className="text-muted-foreground">Quản lý phân nhóm và ưu đãi cho khách hàng</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Tạo nhóm mới
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tổng nhóm</p>
                  <p className="text-2xl font-bold text-card-foreground">{customerGroups.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Percent className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Giảm giá cao nhất</p>
                  <p className="text-2xl font-bold text-card-foreground">25%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Gift className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tổng ưu đãi</p>
                  <p className="text-2xl font-bold text-card-foreground">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm nhóm khách hàng..."
                className="pl-10 bg-secondary border-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Groups Table */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Danh sách nhóm ({customerGroups.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Tên nhóm</TableHead>
                  <TableHead className="text-muted-foreground">Mô tả</TableHead>
                  <TableHead className="text-muted-foreground text-center">Số KH</TableHead>
                  <TableHead className="text-muted-foreground text-center">Giảm giá</TableHead>
                  <TableHead className="text-muted-foreground">Quyền lợi</TableHead>
                  <TableHead className="text-muted-foreground w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerGroups.map((group) => (
                  <TableRow key={group.id} className="border-border hover:bg-secondary/50">
                    <TableCell>
                      <Badge className={getColorClass(group.color)}>
                        {group.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-xs">
                      {group.description}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-card-foreground">{group.customerCount}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-semibold text-primary">{group.discount}%</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {group.benefits.slice(0, 2).map((benefit, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                        {group.benefits.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{group.benefits.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover">
                          <DropdownMenuItem>Xem khách hàng</DropdownMenuItem>
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

export default CustomerGroups;