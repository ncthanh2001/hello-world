import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, Plus, MoreHorizontal, Mail, Phone, Eye, Edit, Trash2, Settings2, Filter, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Column definitions
const columnDefinitions = [
  { id: "customer", label: "Khách hàng", required: true },
  { id: "contact", label: "Liên hệ", required: false },
  { id: "orders", label: "Đơn hàng", required: false },
  { id: "spent", label: "Tổng chi tiêu", required: false },
  { id: "status", label: "Phân loại", required: false },
  { id: "joinedDate", label: "Ngày tham gia", required: false },
];

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
  const { toast } = useToast();
  const [deleteCustomer, setDeleteCustomer] = useState<{ id: number; name: string } | null>(null);
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columnDefinitions.map(col => col.id)
  );
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [minOrders, setMinOrders] = useState<string>("");
  const [maxOrders, setMaxOrders] = useState<string>("");
  const [minSpent, setMinSpent] = useState<string>("");
  const [maxSpent, setMaxSpent] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const isColumnVisible = (columnId: string) => visibleColumns.includes(columnId);

  const toggleColumn = (columnId: string) => {
    const column = columnDefinitions.find(c => c.id === columnId);
    if (column?.required) return;
    
    setVisibleColumns(prev =>
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (statusFilter !== "all") count++;
    if (minOrders) count++;
    if (maxOrders) count++;
    if (minSpent) count++;
    if (maxSpent) count++;
    return count;
  }, [statusFilter, minOrders, maxOrders, minSpent, maxSpent]);

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.phone.includes(query);
        if (!matchesSearch) return false;
      }
      
      // Status filter
      if (statusFilter !== "all" && customer.status !== statusFilter) {
        return false;
      }
      
      // Orders filter
      if (minOrders && customer.totalOrders < parseInt(minOrders)) {
        return false;
      }
      if (maxOrders && customer.totalOrders > parseInt(maxOrders)) {
        return false;
      }
      
      // Spent filter
      if (minSpent && customer.totalSpent < parseInt(minSpent) * 1000000) {
        return false;
      }
      if (maxSpent && customer.totalSpent > parseInt(maxSpent) * 1000000) {
        return false;
      }
      
      return true;
    });
  }, [searchQuery, statusFilter, minOrders, maxOrders, minSpent, maxSpent]);

  const handleDelete = () => {
    if (deleteCustomer) {
      toast({
        title: "Đã xóa",
        description: `Khách hàng ${deleteCustomer.name} đã được xóa`,
      });
      setDeleteCustomer(null);
    }
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setMinOrders("");
    setMaxOrders("");
    setMinSpent("");
    setMaxSpent("");
  };

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-0"
                />
              </div>
              <div className="flex gap-2">
                {/* Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Lọc
                      {activeFilterCount > 0 && (
                        <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground">
                          {activeFilterCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="bg-background">
                    <SheetHeader>
                      <SheetTitle>Bộ lọc</SheetTitle>
                      <SheetDescription>
                        Lọc danh sách khách hàng theo các tiêu chí
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 mt-6">
                      {/* Status Filter */}
                      <div className="space-y-2">
                        <Label>Phân loại khách hàng</Label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Tất cả" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="vip">VIP</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="regular">Khách thường</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Orders Filter */}
                      <div className="space-y-2">
                        <Label>Số đơn hàng</Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Từ"
                            value={minOrders}
                            onChange={(e) => setMinOrders(e.target.value)}
                            className="bg-background"
                          />
                          <Input
                            type="number"
                            placeholder="Đến"
                            value={maxOrders}
                            onChange={(e) => setMaxOrders(e.target.value)}
                            className="bg-background"
                          />
                        </div>
                      </div>

                      {/* Spent Filter */}
                      <div className="space-y-2">
                        <Label>Tổng chi tiêu (triệu VND)</Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Từ"
                            value={minSpent}
                            onChange={(e) => setMinSpent(e.target.value)}
                            className="bg-background"
                          />
                          <Input
                            type="number"
                            placeholder="Đến"
                            value={maxSpent}
                            onChange={(e) => setMaxSpent(e.target.value)}
                            className="bg-background"
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={clearFilters}
                        >
                          Xóa bộ lọc
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() => setIsFilterOpen(false)}
                        >
                          Áp dụng
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Column Visibility */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Settings2 className="h-4 w-4" />
                      Cột
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2 bg-popover" align="end">
                    <div className="space-y-1">
                      <p className="text-sm font-medium px-2 py-1.5 text-muted-foreground">
                        Hiển thị cột
                      </p>
                      {columnDefinitions.map((column) => (
                        <div
                          key={column.id}
                          className={`flex items-center gap-2 p-2 rounded hover:bg-secondary cursor-pointer ${
                            column.required ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          onClick={() => !column.required && toggleColumn(column.id)}
                        >
                          <Checkbox
                            checked={isColumnVisible(column.id)}
                            disabled={column.required}
                            onCheckedChange={() => !column.required && toggleColumn(column.id)}
                          />
                          <span className="text-sm">{column.label}</span>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Button variant="outline">Xuất Excel</Button>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {statusFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    Phân loại: {statusFilter === "vip" ? "VIP" : statusFilter === "premium" ? "Premium" : "Thường"}
                    <button
                      onClick={() => setStatusFilter("all")}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {(minOrders || maxOrders) && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    Đơn hàng: {minOrders || "0"} - {maxOrders || "∞"}
                    <button
                      onClick={() => { setMinOrders(""); setMaxOrders(""); }}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {(minSpent || maxSpent) && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    Chi tiêu: {minSpent || "0"}tr - {maxSpent || "∞"}tr
                    <button
                      onClick={() => { setMinSpent(""); setMaxSpent(""); }}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs text-muted-foreground"
                  onClick={clearFilters}
                >
                  Xóa tất cả
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Danh sách khách hàng ({filteredCustomers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  {isColumnVisible("customer") && (
                    <TableHead className="text-muted-foreground">Khách hàng</TableHead>
                  )}
                  {isColumnVisible("contact") && (
                    <TableHead className="text-muted-foreground">Liên hệ</TableHead>
                  )}
                  {isColumnVisible("orders") && (
                    <TableHead className="text-muted-foreground text-center">Đơn hàng</TableHead>
                  )}
                  {isColumnVisible("spent") && (
                    <TableHead className="text-muted-foreground text-right">Tổng chi tiêu</TableHead>
                  )}
                  {isColumnVisible("status") && (
                    <TableHead className="text-muted-foreground">Phân loại</TableHead>
                  )}
                  {isColumnVisible("joinedDate") && (
                    <TableHead className="text-muted-foreground">Ngày tham gia</TableHead>
                  )}
                  <TableHead className="text-muted-foreground w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell 
                      colSpan={visibleColumns.length + 1} 
                      className="text-center py-8 text-muted-foreground"
                    >
                      Không tìm thấy khách hàng nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="border-border hover:bg-secondary/50">
                      {isColumnVisible("customer") && (
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
                      )}
                      {isColumnVisible("contact") && (
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
                      )}
                      {isColumnVisible("orders") && (
                        <TableCell className="text-center text-card-foreground">
                          {customer.totalOrders}
                        </TableCell>
                      )}
                      {isColumnVisible("spent") && (
                        <TableCell className="text-right text-primary font-medium">
                          {formatCurrency(customer.totalSpent)}
                        </TableCell>
                      )}
                      {isColumnVisible("status") && (
                        <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      )}
                      {isColumnVisible("joinedDate") && (
                        <TableCell className="text-muted-foreground">{customer.joinedDate}</TableCell>
                      )}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem onClick={() => navigate(`/customers/${customer.id}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/customers/${customer.id}/edit`)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => setDeleteCustomer({ id: customer.id, name: customer.name })}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!deleteCustomer} onOpenChange={() => setDeleteCustomer(null)}>
        <AlertDialogContent className="bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa khách hàng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa khách hàng <strong>{deleteCustomer?.name}</strong>? 
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Customers;
