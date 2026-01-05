import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  BookOpen, 
  Video, 
  HelpCircle,
  ChevronRight,
  ExternalLink,
  Clock,
  CheckCircle2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const faqData = [
  {
    category: "Đơn hàng",
    questions: [
      {
        question: "Làm thế nào để tạo đơn hàng mới?",
        answer: "Để tạo đơn hàng mới, bạn vào mục Đơn hàng > Nhấn nút 'Tạo đơn hàng' > Chọn khách hàng và sản phẩm > Xác nhận đơn hàng."
      },
      {
        question: "Làm sao để hủy đơn hàng?",
        answer: "Vào chi tiết đơn hàng cần hủy > Nhấn nút 'Hủy đơn hàng' > Chọn lý do hủy > Xác nhận. Lưu ý: Chỉ có thể hủy đơn hàng ở trạng thái 'Chờ xử lý' hoặc 'Đang xử lý'."
      },
      {
        question: "Cách in hóa đơn và phiếu giao hàng?",
        answer: "Mở chi tiết đơn hàng > Nhấn nút 'In' ở góc phải > Chọn loại tài liệu cần in (Hóa đơn, Phiếu giao hàng, hoặc cả hai)."
      }
    ]
  },
  {
    category: "Sản phẩm",
    questions: [
      {
        question: "Làm thế nào để thêm sản phẩm mới?",
        answer: "Vào mục Sản phẩm > Nhấn 'Thêm sản phẩm' > Điền thông tin sản phẩm (tên, giá, mô tả, hình ảnh) > Lưu sản phẩm."
      },
      {
        question: "Cách quản lý tồn kho?",
        answer: "Trong trang chi tiết sản phẩm, bạn có thể cập nhật số lượng tồn kho. Hệ thống sẽ tự động cảnh báo khi tồn kho thấp dựa trên ngưỡng bạn đã cài đặt."
      },
      {
        question: "Làm sao để tạo biến thể sản phẩm?",
        answer: "Khi thêm/sửa sản phẩm > Bật tùy chọn 'Sản phẩm có biến thể' > Thêm các thuộc tính (màu sắc, kích thước) > Tạo các biến thể với giá và tồn kho riêng."
      }
    ]
  },
  {
    category: "Khách hàng",
    questions: [
      {
        question: "Cách thêm khách hàng mới?",
        answer: "Vào mục Khách hàng > Nhấn 'Thêm khách hàng' > Điền thông tin (họ tên, email, số điện thoại, địa chỉ) > Lưu."
      },
      {
        question: "Làm sao để phân nhóm khách hàng?",
        answer: "Vào Khách hàng > Nhóm khách hàng > Tạo nhóm mới hoặc chọn nhóm có sẵn > Thêm khách hàng vào nhóm để áp dụng ưu đãi riêng."
      }
    ]
  },
  {
    category: "Thanh toán & Vận chuyển",
    questions: [
      {
        question: "Hỗ trợ những phương thức thanh toán nào?",
        answer: "Hệ thống hỗ trợ: Tiền mặt (COD), Chuyển khoản ngân hàng, Ví điện tử (MoMo, ZaloPay, VNPay), và các cổng thanh toán quốc tế."
      },
      {
        question: "Cách tích hợp đơn vị vận chuyển?",
        answer: "Vào Cài đặt > Vận chuyển > Chọn đơn vị vận chuyển > Nhập thông tin API được cung cấp > Kích hoạt để sử dụng."
      }
    ]
  }
];

const guides = [
  {
    title: "Hướng dẫn bắt đầu",
    description: "Các bước cơ bản để thiết lập cửa hàng",
    icon: BookOpen,
    badge: "Cơ bản"
  },
  {
    title: "Quản lý đơn hàng hiệu quả",
    description: "Mẹo xử lý đơn hàng nhanh chóng",
    icon: FileText,
    badge: "Phổ biến"
  },
  {
    title: "Tối ưu danh mục sản phẩm",
    description: "Cách tổ chức sản phẩm khoa học",
    icon: Video,
    badge: "Video"
  },
  {
    title: "Báo cáo và phân tích",
    description: "Đọc hiểu các chỉ số kinh doanh",
    icon: HelpCircle,
    badge: "Nâng cao"
  }
];

