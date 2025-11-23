import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Layout/Navigation";
import Footer from "@/components/Layout/Footer";
import { adminService } from "@/lib/db/admin";
import { productService } from "@/lib/db/products";
import { categoryService } from "@/lib/db/categories";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, FolderTree, Users, TrendingUp, Plus, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    featuredProducts: 0,
    outOfStock: 0,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isAdmin = await adminService.isAdmin();
      if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You need admin privileges to access this page.",
          variant: "destructive",
        });
        navigate("/products");
        return;
      }
      loadStats();
    } catch (error) {
      navigate("/products");
    }
  };

  const loadStats = async () => {
    try {
      setLoading(true);
      const [products, categories] = await Promise.all([
        productService.getAll(),
        categoryService.getAll(),
      ]);

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        featuredProducts: products.filter(p => p.featured).length,
        outOfStock: products.filter(p => !p.in_stock).length,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminService.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate("/products");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Admin <span className="text-primary">Dashboard</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Manage your products, categories, and store settings
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Products
                </CardTitle>
                <Package className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.outOfStock} out of stock
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Categories
                </CardTitle>
                <FolderTree className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats.totalCategories}</div>
                <p className="text-xs text-muted-foreground mt-1">Active categories</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Featured Products
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats.featuredProducts}</div>
                <p className="text-xs text-muted-foreground mt-1">Currently featured</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Quick Actions
                </CardTitle>
                <Plus className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate("/admin/products")} 
                  className="w-full bg-gradient-primary"
                >
                  Manage Products
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Product Management
                </CardTitle>
                <CardDescription>
                  Add, edit, or remove products from your catalog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate("/admin/products")} 
                    className="w-full bg-gradient-primary"
                  >
                    Manage Products
                  </Button>
                  <Button 
                    onClick={() => navigate("/admin/products/new")} 
                    variant="outline"
                    className="w-full"
                  >
                    Add New Product
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderTree className="h-5 w-5 text-primary" />
                  Category Management
                </CardTitle>
                <CardDescription>
                  Organize your products into categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate("/admin/categories")} 
                    className="w-full bg-gradient-primary"
                  >
                    Manage Categories
                  </Button>
                  <Button 
                    onClick={() => navigate("/admin/categories/new")} 
                    variant="outline"
                    className="w-full"
                  >
                    Add New Category
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
