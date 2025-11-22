import { useState, useEffect } from "react";
import Navigation from "@/components/Layout/Navigation";
import Footer from "@/components/Layout/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, SlidersHorizontal } from "lucide-react";
import BackToTop from "@/components/ui/back-to-top";

const Products = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const { toast } = useToast();

  // Secret key combination: Ctrl+Shift+A
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setShowAdminPanel(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement Supabase authentication here
    toast({
      title: "Authentication Required",
      description: "Please connect Supabase to enable admin authentication.",
      variant: "destructive",
    });
  };

  const products = [
    {
      id: 1,
      name: "Premium Pashmina Shawl",
      category: "Pashmina",
      price: "₹25,000",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
      description: "100% pure pashmina wool, handwoven by master artisans",
    },
    {
      id: 2,
      name: "Kashmiri Silk Carpet",
      category: "Carpets",
      price: "₹1,50,000",
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
      description: "Hand-knotted silk carpet with intricate traditional patterns",
    },
    {
      id: 3,
      name: "Embroidered Kurti Set",
      category: "Kurtis",
      price: "₹8,500",
      image: "https://images.unsplash.com/photo-1583391265946-7e9aabb48bdc?w=800&q=80",
      description: "Traditional Kashmiri embroidery on fine cotton",
    },
    {
      id: 4,
      name: "Luxury Pashmina Stole",
      category: "Pashmina",
      price: "₹18,000",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
      description: "Lightweight and elegant, perfect for any occasion",
    },
    {
      id: 5,
      name: "Royal Persian Design Carpet",
      category: "Carpets",
      price: "₹2,00,000",
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
      description: "Masterpiece carpet with Persian-inspired motifs",
    },
    {
      id: 6,
      name: "Designer Anarkali Kurti",
      category: "Kurtis",
      price: "₹12,000",
      image: "https://images.unsplash.com/photo-1583391265946-7e9aabb48bdc?w=800&q=80",
      description: "Elegant Anarkali style with intricate thread work",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackToTop />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Collections</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our curated selection of authentic Kashmiri handcrafted products. Each piece is a testament to generations of artisanal excellence.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="pashmina">Pashmina</SelectItem>
                  <SelectItem value="carpets">Carpets</SelectItem>
                  <SelectItem value="kurtis">Kurtis</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
              {["all", "pashmina", "carpets", "kurtis"].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gradient-primary" : ""}
                >
                  {category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                {...product}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Admin Panel Dialog */}
      <Dialog open={showAdminPanel} onOpenChange={setShowAdminPanel}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Admin Login</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdminLogin} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@kashmircrafts.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-primary">
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Products;
