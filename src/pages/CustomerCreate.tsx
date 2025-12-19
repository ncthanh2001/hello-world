import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function CustomerCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thành công",
      description: "Đã thêm khách hàng mới",
    });
    navigate("/customers");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/customers")}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Thêm khách hàng mới</h1>
            <p className="text-muted-foreground">Điền thông tin để tạo khách hàng</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-card-foreground">Thông tin cơ bản</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Họ</Label>
                      <Input
                        id="firstName"
                        placeholder="Nhập họ"
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Tên</Label>
                      <Input
                        id="lastName"
                        placeholder="Nhập tên"
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      placeholder="0901234567"
                      className="bg-background"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-card-foreground">Địa chỉ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ chi tiết</Label>
                    <Textarea
                      id="address"
                      placeholder="Số nhà, tên đường..."
                      className="bg-background resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">Thành phố</Label>
                      <Select>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Chọn thành phố" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                          <SelectItem value="hanoi">Hà Nội</SelectItem>
                          <SelectItem value="danang">Đà Nẵng</SelectItem>
                          <SelectItem value="cantho">Cần Thơ</SelectItem>
                          <SelectItem value="haiphong">Hải Phòng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">Quận/Huyện</Label>
                      <Input
                        id="district"
                        placeholder="Nhập quận/huyện"
                        className="bg-background"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-card-foreground">Phân loại</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nhóm khách hàng</Label>
                    <Select>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Chọn nhóm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Khách thường</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Nguồn khách hàng</Label>
                    <Select>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Chọn nguồn" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="direct">Trực tiếp</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="referral">Giới thiệu</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-card-foreground">Ghi chú</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Thêm ghi chú về khách hàng..."
                    className="bg-background resize-none"
                    rows={4}
                  />
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/customers")}
                >
                  Hủy
                </Button>
                <Button type="submit" className="flex-1 gap-2">
                  <Save className="h-4 w-4" />
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
