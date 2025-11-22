import Navigation from "@/components/Layout/Navigation";
import Footer from "@/components/Layout/Footer";
import { Award, Heart, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Passion for Craft",
      description: "Every piece reflects our deep love for traditional Kashmiri artistry and the dedication of our skilled artisans.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Focus",
      description: "We empower local artisan communities by providing fair wages and preserving centuries-old crafting techniques.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Promise",
      description: "We guarantee authenticity and superior quality in every product, from selection to your doorstep.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Story</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Preserving Kashmir's rich heritage through authentic handcrafted products
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-3xl font-bold text-foreground">A Legacy of Excellence</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                For generations, the artisans of Kashmir have perfected their craft, creating some of the world's most exquisite textiles and handwoven products. Kashmir Crafts was founded with a singular mission: to bring these magnificent creations to discerning customers worldwide while supporting the artisan communities that make them possible.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Each pashmina shawl, carpet, and kurti in our collection represents not just a product, but a story—a testament to the skill, patience, and artistry passed down through countless generations. We work directly with master craftspeople, ensuring fair compensation and helping preserve these invaluable traditions for future generations.
              </p>
            </div>
            <div className="animate-slide-in-right">
              <img
                src="https://images.unsplash.com/photo-1583391265946-7e9aabb48bdc?w=800&q=80"
                alt="Kashmiri artisan at work"
                className="rounded-2xl shadow-elegant w-full"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-primary mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-primary rounded-3xl p-12 md:p-16 text-center shadow-elegant">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
                Craftsmanship That Speaks
              </h2>
              <p className="text-lg text-primary-foreground/90">
                When you choose Kashmir Crafts, you're not just purchasing a product—you're becoming part of a story that spans centuries, supporting communities, and preserving an art form that defines cultural heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
