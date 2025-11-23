import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Layout/Navigation";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Star,
  ChevronRight,
  Loader2,
  Share2,
  Sparkles,
  Heart,
  Check,
} from "lucide-react";
import BackToTop from "@/components/ui/back-to-top";
import { productService } from "@/lib/db/products";
import { reviewService, Review } from "@/lib/db/reviews";
import { Product } from "@/lib/supabase";
import { useSlideInLeft, useSlideInRight, useFadeIn, useStaggerChildren } from "@/lib/animations/scroll-animations";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    customer_name: "",
    customer_email: "",
    rating: 5,
    comment: "",
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  // Animation refs
  const imageGalleryRef = useSlideInLeft(0);
  const productInfoRef = useSlideInRight(0);
  const featuresRef = useFadeIn(0);
  const specsRef = useFadeIn(0.2);
  const reviewsRef = useFadeIn(0);
  const relatedProductsRef = useStaggerChildren(0, 0.15);

  useEffect(() => {
    if (id) {
      loadProduct();
      loadReviews();
    }
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const fetchedProduct = await productService.getById(id);
      
      if (!fetchedProduct) {
        toast({
          title: "Product Not Found",
          description: "The product you're looking for doesn't exist.",
          variant: "destructive",
        });
        navigate("/products");
        return;
      }

      setProduct(fetchedProduct);

      // Load related products
      if (fetchedProduct.category) {
        const related = await productService.getByCategory(fetchedProduct.category);
        setRelatedProducts(related.filter(p => p.id !== id).slice(0, 3));
      }
    } catch (error) {
      console.error("Error loading product:", error);
      toast({
        title: "Error",
        description: "Failed to load product. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    if (!id) return;
    
    try {
      setLoadingReviews(true);
      const data = await reviewService.getByProduct(id);
      setReviews(data);
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    if (!reviewForm.customer_name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return;
    }

    if (reviewForm.rating < 1 || reviewForm.rating > 5) {
      toast({
        title: "Validation Error",
        description: "Please select a rating.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmittingReview(true);
      await reviewService.create({
        product_id: id,
        customer_name: reviewForm.customer_name.trim(),
        customer_email: reviewForm.customer_email.trim() || undefined,
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim() || undefined,
        is_approved: true,
      });

      toast({
        title: "Thank You!",
        description: "Your review has been submitted successfully.",
      });

      setReviewDialogOpen(false);
      setReviewForm({
        customer_name: "",
        customer_email: "",
        rating: 5,
        comment: "",
      });

      // Reload reviews and product to update rating
      await loadReviews();
      await loadProduct();
    } catch (error) {
      console.error("Error submitting review:", error);
    toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out ${product?.name} on Kashmir Crafts`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Product link copied to clipboard",
    });
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getProductImages = (product: Product): string[] => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    if (product.image_url) {
      return [product.image_url];
    }
    return ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80"];
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const productImages = getProductImages(product);
  // Always use actual loaded reviews count, not the stored count which might be stale
  const reviewsCount = reviews.length;
  // Calculate average rating from actual reviews, fallback to product rating if no reviews
  const averageRating = reviewsCount > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewsCount
    : (product.rating || 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackToTop />

      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.category}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div ref={imageGalleryRef} className="space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 shadow-elegant group">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {product.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-accent text-white border-0 shadow-lg">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                          ? "border-primary shadow-lg scale-105"
                          : "border-transparent hover:border-border opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              )}
            </div>

            {/* Product Info */}
            <div ref={productInfoRef} className="space-y-6">
              <div>
                <Badge className="mb-4 bg-gradient-primary text-white border-0 px-4 py-1.5 text-sm">
                  {product.category}
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(averageRating)
                              ? "fill-accent text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-foreground ml-2">
                      {averageRating.toFixed(1)}
                    </span>
                    {reviewsCount > 0 && (
                      <span className="text-sm text-muted-foreground">
                        ({reviewsCount} {reviewsCount === 1 ? 'review' : 'reviews'})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-baseline gap-4 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10">
                <div>
                  <span className="text-5xl font-bold text-primary">{formatPrice(product.price)}</span>
                  {product.original_price && product.original_price > product.price && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xl text-muted-foreground line-through">
                        {formatPrice(product.original_price)}
                </span>
                      <Badge variant="secondary" className="bg-accent/20 text-accent border-0">
                        Save {Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                </Badge>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleShare}
                  className="flex-1"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
                <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="flex-1 bg-gradient-primary hover:opacity-90"
                    >
                      <Star className="h-5 w-5 mr-2" />
                      Write Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Write a Review</DialogTitle>
                      <DialogDescription>
                        Share your experience with this product
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          value={reviewForm.customer_name}
                          onChange={(e) => setReviewForm({ ...reviewForm, customer_name: e.target.value })}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input
                          id="email"
                          type="email"
                          value={reviewForm.customer_email}
                          onChange={(e) => setReviewForm({ ...reviewForm, customer_email: e.target.value })}
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Rating *</Label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, rating })}
                              className={`p-2 rounded-lg transition-all ${
                                reviewForm.rating >= rating
                                  ? "bg-accent text-white"
                                  : "bg-muted hover:bg-muted/80"
                              }`}
                            >
                              <Star className={`h-5 w-5 ${reviewForm.rating >= rating ? "fill-current" : ""}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="comment">Your Review (Optional)</Label>
                        <Textarea
                          id="comment"
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                          placeholder="Tell us about your experience..."
                          rows={4}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={submittingReview}
                        className="w-full bg-gradient-primary"
                      >
                        {submittingReview ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Review"
                        )}
                </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

            </div>
          </div>

          {/* Product Details Tabs */}
          <Card className="p-8 mb-16 border-0 shadow-elegant bg-gradient-to-br from-background to-primary/5">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50">
                <TabsTrigger value="features" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
                  Features
                </TabsTrigger>
                <TabsTrigger value="specifications" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
                  Reviews {reviewsCount > 0 && `(${reviewsCount})`}
                </TabsTrigger>
              </TabsList>
              <TabsContent ref={featuresRef} value="features" className="space-y-4">
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Key Features
                </h3>
                {product.features && product.features.length > 0 ? (
                <ul className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                ) : (
                  <p className="text-muted-foreground">No features listed.</p>
                )}
              </TabsContent>
              <TabsContent ref={specsRef} value="specifications" className="space-y-4">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Product Specifications
                </h3>
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-foreground">{key}</span>
                        <span className="text-muted-foreground">{String(value)}</span>
                    </div>
                  ))}
                </div>
                ) : (
                  <p className="text-muted-foreground">No specifications listed.</p>
                )}
              </TabsContent>
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-foreground flex items-center gap-2">
                    <Star className="h-6 w-6 text-accent" />
                    Customer Reviews
                </h3>
                  <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-primary">
                        <Star className="h-4 w-4 mr-2" />
                        Write Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                        <DialogDescription>
                          Share your experience with this product
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="review-name">Your Name *</Label>
                          <Input
                            id="review-name"
                            value={reviewForm.customer_name}
                            onChange={(e) => setReviewForm({ ...reviewForm, customer_name: e.target.value })}
                            placeholder="Enter your name"
                            required
                          />
                    </div>
                        <div className="space-y-2">
                          <Label htmlFor="review-email">Email (Optional)</Label>
                          <Input
                            id="review-email"
                            type="email"
                            value={reviewForm.customer_email}
                            onChange={(e) => setReviewForm({ ...reviewForm, customer_email: e.target.value })}
                            placeholder="your@email.com"
                          />
                </div>
                        <div className="space-y-2">
                          <Label>Rating *</Label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() => setReviewForm({ ...reviewForm, rating })}
                                className={`p-2 rounded-lg transition-all ${
                                  reviewForm.rating >= rating
                                    ? "bg-accent text-white"
                                    : "bg-muted hover:bg-muted/80"
                                }`}
                              >
                                <Star className={`h-5 w-5 ${reviewForm.rating >= rating ? "fill-current" : ""}`} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="review-comment">Your Review (Optional)</Label>
                          <Textarea
                            id="review-comment"
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                            placeholder="Tell us about your experience..."
                            rows={4}
                          />
                      </div>
                        <Button
                          type="submit"
                          disabled={submittingReview}
                          className="w-full bg-gradient-primary"
                        >
                          {submittingReview ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Review"
                          )}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                {loadingReviews ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-20 bg-card rounded-2xl border border-border">
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-xl text-muted-foreground mb-4">No reviews yet</p>
                    <p className="text-muted-foreground mb-6">Be the first to review this product!</p>
                    <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-primary">
                          <Star className="h-4 w-4 mr-2" />
                          Write First Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Write a Review</DialogTitle>
                          <DialogDescription>
                            Share your experience with this product
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-review-name">Your Name *</Label>
                            <Input
                              id="first-review-name"
                              value={reviewForm.customer_name}
                              onChange={(e) => setReviewForm({ ...reviewForm, customer_name: e.target.value })}
                              placeholder="Enter your name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="first-review-email">Email (Optional)</Label>
                            <Input
                              id="first-review-email"
                              type="email"
                              value={reviewForm.customer_email}
                              onChange={(e) => setReviewForm({ ...reviewForm, customer_email: e.target.value })}
                              placeholder="your@email.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Rating *</Label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                  key={rating}
                                  type="button"
                                  onClick={() => setReviewForm({ ...reviewForm, rating })}
                                  className={`p-2 rounded-lg transition-all ${
                                    reviewForm.rating >= rating
                                      ? "bg-accent text-white"
                                      : "bg-muted hover:bg-muted/80"
                                  }`}
                                >
                                  <Star className={`h-5 w-5 ${reviewForm.rating >= rating ? "fill-current" : ""}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="first-review-comment">Your Review (Optional)</Label>
                            <Textarea
                              id="first-review-comment"
                              value={reviewForm.comment}
                              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                              placeholder="Tell us about your experience..."
                              rows={4}
                            />
                          </div>
                          <Button
                            type="submit"
                            disabled={submittingReview}
                            className="w-full bg-gradient-primary"
                          >
                            {submittingReview ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              "Submit Review"
                            )}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <Card key={review.id} className="p-6 border-0 shadow-soft hover:shadow-elegant transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                                {review.customer_name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-semibold text-foreground">{review.customer_name}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? "fill-accent text-accent"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{formatDate(review.created_at)}</span>
                        </div>
                        {review.comment && (
                          <p className="text-foreground leading-relaxed">{review.comment}</p>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-8 flex items-center gap-3">
                <Heart className="h-8 w-8 text-primary" />
                You May Also Like
              </h2>
              <div ref={relatedProductsRef} className="grid md:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => {
                  const relatedImages = getProductImages(relatedProduct);
                  return (
                    <Link
                      key={relatedProduct.id}
                      to={`/products/${relatedProduct.id}`}
                      className="group"
                    >
                      <Card className="overflow-hidden hover:shadow-elegant transition-all duration-500 border-0 bg-gradient-to-br from-card to-primary/5">
                    <div className="aspect-square overflow-hidden">
                      <img
                            src={relatedImages[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                        <div className="p-6">
                          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                        {relatedProduct.name}
                      </h3>
                          <p className="text-primary font-semibold text-xl">{formatPrice(relatedProduct.price)}</p>
                    </div>
                  </Card>
                </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
