import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Navigation from "@/components/Layout/Navigation";
import Footer from "@/components/Layout/Footer";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import TrustBadges from "@/components/TrustBadges";
import Stats from "@/components/Stats";
import BackToTop from "@/components/ui/back-to-top";
import heroImage from "@/assets/kashmir-hero.jpg";
import weavingImage from "@/assets/weaving-detail.jpg";
import gardenImage from "@/assets/kashmir-garden.jpg";

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
      <BackToTop />
      
      {/* Hero Section with Parallax Effect */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Kashmir Valley"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Authentic Kashmiri Craftsmanship</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight drop-shadow-lg">
              Timeless Elegance from the
              <span className="text-accent block mt-2 drop-shadow-xl">Heart of Kashmir</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto drop-shadow-md">
              Discover exquisite handcrafted pashminas, carpets, and traditional wear that blend centuries-old artistry with contemporary elegance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" className="bg-gradient-accent hover:scale-105 transition-all shadow-elegant">
                <Link to="/products">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="backdrop-blur-sm bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/30">
                <Link to="/about">Learn Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Featured Products */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Collections</h2>
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
                    <Button variant="secondary" size="sm" asChild>
                      <Link to="/products">View Collection</Link>
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
            <Button asChild size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Craftsmanship Story Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                The Art of <span className="text-primary">Kashmiri Weaving</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every thread tells a story, every knot holds centuries of tradition. Our artisans spend months perfecting each piece, using techniques passed down through generations.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From the high-altitude pastures where the finest wool is sourced, to the skilled hands that transform it into wearable art, each step is a labor of love and dedication.
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
                <Link to="/about">Discover Our Heritage</Link>
              </Button>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src={weavingImage}
                  alt="Kashmiri Weaving"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-primary rounded-full blur-3xl opacity-20 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Kashmir Beauty Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-elegant h-[500px]">
            <img
              src={gardenImage}
              alt="Kashmir Garden"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex items-end">
              <div className="p-12 text-primary-foreground max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  Inspired by Paradise on Earth
                </h2>
                <p className="text-lg opacity-90 drop-shadow-md">
                  Every design in our collection draws inspiration from the breathtaking landscapes, vibrant gardens, and rich cultural heritage of Kashmir - a place often called "Paradise on Earth."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 md:p-16 text-center shadow-elegant">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent)]"></div>
            </div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
                Experience Authentic Kashmiri Artistry
              </h2>
              <p className="text-lg text-primary-foreground/90">
                From the looms of Kashmir to your home, each piece carries the warmth of tradition and the beauty of craftsmanship.
              </p>
              <Button asChild size="lg" variant="secondary" className="mt-6 hover:scale-105 transition-transform">
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
