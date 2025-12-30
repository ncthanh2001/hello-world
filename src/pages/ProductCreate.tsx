import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  X, 
  Plus, 
  Star, 
  Image as ImageIcon,
  Video,
  Trash2
} from "lucide-react";

// Mock categories data
const availableCategories = [
  { id: "1", name: "Điện thoại" },
  { id: "2", name: "Laptop" },
  { id: "3", name: "Tablet" },
  { id: "4", name: "Phụ kiện" },
  { id: "5", name: "Đồng hồ thông minh" },
  { id: "6", name: "Tai nghe" },
];

// Mock reviews data
const mockReviews = [
  { id: "1", user: "Nguyễn Văn A", rating: 5, comment: "Sản phẩm rất tốt, đóng gói cẩn thận", date: "2024-01-15" },
  { id: "2", user: "Trần Thị B", rating: 4, comment: "Chất lượng ổn, giao hàng nhanh", date: "2024-01-10" },
  { id: "3", user: "Lê Văn C", rating: 5, comment: "Tuyệt vời, sẽ mua lại", date: "2024-01-05" },
];

interface Specification {
  id: string;
  name: string;
  value: string;
}

interface FeatureMedia {
  id: string;
  type: "image" | "video";
  url: string;
  name: string;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  media: FeatureMedia | null;
}

interface MediaFile {
  id: string;
  type: "image" | "video";
  url: string;
  name: string;
}

const ProductCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState<Specification[]>([
    { id: "1", name: "", value: "" }
  ]);
  const [features, setFeatures] = useState<Feature[]>([
    { id: "1", title: "", description: "", media: null }
  ]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);

  // Validation state
  const [errors, setErrors] = useState<{
    productName?: string;
    productCode?: string;
  }>({});

  // Handle category selection
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle specifications
  const addSpecification = () => {
    setSpecifications(prev => [...prev, { id: Date.now().toString(), name: "", value: "" }]);
  };

  const updateSpecification = (id: string, field: "name" | "value", value: string) => {
    setSpecifications(prev => 
      prev.map(spec => spec.id === id ? { ...spec, [field]: value } : spec)
    );
  };

  const removeSpecification = (id: string) => {
    if (specifications.length > 1) {
      setSpecifications(prev => prev.filter(spec => spec.id !== id));
    }
  };

  // Handle features
  const addFeature = () => {
    setFeatures(prev => [...prev, { id: Date.now().toString(), title: "", description: "", media: null }]);
  };

  const updateFeature = (id: string, field: "title" | "description", value: string) => {
    setFeatures(prev => 
      prev.map(feature => feature.id === id ? { ...feature, [field]: value } : feature)
    );
  };

  const handleFeatureMediaUpload = (featureId: string, e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFeatures(prev => 
        prev.map(feature => 
          feature.id === featureId 
            ? { ...feature, media: { id: Date.now().toString(), type, url, name: file.name } }
            : feature
        )
      );
    }
  };

  const removeFeatureMedia = (featureId: string) => {
    setFeatures(prev => 
      prev.map(feature => 
        feature.id === featureId ? { ...feature, media: null } : feature
      )
    );
  };

  const removeFeature = (id: string) => {
    if (features.length > 1) {
      setFeatures(prev => prev.filter(feature => feature.id !== id));
    }
  };

  // Handle media upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file);
        setMediaFiles(prev => [...prev, {
          id: Date.now().toString() + Math.random(),
          type: "image",
          url,
          name: file.name
        }]);
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file);
        setMediaFiles(prev => [...prev, {
          id: Date.now().toString() + Math.random(),
          type: "video",
          url,
          name: file.name
        }]);
      });
    }
  };

  const removeMedia = (id: string) => {
    setMediaFiles(prev => prev.filter(media => media.id !== id));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!productName.trim()) {
      newErrors.productName = "Tên sản phẩm là bắt buộc";
    }
    
    if (!productCode.trim()) {
      newErrors.productCode = "Mã sản phẩm là bắt buộc";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      });
      return;
    }

    // TODO: Save to database
    toast({
      title: "Thành công",
      description: "Đã lưu thông tin sản phẩm",
    });
    navigate("/products");
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} 
      />
    ));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/products")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Thêm sản phẩm mới</h1>
              <p className="text-muted-foreground">Khai báo thông tin chi tiết sản phẩm</p>
            </div>
          </div>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Lưu sản phẩm
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Tên sản phẩm <span className="text-destructive">*</span></Label>
                    <Input
                      id="productName"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Nhập tên sản phẩm"
                      className={errors.productName ? "border-destructive" : ""}
                    />
                    {errors.productName && (
                      <p className="text-sm text-destructive">{errors.productName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productCode">Mã sản phẩm <span className="text-destructive">*</span></Label>
                    <Input
                      id="productCode"
                      value={productCode}
                      onChange={(e) => setProductCode(e.target.value)}
                      placeholder="Nhập mã sản phẩm"
                      className={errors.productCode ? "border-destructive" : ""}
                    />
                    {errors.productCode && (
                      <p className="text-sm text-destructive">{errors.productCode}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả sản phẩm</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Nhập mô tả chi tiết về sản phẩm"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Technical Specifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Thông số kỹ thuật</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm thông số
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {specifications.map((spec, index) => (
                  <div key={spec.id} className="flex items-center gap-3">
                    <Input
                      value={spec.name}
                      onChange={(e) => updateSpecification(spec.id, "name", e.target.value)}
                      placeholder="Tên thông số (VD: Màn hình)"
                      className="flex-1"
                    />
                    <Input
                      value={spec.value}
                      onChange={(e) => updateSpecification(spec.id, "value", e.target.value)}
                      placeholder="Giá trị (VD: 6.7 inch AMOLED)"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSpecification(spec.id)}
                      disabled={specifications.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tính năng sản phẩm</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm tính năng
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <div key={feature.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Tính năng {index + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(feature.id)}
                        disabled={features.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Tiêu đề tính năng</Label>
                      <Input
                        value={feature.title}
                        onChange={(e) => updateFeature(feature.id, "title", e.target.value)}
                        placeholder="VD: Chống nước IP68"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Mô tả</Label>
                      <Textarea
                        value={feature.description}
                        onChange={(e) => updateFeature(feature.id, "description", e.target.value)}
                        placeholder="Mô tả chi tiết về tính năng..."
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Hình ảnh / Video</Label>
                      {feature.media ? (
                        <div className="relative group w-fit">
                          {feature.media.type === "image" ? (
                            <img
                              src={feature.media.url}
                              alt={feature.media.name}
                              className="w-40 h-28 object-cover rounded-lg border"
                            />
                          ) : (
                            <video
                              src={feature.media.url}
                              className="w-40 h-28 object-cover rounded-lg border"
                              controls
                            />
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeFeatureMedia(feature.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className="absolute bottom-2 left-2 text-xs"
                          >
                            {feature.media.type === "image" ? "Ảnh" : "Video"}
                          </Badge>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <div>
                            <input
                              type="file"
                              id={`featureImage-${feature.id}`}
                              accept="image/*"
                              onChange={(e) => handleFeatureMediaUpload(feature.id, e, "image")}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById(`featureImage-${feature.id}`)?.click()}
                            >
                              <ImageIcon className="mr-2 h-4 w-4" />
                              Tải ảnh
                            </Button>
                          </div>
                          <div>
                            <input
                              type="file"
                              id={`featureVideo-${feature.id}`}
                              accept="video/*"
                              onChange={(e) => handleFeatureMediaUpload(feature.id, e, "video")}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById(`featureVideo-${feature.id}`)?.click()}
                            >
                              <Video className="mr-2 h-4 w-4" />
                              Tải video
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Hình ảnh & Video</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("imageUpload")?.click()}
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Tải hình ảnh
                    </Button>
                  </div>
                  <div>
                    <input
                      type="file"
                      id="videoUpload"
                      accept="video/*"
                      multiple
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("videoUpload")?.click()}
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Tải video
                    </Button>
                  </div>
                </div>

                {mediaFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mediaFiles.map((media) => (
                      <div key={media.id} className="relative group">
                        {media.type === "image" ? (
                          <img
                            src={media.url}
                            alt={media.name}
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                        ) : (
                          <video
                            src={media.url}
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeMedia(media.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="absolute bottom-2 left-2 text-xs"
                        >
                          {media.type === "image" ? "Ảnh" : "Video"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                {mediaFiles.length === 0 && (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                    <Upload className="h-10 w-10 mx-auto mb-2" />
                    <p>Kéo thả hoặc click để tải lên hình ảnh và video</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Đánh giá sản phẩm</span>
                  <Badge variant="secondary">{mockReviews.length} đánh giá</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.user}</span>
                        <div className="flex">{renderStars(review.rating)}</div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Danh mục sản phẩm</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableCategories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryToggle(category.id)}
                    />
                    <Label 
                      htmlFor={`category-${category.id}`}
                      className="cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Selected Categories */}
            {selectedCategories.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Danh mục đã chọn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((catId) => {
                      const category = availableCategories.find(c => c.id === catId);
                      return category ? (
                        <Badge key={catId} variant="default" className="flex items-center gap-1">
                          {category.name}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => handleCategoryToggle(catId)}
                          />
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ProductCreate;
