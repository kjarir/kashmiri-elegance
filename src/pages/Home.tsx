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
import { useFadeIn, useSlideInLeft, useSlideInRight, useStaggerChildren, useTextReveal, useParallax } from "@/lib/animations/scroll-animations";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "@/assets/kashmir-hero.jpg";
import weavingImage from "@/assets/weaving-detail.jpg";
import gardenImage from "@/assets/kashmir-garden.jpg";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  
  const featuredSectionRef = useFadeIn(0);
  const featuredGridRef = useStaggerChildren(0, 0.15);
  const craftsmanshipTextRef = useSlideInLeft(0);
  const craftsmanshipImageRef = useSlideInRight(0);
  const gardenImageRef = useParallax(0.3);
  const ctaRef = useFadeIn(0);

  // Hero parallax and animations
  useEffect(() => {
    if (!heroBgRef.current || !heroContentRef.current) return;

    // Enhanced parallax background - optimized for smooth performance
    gsap.to(heroBgRef.current, {
      yPercent: 50,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: heroBgRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });

    // Parallax overlay - optimized
    if (heroOverlayRef.current) {
      gsap.to(heroOverlayRef.current, {
        opacity: 0.3,
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroOverlayRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    }

    // Hero content animations on load
    const tl = gsap.timeline();
    
    if (heroBadgeRef.current) {
      tl.from(heroBadgeRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });
    }

    if (heroTitleRef.current) {
      // Get all text nodes and preserve structure
      const titleText = heroTitleRef.current.textContent || '';
      heroTitleRef.current.innerHTML = '';
      
      // Split by lines first, then by words
      const lines = titleText.split('\n').filter(line => line.trim());
      
      lines.forEach((line, lineIndex) => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'block';
        if (lineIndex > 0) lineDiv.className += ' mt-2';
        if (lineIndex === lines.length - 1) lineDiv.className += ' mt-4';
        
        const words = line.trim().split(' ').filter(word => word);
        words.forEach((word, wordIndex) => {
          const span = document.createElement('span');
          span.textContent = word + (wordIndex < words.length - 1 ? ' ' : '');
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(80px)';
          lineDiv.appendChild(span);
          
          tl.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power4.out',
          }, lineIndex * 0.3 + wordIndex * 0.08);
        });
        
        heroTitleRef.current?.appendChild(lineDiv);
      });
    }

    if (heroSubtitleRef.current) {
      tl.from(heroSubtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4');
    }

    if (heroButtonsRef.current) {
      tl.from(heroButtonsRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      }, '-=0.4');
    }
  }, []);

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
      
      {/* Hero Section - Inspired by Heaven on Earth */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Parallax Background Layers */}
        <div 
          ref={heroBgRef} 
          className="absolute inset-0 w-full h-[200%] -z-10"
          style={{ willChange: 'transform' }}
        >
          <img
            src={heroImage}
            alt="Kashmir Valley - Heaven on Earth"
            className="w-full h-full object-cover scale-125"
            style={{ 
              objectPosition: "center 40%",
              willChange: 'transform',
            }}
            loading="eager"
            fetchPriority="high"
          />
        </div>
        
        {/* Multi-layer Gradient Overlay with Parallax - Reduced opacity to show image */}
        <div 
          ref={heroOverlayRef}
          className="absolute inset-0 -z-10"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Base gradient - reduced opacity to show background image */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/75 via-primary/65 to-secondary/70"></div>
          
          {/* Enhanced radial gradients for depth and light - reduced opacity */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_30%_35%,rgba(255,255,255,0.12),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_800px_at_70%_75%,rgba(255,200,0,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_1000px_500px_at_50%_15%,rgba(255,255,255,0.06),transparent_60%)]"></div>
          
          {/* Enhanced vignette for focus - lighter */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.25)_100%)]"></div>
          
          {/* Subtle color washes */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent"></div>
        </div>

        {/* Enhanced floating particles - optimized for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: `${3 + Math.random() * 2}px`,
                height: `${3 + Math.random() * 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${20 + Math.random() * 15}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 8}s`,
                boxShadow: `0 0 ${4 + Math.random() * 4}px rgba(255,255,255,0.5)`,
                willChange: 'transform',
              }}
            />
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto relative z-10 px-4">
          <div ref={heroContentRef} className="max-w-6xl mx-auto text-center space-y-10">
            {/* Badge */}
            <div 
              ref={heroBadgeRef}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/15 backdrop-blur-xl text-white border border-white/30 shadow-2xl hover:bg-white/20 transition-all duration-300"
            >
              <Sparkles className="h-5 w-5 text-accent animate-pulse" />
              <span className="text-base font-bold tracking-widest uppercase">Inspired by Heaven on Earth</span>
            </div>
            
            {/* Main Title */}
            <div className="space-y-4">
              <h1 
                ref={heroTitleRef}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] font-extrabold text-white leading-[1.1] tracking-[-0.02em]"
                style={{
                  textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 8px 60px rgba(0,0,0,0.4), 0 0 100px rgba(0,0,0,0.2)',
                }}
              >
                <span className="block">Timeless Elegance</span>
                <span className="block mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light">from the</span>
                <span 
                  className="block mt-6 bg-gradient-to-r from-accent via-yellow-300 to-accent bg-clip-text text-transparent"
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 4px 30px rgba(255,200,0,0.5)) drop-shadow(0 0 40px rgba(255,200,0,0.3))',
                    textShadow: '0 0 60px rgba(255,200,0,0.4)',
                  }}
                >
                  Heart of Kashmir
                </span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <div className="space-y-4 max-w-4xl mx-auto px-4">
              <p 
                ref={heroSubtitleRef}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/98 leading-relaxed font-light"
                style={{
                  textShadow: '0 2px 15px rgba(0,0,0,0.5), 0 4px 30px rgba(0,0,0,0.3)',
                }}
              >
                Discover exquisite handcrafted pashminas, carpets, and traditional wear that blend centuries-old artistry with contemporary elegance.
              </p>
              <p 
                className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-medium italic"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                }}
              >
                Each piece is a journey to paradise on earth.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div 
              ref={heroButtonsRef}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8"
            >
              <Button 
                asChild 
                size="lg" 
                className="group bg-gradient-to-r from-accent via-yellow-400 to-accent hover:from-accent/90 hover:via-yellow-400/90 hover:to-accent/90 text-white border-0 shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all duration-300 px-10 py-7 text-lg font-bold rounded-full"
              >
                <Link to="/products" className="flex items-center gap-2">
                  <span>Explore Collection</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                className="backdrop-blur-xl bg-white/15 border-2 border-white/40 text-white hover:bg-white/25 hover:border-white/60 transition-all duration-300 px-10 py-7 text-lg font-semibold rounded-full shadow-xl"
              >
                <Link to="/about">Discover Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Enhanced Scroll indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-3 group cursor-pointer">
            <span className="text-white/80 text-xs font-semibold tracking-[0.2em] uppercase group-hover:text-white transition-colors">
              Scroll to Explore
            </span>
            <div className="w-7 h-12 border-2 border-white/60 rounded-full flex items-start justify-center p-2.5 group-hover:border-white transition-colors">
              <div className="w-2 h-3 bg-white/80 rounded-full group-hover:bg-white transition-colors animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-0"></div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Featured Products */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div ref={featuredSectionRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Collections</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each piece tells a story of heritage, crafted by skilled artisans with passion and precision.
            </p>
          </div>

          <div ref={featuredGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.title}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-elegant hover:shadow-2xl transition-all duration-500"
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
            <div ref={craftsmanshipTextRef} className="space-y-6">
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
            <div ref={craftsmanshipImageRef} className="relative">
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
            <div ref={gardenImageRef}>
              <img
                src={gardenImage}
                alt="Kashmir Garden"
                className="w-full h-full object-cover"
              />
            </div>
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
          <div ref={ctaRef} className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 md:p-16 text-center shadow-elegant">
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