export default function Support() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: ""
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Đã gửi yêu cầu hỗ trợ",
      description: "Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.",
    });
    setContactForm({ subject: "", message: "" });
  };

  const filteredFaq = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trung tâm hỗ trợ</h1>
          <p className="text-muted-foreground">
            Tìm câu trả lời hoặc liên hệ đội ngũ hỗ trợ
          </p>
        </div>

        {/* Search */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h2 className="text-xl font-semibold">Bạn cần hỗ trợ gì?</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm câu hỏi, hướng dẫn..."
                  className="pl-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Contact Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Chat trực tuyến</h3>
                  <p className="text-sm text-muted-foreground">Phản hồi trong 5 phút</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Hotline: 1900 1234</h3>
                  <p className="text-sm text-muted-foreground">8:00 - 22:00 hàng ngày</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Email hỗ trợ</h3>
                  <p className="text-sm text-muted-foreground">support@example.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="faq">Câu hỏi thường gặp</TabsTrigger>
            <TabsTrigger value="guides">Hướng dẫn</TabsTrigger>
            <TabsTrigger value="contact">Gửi yêu cầu</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            {(searchQuery ? filteredFaq : faqData).map((category, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, qIdx) => (
                      <AccordionItem key={qIdx} value={`${idx}-${qIdx}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}

            {searchQuery && filteredFaq.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">Không tìm thấy kết quả</h3>
                  <p className="text-muted-foreground mb-4">
                    Thử tìm kiếm với từ khóa khác hoặc gửi yêu cầu hỗ trợ
                  </p>
                  <Button variant="outline">Gửi yêu cầu hỗ trợ</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {guides.map((guide, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <guide.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{guide.title}</h3>
                            <Badge variant="secondary" className="text-xs">{guide.badge}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{guide.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Video hướng dẫn</CardTitle>
                <CardDescription>Xem các video hướng dẫn chi tiết</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-video rounded-lg bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                      <Video className="h-12 w-12 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tài liệu API</CardTitle>
                    <CardDescription>Dành cho nhà phát triển</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Xem tài liệu
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Gửi yêu cầu hỗ trợ</CardTitle>
                    <CardDescription>
                      Mô tả chi tiết vấn đề để chúng tôi hỗ trợ bạn tốt nhất
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitTicket} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Tiêu đề *</Label>
                        <Input
                          id="subject"
                          placeholder="Nhập tiêu đề vấn đề"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Danh mục</Label>
                        <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="">Chọn danh mục</option>
                          <option value="order">Đơn hàng</option>
                          <option value="product">Sản phẩm</option>
                          <option value="payment">Thanh toán</option>
                          <option value="shipping">Vận chuyển</option>
                          <option value="account">Tài khoản</option>
                          <option value="other">Khác</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Nội dung *</Label>
                        <Textarea
                          id="message"
                          placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                          rows={6}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Đính kèm file (tùy chọn)</Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                          <p className="text-sm text-muted-foreground">
                            Kéo thả file hoặc nhấn để chọn
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG, PDF (tối đa 10MB)
                          </p>
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Gửi yêu cầu hỗ trợ
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Thời gian phản hồi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Yêu cầu thường</p>
                        <p className="text-xs text-muted-foreground">24 giờ làm việc</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium">Yêu cầu khẩn cấp</p>
                        <p className="text-xs text-muted-foreground">4 giờ làm việc</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Yêu cầu gần đây</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium">Lỗi thanh toán VNPay</p>
                        <p className="text-xs text-muted-foreground">Đã giải quyết - 2 ngày trước</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium">Cập nhật thông tin cửa hàng</p>
                        <p className="text-xs text-muted-foreground">Đã giải quyết - 5 ngày trước</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
