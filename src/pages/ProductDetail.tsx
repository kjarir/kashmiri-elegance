import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Layout/Navigation";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import BackToTop from "@/components/ui/back-to-top";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data
  const product = {
    id: parseInt(id || "1"),
    name: "Premium Kashmiri Pashmina Shawl",
    category: "Pashmina",
    price: "₹25,000",
    originalPrice: "₹32,000",
    rating: 4.8,
    reviews: 127,
    inStock: true,
    description:
      "An exquisite handwoven pashmina shawl crafted by master artisans in Kashmir. Made from 100% pure pashmina wool sourced from the high-altitude regions of the Himalayas, this shawl represents the pinnacle of traditional Kashmiri craftsmanship.",
    features: [
      "100% Pure Pashmina Wool",
      "Hand-woven by Master Artisans",
      "Traditional Kashmiri Patterns",
      "Incredibly Soft & Warm",
      "Lightweight & Breathable",
      "Natural Fiber, Eco-Friendly",
    ],
    specifications: {
      Material: "100% Pure Pashmina Wool",
      Dimensions: "200cm x 100cm",
      Weight: "250 grams",
      Origin: "Kashmir, India",
      "Care Instructions": "Dry clean only",
      Weave: "Traditional Hand-woven",
    },
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
      "https://images.unsplash.com/photo-1583391265946-7e9aabb48bdc?w=800&q=80",
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
    ],
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Luxury Pashmina Stole",
      price: "₹18,000",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80",
    },
    {
      id: 3,
      name: "Embroidered Pashmina",
      price: "₹28,000",
      image: "https://images.unsplash.com/photo-1583391265946-7e9aabb48bdc?w=400&q=80",
    },
    {
      id: 4,
      name: "Royal Pashmina Set",
      price: "₹45,000",
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&q=80",
    },
  ];

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted
        ? "Product removed from wishlist"
        : "Product added to wishlist",
    });
  };

  const handleShare = () => {
    toast({
      title: "Link Copied",
      description: "Product link copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackToTop />

      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
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

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Image Gallery */}
            <div className="space-y-4 animate-slide-in-left">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-elegant">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary shadow-soft"
                        : "border-transparent hover:border-border"
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
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-slide-in-right">
              <div>
                <Badge className="mb-3 bg-accent text-accent-foreground">
                  {product.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-accent text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">{product.price}</span>
                <span className="text-2xl text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  Save 22%
                </Badge>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Quantity:</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleWishlist}
                  className={isWishlisted ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`} />
                </Button>
                <Button size="lg" variant="outline" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-xs text-muted-foreground">Authentic</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <RotateCcw className="h-6 w-6 text-primary" />
                  <span className="text-xs text-muted-foreground">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Card className="p-8 mb-20 animate-fade-in border-0 shadow-elegant">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="features" className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground mb-4">Key Features</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="specifications" className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Product Specifications
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-foreground">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-b border-border pb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-foreground">Customer {i + 1}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">2 weeks ago</span>
                      </div>
                      <p className="text-muted-foreground">
                        Absolutely stunning quality! The craftsmanship is evident in every detail.
                        Worth every penny.
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Related Products */}
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-8">You May Also Like</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="group animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="overflow-hidden hover:shadow-elegant transition-all duration-500 border-0">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-primary font-semibold mt-2">{relatedProduct.price}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
