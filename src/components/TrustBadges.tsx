import { Shield, Truck, Clock, Award } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "100% Authentic",
      description: "Genuine handcrafted products",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Free Shipping",
      description: "On orders above ₹5,000",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Assured",
      description: "Certified artisan products",
    },
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className="text-center space-y-3 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground mx-auto">
                {badge.icon}
              </div>
              <h3 className="font-bold text-foreground">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
