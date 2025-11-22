import Navigation from "@/components/Layout/Navigation";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      details: ["Lal Chowk, Srinagar", "Jammu & Kashmir, 190001"],
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: ["+91 1234567890", "+91 0987654321"],
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: ["info@kashmircrafts.com", "support@kashmircrafts.com"],
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Working Hours",
      details: ["Mon - Sat: 10:00 AM - 7:00 PM", "Sunday: Closed"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about our products or want to place a custom order? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-8 animate-slide-in-left">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  Reach out to us through any of these channels, and our team will respond promptly to assist you.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
                    className="bg-card p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-primary mb-3">{info.icon}</div>
                    <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slide-in-right">
              <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl shadow-elegant space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 1234567890" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Product Inquiry" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-elegant h-96 animate-fade-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.5448936266776!2d74.80570731521122!3d34.083450980602515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18fb2e8c1a1e7%3A0x3e8e5e5e5e5e5e5e!2sLal%20Chowk%2C%20Srinagar!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
