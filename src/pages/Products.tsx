import { useState, useEffect } from "react";
import Navigation from "@/components/Layout/Navigation";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-2xl transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-accent">{product.category}</span>
                    <span className="text-lg font-bold text-primary">{product.price}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    View Details
                  </Button>
                </div>
              </div>
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
