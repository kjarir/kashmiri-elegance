import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Layout/Navigation";
import Footer from "@/components/Layout/Footer";
import { adminService } from "@/lib/db/admin";
import { categoryService, Category } from "@/lib/db/categories";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [category, setCategory] = useState<Partial<Category>>({
    name: "",
    slug: "",
    description: "",
    display_order: 0,
    is_active: true,
  });

  const isEditMode = !!id;

  useEffect(() => {
    checkAuth();
  }, [id]);

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
      if (isEditMode) {
        loadCategory();
      }
    } catch (error) {
      navigate("/products");
    }
  };

  const loadCategory = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await categoryService.getById(id);
      if (data) {
        setCategory(data);
      } else {
        toast({
          title: "Error",
          description: "Category not found.",
          variant: "destructive",
        });
        navigate("/admin/categories");
      }
    } catch (error) {
      console.error("Error loading category:", error);
      toast({
        title: "Error",
        description: "Failed to load category.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (name: string) => {
    setCategory({
      ...category,
      name,
      slug: category.slug || generateSlug(name),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category.name || !category.slug) {
      toast({
        title: "Validation Error",
        description: "Name and slug are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);

      if (isEditMode && id) {
        await categoryService.update(id, category);
        toast({
          title: "Success",
          description: "Category updated successfully.",
        });
      } else {
        await categoryService.create(category as Omit<Category, 'id' | 'created_at' | 'updated_at'>);
        toast({
          title: "Success",
          description: "Category created successfully.",
        });
      }

      navigate("/admin/categories");
    } catch (error: any) {
      console.error("Error saving category:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save category.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/categories")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">
                {isEditMode ? "Edit Category" : "Create New Category"}
              </CardTitle>
              <CardDescription>
                {isEditMode
                  ? "Update category information"
                  : "Add a new product category"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    value={category.name || ""}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g., Pashmina, Carpets, Kurtis"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={category.slug || ""}
                    onChange={(e) =>
                      setCategory({ ...category, slug: generateSlug(e.target.value) })
                    }
                    placeholder="e.g., pashmina, carpets, kurtis"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    URL-friendly identifier (auto-generated from name)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={category.description || ""}
                    onChange={(e) =>
                      setCategory({ ...category, description: e.target.value })
                    }
                    placeholder="Brief description of this category..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={category.display_order || 0}
                    onChange={(e) =>
                      setCategory({
                        ...category,
                        display_order: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Lower numbers appear first in listings
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="is_active">Active Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Inactive categories won't appear on the website
                    </p>
                  </div>
                  <Switch
                    id="is_active"
                    checked={category.is_active ?? true}
                    onCheckedChange={(checked) =>
                      setCategory({ ...category, is_active: checked })
                    }
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/categories")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-gradient-primary"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {isEditMode ? "Update Category" : "Create Category"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryForm;

