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
import { Search, Plus, MoreHorizontal, Package } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  {
    id: 1,
    name: "Áo thun nam basic",
    sku: "ATN-001",
    category: "Áo thun",
    price: 250000,
    stock: 150,
    status: "active",
  },
  {
    id: 2,
    name: "Quần jeans slim fit",
    sku: "QJ-002",
    category: "Quần",
    price: 450000,
    stock: 80,
    status: "active",
  },
  {
    id: 3,
    name: "Áo sơ mi công sở",
    sku: "ASM-003",
    category: "Áo sơ mi",
    price: 380000,
    stock: 45,
    status: "active",
  },
  {
    id: 4,
    name: "Váy đầm dự tiệc",
    sku: "VD-004",
    category: "Váy đầm",
    price: 650000,
    stock: 0,
    status: "out_of_stock",
  },
  {
    id: 5,
    name: "Áo khoác bomber",
    sku: "AK-005",
    category: "Áo khoác",
    price: 520000,
    stock: 30,
    status: "active",
  },
  {
    id: 6,
    name: "Quần short thể thao",
    sku: "QS-006",
    category: "Quần",
    price: 180000,
    stock: 5,
    status: "low_stock",
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
    case "active":
      return <Badge className="bg-success/10 text-success border-0">Đang bán</Badge>;
    case "out_of_stock":
      return <Badge className="bg-destructive/10 text-destructive border-0">Hết hàng</Badge>;
    case "low_stock":
      return <Badge className="bg-warning/10 text-warning border-0">Sắp hết</Badge>;
    default:
      return <Badge variant="secondary">Ẩn</Badge>;
  }
};

const Products = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Sản phẩm</h1>
            <p className="text-muted-foreground">Quản lý danh sách sản phẩm của cửa hàng</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Thêm sản phẩm
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
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

        {/* Products Table */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Danh sách sản phẩm ({products.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Sản phẩm</TableHead>
                  <TableHead className="text-muted-foreground">SKU</TableHead>
                  <TableHead className="text-muted-foreground">Danh mục</TableHead>
                  <TableHead className="text-muted-foreground text-right">Giá</TableHead>
                  <TableHead className="text-muted-foreground text-center">Tồn kho</TableHead>
                  <TableHead className="text-muted-foreground">Trạng thái</TableHead>
                  <TableHead className="text-muted-foreground w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="border-border hover:bg-secondary/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-card-foreground">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                    <TableCell className="text-muted-foreground">{product.category}</TableCell>
                    <TableCell className="text-right text-primary font-medium">
                      {formatCurrency(product.price)}
                    </TableCell>
                    <TableCell className="text-center text-card-foreground">
                      {product.stock}
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
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

export default Products;
