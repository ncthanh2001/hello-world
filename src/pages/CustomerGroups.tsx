import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Users, 
  Percent, 
  Gift, 
  Settings2, 
  Filter, 
  X,
  ChevronRight,
  ChevronDown,
  FolderTree
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Column definitions
const columnDefinitions = [
  { id: "name", label: "Tên nhóm", required: true },
  { id: "description", label: "Mô tả", required: false },
  { id: "customerCount", label: "Số KH", required: false },
  { id: "discount", label: "Giảm giá", required: false },
  { id: "benefits", label: "Quyền lợi", required: false },
];

interface CustomerGroup {
  id: number;
  name: string;
  description: string;
  customerCount: number;
  discount: number;
  benefits: string[];
  color: string;
  parentId: number | null;
  children?: CustomerGroup[];
}

const customerGroups: CustomerGroup[] = [
  {
    id: 1,
    name: "Khách hàng cá nhân",
    description: "Tất cả khách hàng cá nhân",
    customerCount: 1518,
    discount: 0,
    benefits: [],
    color: "primary",
    parentId: null,
  },
  {
    id: 2,
    name: "VIP",
    description: "Khách hàng chi tiêu trên 100 triệu",
    customerCount: 45,
    discount: 15,
    benefits: ["Miễn phí vận chuyển", "Ưu tiên hỗ trợ", "Quà tặng sinh nhật"],
    color: "warning",
    parentId: 1,
  },
  {
    id: 3,
    name: "Premium",
    description: "Khách hàng chi tiêu từ 50-100 triệu",
    customerCount: 128,
    discount: 10,
    benefits: ["Miễn phí vận chuyển đơn > 500k", "Ưu tiên hỗ trợ"],
    color: "info",
    parentId: 1,
  },
  {
    id: 4,
    name: "Thành viên",
    description: "Khách hàng đã đăng ký tài khoản",
    customerCount: 1256,
    discount: 5,
    benefits: ["Tích điểm mua hàng"],
    color: "secondary",
    parentId: 1,
  },
  {
    id: 5,
    name: "Khách mới",
    description: "Khách hàng đăng ký trong 30 ngày",
    customerCount: 89,
    discount: 20,
    benefits: ["Giảm 20% đơn đầu tiên", "Miễn phí vận chuyển"],
    color: "success",
    parentId: 1,
  },
  {
    id: 6,
    name: "Khách hàng doanh nghiệp",
    description: "Tất cả khách hàng doanh nghiệp",
    customerCount: 67,
    discount: 0,
    benefits: [],
    color: "primary",
    parentId: null,
  },
  {
    id: 7,
    name: "Đối tác",
    description: "Đại lý và đối tác kinh doanh",
    customerCount: 12,
    discount: 25,
    benefits: ["Chiết khấu đặc biệt", "Thanh toán sau", "Hỗ trợ chuyên biệt"],
    color: "info",
    parentId: 6,
  },
  {
    id: 8,
    name: "Đại lý cấp 1",
    description: "Đại lý phân phối cấp 1",
    customerCount: 5,
    discount: 30,
    benefits: ["Chiết khấu cao nhất", "Hỗ trợ marketing"],
    color: "warning",
    parentId: 7,
  },
  {
    id: 9,
    name: "Đại lý cấp 2",
    description: "Đại lý phân phối cấp 2",
    customerCount: 7,
    discount: 20,
    benefits: ["Chiết khấu trung bình"],
    color: "secondary",
    parentId: 7,
  },
  {
    id: 10,
    name: "Doanh nghiệp nhỏ",
    description: "Doanh nghiệp mua sỉ quy mô nhỏ",
    customerCount: 35,
    discount: 15,
    benefits: ["Hỗ trợ thanh toán linh hoạt"],
    color: "secondary",
    parentId: 6,
  },
  {
    id: 11,
    name: "Doanh nghiệp lớn",
    description: "Doanh nghiệp mua sỉ quy mô lớn",
    customerCount: 20,
    discount: 20,
    benefits: ["Hỗ trợ thanh toán", "Giao hàng ưu tiên"],
    color: "success",
    parentId: 6,
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

// Build tree structure
const buildTree = (groups: CustomerGroup[]): CustomerGroup[] => {
  const map = new Map<number, CustomerGroup>();
  const roots: CustomerGroup[] = [];

  groups.forEach(group => {
    map.set(group.id, { ...group, children: [] });
  });

  groups.forEach(group => {
    const node = map.get(group.id)!;
    if (group.parentId === null) {
      roots.push(node);
    } else {
      const parent = map.get(group.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(node);
      }
    }
  });

  return roots;
};

// Flatten tree for filtering
const flattenTree = (nodes: CustomerGroup[], level = 0): Array<CustomerGroup & { level: number }> => {
  const result: Array<CustomerGroup & { level: number }> = [];
  nodes.forEach(node => {
    result.push({ ...node, level });
    if (node.children && node.children.length > 0) {
      result.push(...flattenTree(node.children, level + 1));
    }
  });
  return result;
};

const CustomerGroups = () => {
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columnDefinitions.map(col => col.id)
  );

  // Expanded state for tree
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set([1, 6, 7]));

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [discountFilter, setDiscountFilter] = useState<string>("all");
  const [minCustomers, setMinCustomers] = useState<string>("");
  const [maxCustomers, setMaxCustomers] = useState<string>("");
  const [minDiscount, setMinDiscount] = useState<string>("");
  const [maxDiscount, setMaxDiscount] = useState<string>("");
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

  const toggleExpand = (id: number) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allIds = customerGroups.map(g => g.id);
    setExpandedNodes(new Set(allIds));
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (discountFilter !== "all") count++;
    if (minCustomers) count++;
    if (maxCustomers) count++;
    if (minDiscount) count++;
    if (maxDiscount) count++;
    return count;
  }, [discountFilter, minCustomers, maxCustomers, minDiscount, maxDiscount]);

  // Build tree and filter
  const tree = useMemo(() => buildTree(customerGroups), []);
  const flatGroups = useMemo(() => flattenTree(tree), [tree]);

  const filteredGroups = useMemo(() => {
    return flatGroups.filter(group => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          group.name.toLowerCase().includes(query) ||
          group.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Discount category filter
      if (discountFilter !== "all") {
        if (discountFilter === "high" && group.discount < 20) return false;
        if (discountFilter === "medium" && (group.discount < 10 || group.discount >= 20)) return false;
        if (discountFilter === "low" && (group.discount < 1 || group.discount >= 10)) return false;
        if (discountFilter === "none" && group.discount > 0) return false;
      }

      // Customer count filter
      if (minCustomers && group.customerCount < parseInt(minCustomers)) {
        return false;
      }
      if (maxCustomers && group.customerCount > parseInt(maxCustomers)) {
        return false;
      }

      // Discount range filter
      if (minDiscount && group.discount < parseInt(minDiscount)) {
        return false;
      }
      if (maxDiscount && group.discount > parseInt(maxDiscount)) {
        return false;
      }

      return true;
    });
  }, [flatGroups, searchQuery, discountFilter, minCustomers, maxCustomers, minDiscount, maxDiscount]);

  const clearFilters = () => {
    setDiscountFilter("all");
    setMinCustomers("");
    setMaxCustomers("");
    setMinDiscount("");
    setMaxDiscount("");
  };

  // Check if a node should be visible (either it passes filters or has visible children)
  const isNodeVisible = (group: CustomerGroup & { level: number }): boolean => {
    if (group.level === 0) return true;
    
    // Check if all ancestors are expanded
    let currentId = group.parentId;
    while (currentId !== null) {
      if (!expandedNodes.has(currentId)) return false;
      const parent = customerGroups.find(g => g.id === currentId);
      currentId = parent?.parentId ?? null;
    }
    return true;
  };

  const visibleGroups = filteredGroups.filter(isNodeVisible);

  const hasChildren = (id: number) => {
    return customerGroups.some(g => g.parentId === id);
  };

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
                  <p className="text-2xl font-bold text-card-foreground">30%</p>
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
                  <p className="text-2xl font-bold text-card-foreground">
                    {customerGroups.reduce((acc, g) => acc + g.benefits.length, 0)}
                  </p>
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
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm nhóm khách hàng..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-0"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {/* Tree controls */}
                <Button variant="outline" size="sm" onClick={expandAll} className="gap-1">
                  <FolderTree className="h-4 w-4" />
                  Mở tất cả
                </Button>
                <Button variant="outline" size="sm" onClick={collapseAll} className="gap-1">
                  Thu gọn
                </Button>

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
                        Lọc danh sách nhóm khách hàng theo các tiêu chí
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 mt-6">
                      {/* Discount Category Filter */}
                      <div className="space-y-2">
                        <Label>Mức giảm giá</Label>
                        <Select value={discountFilter} onValueChange={setDiscountFilter}>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Tất cả" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="high">Cao (≥20%)</SelectItem>
                            <SelectItem value="medium">Trung bình (10-19%)</SelectItem>
                            <SelectItem value="low">Thấp (1-9%)</SelectItem>
                            <SelectItem value="none">Không giảm (0%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Customer Count Filter */}
                      <div className="space-y-2">
                        <Label>Số khách hàng</Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Từ"
                            value={minCustomers}
                            onChange={(e) => setMinCustomers(e.target.value)}
                            className="bg-background"
                          />
                          <Input
                            type="number"
                            placeholder="Đến"
                            value={maxCustomers}
                            onChange={(e) => setMaxCustomers(e.target.value)}
                            className="bg-background"
                          />
                        </div>
                      </div>

                      {/* Discount Range Filter */}
                      <div className="space-y-2">
                        <Label>Phần trăm giảm giá</Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Từ %"
                            value={minDiscount}
                            onChange={(e) => setMinDiscount(e.target.value)}
                            className="bg-background"
                          />
                          <Input
                            type="number"
                            placeholder="Đến %"
                            value={maxDiscount}
                            onChange={(e) => setMaxDiscount(e.target.value)}
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
                {discountFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    Mức giảm: {
                      discountFilter === "high" ? "Cao" :
                      discountFilter === "medium" ? "Trung bình" :
                      discountFilter === "low" ? "Thấp" : "Không giảm"
                    }
                    <button
                      onClick={() => setDiscountFilter("all")}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {(minCustomers || maxCustomers) && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    Số KH: {minCustomers || "0"} - {maxCustomers || "∞"}
                    <button
                      onClick={() => { setMinCustomers(""); setMaxCustomers(""); }}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {(minDiscount || maxDiscount) && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    Giảm giá: {minDiscount || "0"}% - {maxDiscount || "∞"}%
                    <button
                      onClick={() => { setMinDiscount(""); setMaxDiscount(""); }}
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

        {/* Groups Table with Tree View */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Danh sách nhóm ({visibleGroups.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  {isColumnVisible("name") && (
                    <TableHead className="text-muted-foreground">Tên nhóm</TableHead>
                  )}
                  {isColumnVisible("description") && (
                    <TableHead className="text-muted-foreground">Mô tả</TableHead>
                  )}
                  {isColumnVisible("customerCount") && (
                    <TableHead className="text-muted-foreground text-center">Số KH</TableHead>
                  )}
                  {isColumnVisible("discount") && (
                    <TableHead className="text-muted-foreground text-center">Giảm giá</TableHead>
                  )}
                  {isColumnVisible("benefits") && (
                    <TableHead className="text-muted-foreground">Quyền lợi</TableHead>
                  )}
                  <TableHead className="text-muted-foreground w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleGroups.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={visibleColumns.length + 1}
                      className="text-center py-8 text-muted-foreground"
                    >
                      Không tìm thấy nhóm nào
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleGroups.map((group) => (
                    <TableRow key={group.id} className="border-border hover:bg-secondary/50">
                      {isColumnVisible("name") && (
                        <TableCell>
                          <div 
                            className="flex items-center gap-2"
                            style={{ paddingLeft: `${group.level * 24}px` }}
                          >
                            {hasChildren(group.id) ? (
                              <button
                                onClick={() => toggleExpand(group.id)}
                                className="p-0.5 hover:bg-secondary rounded"
                              >
                                {expandedNodes.has(group.id) ? (
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                )}
                              </button>
                            ) : (
                              <span className="w-5" />
                            )}
                            <Badge className={getColorClass(group.color)}>
                              {group.name}
                            </Badge>
                          </div>
                        </TableCell>
                      )}
                      {isColumnVisible("description") && (
                        <TableCell className="text-muted-foreground max-w-xs">
                          {group.description}
                        </TableCell>
                      )}
                      {isColumnVisible("customerCount") && (
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-card-foreground">{group.customerCount}</span>
                          </div>
                        </TableCell>
                      )}
                      {isColumnVisible("discount") && (
                        <TableCell className="text-center">
                          <span className={`font-semibold ${group.discount > 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                            {group.discount}%
                          </span>
                        </TableCell>
                      )}
                      {isColumnVisible("benefits") && (
                        <TableCell>
                          {group.benefits.length > 0 ? (
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
                          ) : (
                            <span className="text-muted-foreground text-sm">—</span>
                          )}
                        </TableCell>
                      )}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem>Xem khách hàng</DropdownMenuItem>
                            <DropdownMenuItem>Thêm nhóm con</DropdownMenuItem>
                            <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Xóa</DropdownMenuItem>
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
    </DashboardLayout>
  );
};

export default CustomerGroups;
