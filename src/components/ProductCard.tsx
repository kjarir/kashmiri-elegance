import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string | number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  rating?: number;
  delay?: number;
}

const ProductCard = ({
  id,
  name,
  category,
  price,
  image,
  description,
  rating = 4.5,
  delay = 0,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted ? `${name} removed` : `${name} added to your wishlist`,
    });
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${name} has been added to your cart`,
    });
  };

  return (
    <div
      className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 flex items-center justify-center gap-3">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
              onClick={handleWishlist}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100"
              asChild
            >
              <Link to={`/products/${id}`}>
                <Eye className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium shadow-soft">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(rating) ? "text-accent" : "text-muted-foreground"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-muted-foreground ml-2">({rating})</span>
          </div>
          <span className="text-lg font-bold text-primary">{price}</span>
        </div>
        <Link to={`/products/${id}`}>
          <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <Button
          className="w-full bg-gradient-primary hover:opacity-90"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
