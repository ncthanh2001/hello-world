import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "Điện thoại",
    price: 34990000,
    sold: 256,
    revenue: 8957440000,
    status: "active",
  },
  {
    id: 2,
    name: "MacBook Pro 14 inch",
    category: "Laptop",
    price: 49990000,
    sold: 128,
    revenue: 6398720000,
    status: "active",
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    category: "Phụ kiện",
    price: 6490000,
    sold: 512,
    revenue: 3322880000,
    status: "active",
  },
  {
    id: 4,
    name: "iPad Pro 12.9 inch",
    category: "Tablet",
    price: 31990000,
    sold: 89,
    revenue: 2847110000,
    status: "low_stock",
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    category: "Đồng hồ",
    price: 11990000,
    sold: 198,
    revenue: 2374020000,
    status: "active",
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
      return <Badge className="bg-success/10 text-success border-0">Còn hàng</Badge>;
    case "low_stock":
      return <Badge className="bg-warning/10 text-warning border-0">Sắp hết</Badge>;
    default:
      return <Badge variant="secondary">Không rõ</Badge>;
  }
};

export function TopProducts() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Sản phẩm bán chạy
          </CardTitle>
          <a href="/products" className="text-sm text-primary hover:underline">
            Xem tất cả
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Sản phẩm</TableHead>
              <TableHead className="text-muted-foreground">Danh mục</TableHead>
              <TableHead className="text-muted-foreground text-right">Giá</TableHead>
              <TableHead className="text-muted-foreground text-right">Đã bán</TableHead>
              <TableHead className="text-muted-foreground text-right">Doanh thu</TableHead>
              <TableHead className="text-muted-foreground">Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-border hover:bg-secondary/50">
                <TableCell className="font-medium text-card-foreground">
                  {product.name}
                </TableCell>
                <TableCell className="text-muted-foreground">{product.category}</TableCell>
                <TableCell className="text-right text-card-foreground">
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell className="text-right text-card-foreground">{product.sold}</TableCell>
                <TableCell className="text-right text-primary font-medium">
                  {formatCurrency(product.revenue)}
                </TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}