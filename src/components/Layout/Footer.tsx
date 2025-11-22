import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Kashmir Crafts</h3>
            <p className="text-sm opacity-90">
              Authentic Kashmiri handcrafted products, bringing tradition and elegance to your home.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                Home
              </Link>
              <Link to="/products" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                Products
              </Link>
              <Link to="/about" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                About Us
              </Link>
              <Link to="/contact" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contact Info</h4>
            <div className="flex flex-col gap-3 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Srinagar, Kashmir</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@kashmircrafts.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-90">
          <p>&copy; {new Date().getFullYear()} Kashmir Crafts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
