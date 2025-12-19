import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const customers = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an.nguyen@email.com",
    avatar: "",
    totalSpent: 156780000,
    orders: 23,
    status: "vip",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "binh.tran@email.com",
    avatar: "",
    totalSpent: 98450000,
    orders: 15,
    status: "premium",
  },
  {
    id: 3,
    name: "Lê Minh Châu",
    email: "chau.le@email.com",
    avatar: "",
    totalSpent: 87230000,
    orders: 12,
    status: "premium",
  },
  {
    id: 4,
    name: "Phạm Đức Dũng",
    email: "dung.pham@email.com",
    avatar: "",
    totalSpent: 65890000,
    orders: 9,
    status: "regular",
  },
  {
    id: 5,
    name: "Hoàng Thu Hà",
    email: "ha.hoang@email.com",
    avatar: "",
    totalSpent: 54320000,
    orders: 8,
    status: "regular",
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

export function TopCustomers() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Khách hàng hàng đầu
          </CardTitle>
          <a href="/customers" className="text-sm text-primary hover:underline">
            Xem tất cả
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {customers.map((customer, index) => (
            <div
              key={customer.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground w-6">
                  #{index + 1}
                </span>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={customer.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {getInitials(customer.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-card-foreground">{customer.name}</p>
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-card-foreground">
                    {formatCurrency(customer.totalSpent)}
                  </p>
                  <p className="text-sm text-muted-foreground">{customer.orders} đơn hàng</p>
                </div>
                {getStatusBadge(customer.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}