import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Tag,
  Layers,
  UserCheck,
  UsersRound
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  subItems?: { title: string; url: string; icon: React.ElementType }[];
}

const mainNavItems: NavItem[] = [
  { title: "Tổng quan", url: "/", icon: LayoutDashboard },
  { title: "Đơn hàng", url: "/orders", icon: ShoppingCart },
  { title: "Sản phẩm", url: "/products", icon: Package },
  { title: "Danh mục", url: "/categories", icon: Layers },
  { 
    title: "Khách hàng", 
    url: "/customers", 
    icon: Users,
    subItems: [
      { title: "Tất cả khách hàng", url: "/customers", icon: UserCheck },
      { title: "Nhóm khách hàng", url: "/customers/groups", icon: UsersRound },
    ]
  },
  { title: "Khuyến mãi", url: "/promotions", icon: Tag },
  { title: "Báo cáo", url: "/reports", icon: BarChart3 },
  { title: "Nội dung", url: "/content", icon: FileText },
];

const bottomNavItems: NavItem[] = [
  { title: "Cài đặt", url: "/settings", icon: Settings },
  { title: "Hỗ trợ", url: "/support", icon: HelpCircle },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(["Khách hàng"]);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const isParentActive = (item: NavItem) => {
    if (item.subItems) {
      return item.subItems.some(sub => location.pathname === sub.url);
    }
    return isActive(item.url);
  };

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const renderNavItem = (item: NavItem) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openMenus.includes(item.title);
    const parentActive = isParentActive(item);

    if (hasSubItems) {
      return (
        <Collapsible
          key={item.title}
          open={isOpen && !collapsed}
          onOpenChange={() => toggleMenu(item.title)}
        >
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                parentActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.title}</span>
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )} 
                  />
                </>
              )}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pt-1">
            {item.subItems?.map((subItem) => (
              <NavLink
                key={subItem.url}
                to={subItem.url}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ml-4",
                  location.pathname === subItem.url
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <subItem.icon className="h-4 w-4 flex-shrink-0" />
                <span>{subItem.title}</span>
              </NavLink>
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <NavLink
        key={item.title}
        to={item.url}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
          isActive(item.url)
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          collapsed && "justify-center px-2"
        )}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        {!collapsed && <span>{item.title}</span>}
      </NavLink>
    );
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 flex flex-col border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">CMS Admin</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        <ul className="space-y-1 px-3">
          {mainNavItems.map((item) => (
            <li key={item.title}>{renderNavItem(item)}</li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-sidebar-border py-4">
        <ul className="space-y-1 px-3">
          {bottomNavItems.map((item) => (
            <li key={item.title}>{renderNavItem(item)}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}