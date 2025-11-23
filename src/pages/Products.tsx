import { useState, useEffect } from "react";
import Navigation from "@/components/Layout/Navigation";
import Footer from "@/components/Layout/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import BackToTop from "@/components/ui/back-to-top";
import { productService } from "@/lib/db/products";
import { adminService } from "@/lib/db/admin";
import { Product } from "@/lib/supabase";

const Products = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  // Fetch products on mount
  useEffect(() => {
    loadProducts();
    checkAdminStatus();
    
    // Listen to auth state changes
    const { data: { subscription } } = adminService.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        checkAdminStatus();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check admin status
  const checkAdminStatus = async () => {
    try {
      const admin = await adminService.isAdmin();
      setIsAdmin(admin);
    } catch (error) {
      setIsAdmin(false);
    }
  };

  // Load products
  const loadProducts = async () => {
    try {
      setLoading(true);
      let fetchedProducts: Product[] = [];

      if (searchQuery.trim()) {
        fetchedProducts = await productService.search(searchQuery);
      } else if (selectedCategory === "all") {
        fetchedProducts = await productService.getAll();
      } else {
        fetchedProducts = await productService.getByCategory(selectedCategory);
      }

      // Sort products
      if (sortBy === "price-low") {
        fetchedProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-high") {
        fetchedProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === "newest") {
        fetchedProducts.sort((a, b) => {
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA;
        });
      } else if (sortBy === "featured") {
        fetchedProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
      }

      setProducts(fetchedProducts);
    } catch (error: any) {
      console.error("Error loading products:", error);
      
      // Check if it's a table not found error
      if (error?.code === 'TABLE_NOT_FOUND' || error?.isTableNotFound || error?.code === 'PGRST116' || error?.message?.includes('relation') || (error as any)?.status === 404) {
        toast({
          title: "Database Setup Required",
          description: "The products table doesn't exist yet. Please run the database schema from database/schema.sql in your Supabase SQL Editor.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error?.message || "Failed to load products. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Reload products when filters change
  useEffect(() => {
    loadProducts();
  }, [searchQuery, selectedCategory, sortBy]);

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
    
    try {
      await adminService.signIn(email, password);
      toast({
        title: "Success",
        description: "Admin login successful!",
      });
      setShowAdminPanel(false);
      setEmail("");
      setPassword("");
      await checkAdminStatus();
    } catch (error: any) {
      let errorMessage = "Invalid email or password.";
      
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please check your credentials.";
      } else if (error.message?.includes("Access denied") || error.message?.includes("Admin privileges")) {
        errorMessage = "This account doesn't have admin privileges. Please contact an administrator.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Format price to Indian Rupee format
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get primary image for product
  const getProductImage = (product: Product): string => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return product.image_url || "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80";
  };

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "all" && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    return true;
  });

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

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-xl text-muted-foreground">No products found.</p>
              {products.length === 0 && (
                <div className="max-w-md mx-auto p-6 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    If you just set up the database, you may need to:
                  </p>
                  <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                    <li>Run the schema from <code className="bg-background px-1 rounded">database/schema.sql</code> in Supabase SQL Editor</li>
                    <li>Add some products to the database</li>
                  </ol>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  price={formatPrice(product.price)}
                  image={getProductImage(product)}
                  description={product.description || ""}
                  rating={product.rating || 4.5}
                  delay={index * 100}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Admin Panel Dialog */}
      <Dialog open={showAdminPanel} onOpenChange={setShowAdminPanel}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Admin Login</DialogTitle>
            <DialogDescription className="text-center">
              Enter your admin credentials to access the admin panel
            </DialogDescription>
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
