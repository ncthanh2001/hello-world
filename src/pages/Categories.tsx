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
import { Search, Plus, MoreHorizontal, Layers } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  {
    id: 1,
    name: "Áo thun",
    slug: "ao-thun",
    productCount: 45,
    status: "active",
    description: "Các loại áo thun nam nữ",
  },
  {
    id: 2,
    name: "Quần",
    slug: "quan",
    productCount: 32,
    status: "active",
    description: "Quần jeans, kaki, short",
  },
  {
    id: 3,
    name: "Áo sơ mi",
    slug: "ao-so-mi",
    productCount: 28,
    status: "active",
    description: "Áo sơ mi công sở, casual",
  },
  {
    id: 4,
    name: "Váy đầm",
    slug: "vay-dam",
    productCount: 56,
    status: "active",
    description: "Váy, đầm các loại",
  },
  {
    id: 5,
    name: "Áo khoác",
    slug: "ao-khoac",
    productCount: 18,
    status: "active",
    description: "Áo khoác, jacket, bomber",
  },
  {
    id: 6,
    name: "Phụ kiện",
    slug: "phu-kien",
    productCount: 0,
    status: "inactive",
    description: "Mũ, túi, thắt lưng",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-success/10 text-success border-0">Hoạt động</Badge>;
    case "inactive":
      return <Badge className="bg-muted text-muted-foreground border-0">Ẩn</Badge>;
    default:
      return <Badge variant="secondary">Không xác định</Badge>;
  }
};

const Categories = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Danh mục</h1>
            <p className="text-muted-foreground">Quản lý danh mục sản phẩm</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Thêm danh mục
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm danh mục..."
                  className="pl-10 bg-secondary border-0"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Lọc</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Table */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Danh sách danh mục ({categories.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Danh mục</TableHead>
                  <TableHead className="text-muted-foreground">Slug</TableHead>
                  <TableHead className="text-muted-foreground">Mô tả</TableHead>
                  <TableHead className="text-muted-foreground text-center">Số sản phẩm</TableHead>
                  <TableHead className="text-muted-foreground">Trạng thái</TableHead>
                  <TableHead className="text-muted-foreground w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id} className="border-border hover:bg-secondary/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Layers className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium text-card-foreground">{category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">
                      {category.description}
                    </TableCell>
                    <TableCell className="text-center text-card-foreground">
                      {category.productCount}
                    </TableCell>
                    <TableCell>{getStatusBadge(category.status)}</TableCell>
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

export default Categories;
