import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Store, 
  CreditCard, 
  Truck, 
  Bell, 
  Shield, 
  Upload,
  Globe,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Save,
  Plus,
  Trash2,
  Check
} from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    orderNew: true,
    orderStatus: true,
    lowStock: true,
    newsletter: false,
    promotions: true,
    security: true,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cài đặt</h1>
          <p className="text-muted-foreground">Quản lý cài đặt và tùy chỉnh cửa hàng của bạn.</p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="store" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 h-auto flex-wrap">
            <TabsTrigger value="store" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">Cửa hàng</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Thanh toán</span>
            </TabsTrigger>
            <TabsTrigger value="shipping" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Vận chuyển</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Thông báo</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Bảo mật</span>
            </TabsTrigger>
          </TabsList>

          {/* Store Settings */}
          <TabsContent value="store" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-primary" />
                  Thông tin cửa hàng
                </CardTitle>
                <CardDescription>
                  Cập nhật thông tin cơ bản về cửa hàng của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Store Logo */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24 border-2 border-border">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">CS</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Tải lên logo
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG hoặc SVG. Kích thước tối đa 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Tên cửa hàng</Label>
                    <Input id="storeName" defaultValue="CMS Shop" placeholder="Nhập tên cửa hàng" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeSlogan">Slogan</Label>
                    <Input id="storeSlogan" defaultValue="Mua sắm thông minh" placeholder="Nhập slogan" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeDesc">Mô tả cửa hàng</Label>
                  <Textarea 
                    id="storeDesc" 
                    rows={4}
                    defaultValue="Chào mừng bạn đến với CMS Shop - nơi cung cấp các sản phẩm chất lượng với giá cả hợp lý."
                    placeholder="Mô tả về cửa hàng của bạn"
                  />
                </div>

                <Separator />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email liên hệ
                    </Label>
                    <Input id="email" type="email" defaultValue="contact@cmsshop.vn" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Số điện thoại
                    </Label>
                    <Input id="phone" defaultValue="0987 654 321" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Địa chỉ
                  </Label>
                  <Input id="address" defaultValue="123 Nguyễn Văn A, Quận 1, TP.HCM" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                    <Select defaultValue="vnd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vnd">VND - Việt Nam Đồng</SelectItem>
                        <SelectItem value="usd">USD - US Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language" className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      Ngôn ngữ
                    </Label>
                    <Select defaultValue="vi">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Lưu thay đổi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Phương thức thanh toán
                </CardTitle>
                <CardDescription>
                  Quản lý các phương thức thanh toán cho cửa hàng.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* COD */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                      <Truck className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium">Thanh toán khi nhận hàng (COD)</h4>
                      <p className="text-sm text-muted-foreground">Khách hàng thanh toán khi nhận được hàng</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-success border-success">Đang bật</Badge>
                    <Switch defaultChecked />
                  </div>
                </div>

                {/* Bank Transfer */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Chuyển khoản ngân hàng</h4>
                      <p className="text-sm text-muted-foreground">Vietcombank, Techcombank, MB Bank...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-success border-success">Đang bật</Badge>
                    <Switch defaultChecked />
                  </div>
                </div>

                {/* MoMo */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-[#ae2070]/10 flex items-center justify-center">
                      <span className="font-bold text-[#ae2070]">M</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Ví MoMo</h4>
                      <p className="text-sm text-muted-foreground">Thanh toán qua ví điện tử MoMo</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-success border-success">Đang bật</Badge>
                    <Switch defaultChecked />
                  </div>
                </div>

                {/* VNPay */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-[#0066cc]/10 flex items-center justify-center">
                      <span className="font-bold text-[#0066cc]">VN</span>
                    </div>
                    <div>
                      <h4 className="font-medium">VNPay</h4>
                      <p className="text-sm text-muted-foreground">Thanh toán qua cổng VNPay</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-muted-foreground">Tắt</Badge>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Thêm phương thức khác
                </Button>
              </CardContent>
            </Card>

            {/* Bank Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin tài khoản ngân hàng</CardTitle>
                <CardDescription>
                  Thông tin này sẽ hiển thị khi khách hàng chọn thanh toán chuyển khoản.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Ngân hàng</Label>
                    <Select defaultValue="vcb">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vcb">Vietcombank</SelectItem>
                        <SelectItem value="tcb">Techcombank</SelectItem>
                        <SelectItem value="mb">MB Bank</SelectItem>
                        <SelectItem value="acb">ACB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Số tài khoản</Label>
                    <Input id="accountNumber" defaultValue="1234567890" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountName">Tên chủ tài khoản</Label>
                  <Input id="accountName" defaultValue="NGUYEN VAN A" />
                </div>
                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Lưu thay đổi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipping Settings */}
          <TabsContent value="shipping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Đơn vị vận chuyển
                </CardTitle>
                <CardDescription>
                  Quản lý các đơn vị vận chuyển cho cửa hàng.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* GHN */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-[#ff6600]/10 flex items-center justify-center">
                      <span className="font-bold text-[#ff6600] text-sm">GHN</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Giao Hàng Nhanh</h4>
                      <p className="text-sm text-muted-foreground">Giao hàng tiêu chuẩn 2-3 ngày</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-success border-success">Đang bật</Badge>
                    <Switch defaultChecked />
                  </div>
                </div>

                {/* GHTK */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-[#00a65a]/10 flex items-center justify-center">
                      <span className="font-bold text-[#00a65a] text-sm">GHTK</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Giao Hàng Tiết Kiệm</h4>
                      <p className="text-sm text-muted-foreground">Giao hàng tiết kiệm 3-5 ngày</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-success border-success">Đang bật</Badge>
                    <Switch defaultChecked />
                  </div>
                </div>

                {/* J&T */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-[#d71921]/10 flex items-center justify-center">
                      <span className="font-bold text-[#d71921] text-sm">J&T</span>
                    </div>
                    <div>
                      <h4 className="font-medium">J&T Express</h4>
                      <p className="text-sm text-muted-foreground">Giao hàng nhanh toàn quốc</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-muted-foreground">Tắt</Badge>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Thêm đơn vị vận chuyển
                </Button>
              </CardContent>
            </Card>

            {/* Shipping Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Quy tắc vận chuyển</CardTitle>
                <CardDescription>
                  Thiết lập phí vận chuyển và miễn phí ship.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="freeShipMin">Miễn phí ship từ (VNĐ)</Label>
                    <Input id="freeShipMin" type="number" defaultValue="500000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultFee">Phí ship mặc định (VNĐ)</Label>
                    <Input id="defaultFee" type="number" defaultValue="30000" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <h4 className="font-medium">Miễn phí ship toàn quốc</h4>
                    <p className="text-sm text-muted-foreground">Áp dụng cho tất cả đơn hàng</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Lưu thay đổi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Thông báo đơn hàng
                </CardTitle>
                <CardDescription>
                  Quản lý thông báo liên quan đến đơn hàng.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <h4 className="font-medium">Đơn hàng mới</h4>
                    <p className="text-sm text-muted-foreground">Nhận thông báo khi có đơn hàng mới</p>
                  </div>
                  <Switch 
                    checked={notifications.orderNew} 
                    onCheckedChange={(checked) => setNotifications({...notifications, orderNew: checked})}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <h4 className="font-medium">Cập nhật trạng thái đơn hàng</h4>
                    <p className="text-sm text-muted-foreground">Nhận thông báo khi đơn hàng thay đổi trạng thái</p>
                  </div>
                  <Switch 
                    checked={notifications.orderStatus} 
                    onCheckedChange={(checked) => setNotifications({...notifications, orderStatus: checked})}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <h4 className="font-medium">Cảnh báo hết hàng</h4>
                    <p className="text-sm text-muted-foreground">Nhận thông báo khi sản phẩm sắp hết hàng</p>
                  </div>
                  <Switch 
                    checked={notifications.lowStock} 
                    onCheckedChange={(checked) => setNotifications({...notifications, lowStock: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thông báo tiếp thị</CardTitle>
                <CardDescription>
                  Quản lý thông báo tiếp thị và khuyến mãi.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <h4 className="font-medium">Bản tin</h4>
                    <p className="text-sm text-muted-foreground">Nhận bản tin hàng tuần về thị trường</p>
                  </div>
                  <Switch 
                    checked={notifications.newsletter} 
                    onCheckedChange={(checked) => setNotifications({...notifications, newsletter: checked})}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <h4 className="font-medium">Khuyến mãi</h4>
                    <p className="text-sm text-muted-foreground">Nhận thông báo về các chương trình khuyến mãi</p>
                  </div>
                  <Switch 
                    checked={notifications.promotions} 
                    onCheckedChange={(checked) => setNotifications({...notifications, promotions: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thông báo bảo mật</CardTitle>
                <CardDescription>
                  Thông báo liên quan đến bảo mật tài khoản.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <h4 className="font-medium">Đăng nhập mới</h4>
                    <p className="text-sm text-muted-foreground">Nhận thông báo khi có đăng nhập từ thiết bị mới</p>
                  </div>
                  <Switch 
                    checked={notifications.security} 
                    onCheckedChange={(checked) => setNotifications({...notifications, security: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Đổi mật khẩu
                </CardTitle>
                <CardDescription>
                  Cập nhật mật khẩu để bảo vệ tài khoản của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <div className="relative">
                    <Input 
                      id="currentPassword" 
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu hiện tại"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Mật khẩu mới</Label>
                    <Input 
                      id="newPassword" 
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password"
                      placeholder="Xác nhận mật khẩu mới"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Đổi mật khẩu
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Xác thực hai yếu tố (2FA)</CardTitle>
                <CardDescription>
                  Thêm lớp bảo mật bổ sung cho tài khoản của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-success/5">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                      <Check className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium">Xác thực qua ứng dụng</h4>
                      <p className="text-sm text-muted-foreground">Sử dụng Google Authenticator hoặc Authy</p>
                    </div>
                  </div>
                  <Badge className="bg-success text-success-foreground">Đã bật</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                      <Mail className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">Xác thực qua email</h4>
                      <p className="text-sm text-muted-foreground">Nhận mã xác thực qua email</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Thiết lập</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                      <Phone className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">Xác thực qua SMS</h4>
                      <p className="text-sm text-muted-foreground">Nhận mã xác thực qua tin nhắn SMS</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Thiết lập</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Vùng nguy hiểm</CardTitle>
                <CardDescription>
                  Các thao tác không thể hoàn tác.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                  <div>
                    <h4 className="font-medium">Xóa tài khoản</h4>
                    <p className="text-sm text-muted-foreground">Xóa vĩnh viễn tài khoản và tất cả dữ liệu</p>
                  </div>
                  <Button variant="destructive" size="sm" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Xóa tài khoản
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
