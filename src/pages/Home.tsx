import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Navigation from "@/components/Layout/Navigation";
import Footer from "@/components/Layout/Footer";

const Home = () => {
  const featuredProducts = [
    {
      title: "Kashmiri Pashmina",
      description: "Luxurious handwoven shawls",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    },
    {
      title: "Traditional Carpets",
      description: "Intricate hand-knotted designs",
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
    },
    {
      title: "Embroidered Kurtis",
      description: "Elegant traditional wear",
      image: "https://images.unsplash.com/photo-1583391265946-7e9aabb48bdc?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Authentic Kashmiri Craftsmanship</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Timeless Elegance from the
              <span className="text-primary block mt-2">Heart of Kashmir</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover exquisite handcrafted pashminas, carpets, and traditional wear that blend centuries-old artistry with contemporary elegance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                <Link to="/products">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">Learn Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Collections</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each piece tells a story of heritage, crafted by skilled artisans with passion and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.title}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-elegant hover:shadow-2xl transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{product.description}</p>
                    <Button variant="secondary" size="sm">
                      View Collection
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{product.title}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 md:p-16 text-center shadow-elegant">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
                Experience Authentic Kashmiri Artistry
              </h2>
              <p className="text-lg text-primary-foreground/90">
                From the looms of Kashmir to your home, each piece carries the warmth of tradition and the beauty of craftsmanship.
              </p>
              <Button asChild size="lg" variant="secondary" className="mt-6">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
