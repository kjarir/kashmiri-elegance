-- Sample products for Kashmir Crafts
-- Run this after setting up the schema and admin user

-- Insert sample Pashmina products
INSERT INTO products (name, category, price, original_price, description, image_url, images, rating, reviews_count, in_stock, stock_quantity, featured, features, specifications) VALUES
(
  'Royal Pashmina Shawl',
  'pashmina',
  25000,
  32000,
  'Luxurious hand-woven pashmina shawl made from the finest Himalayan cashmere. This exquisite piece features intricate embroidery and traditional Kashmiri patterns.',
  'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80', 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80'],
  4.8,
  45,
  true,
  12,
  true,
  '["100% Pure Pashmina", "Hand-woven by master artisans", "Traditional Kashmiri embroidery", "Lightweight and warm", "Perfect for all seasons"]'::jsonb,
  '{"Material": "100% Pashmina Wool", "Size": "200cm x 100cm", "Weight": "200g", "Care": "Dry clean only", "Origin": "Kashmir, India"}'::jsonb
),
(
  'Embroidered Pashmina Stole',
  'pashmina',
  18000,
  24000,
  'Elegant pashmina stole with delicate hand embroidery. Perfect accessory for formal occasions and everyday elegance.',
  'https://images.unsplash.com/photo-1611312449521-fbbb4f35d0fc?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1611312449521-fbbb4f35d0fc?w=800&q=80'],
  4.6,
  32,
  true,
  8,
  true,
  '["Pure Pashmina fiber", "Hand embroidered patterns", "Soft and comfortable", "Versatile styling", "Gift-ready packaging"]'::jsonb,
  '{"Material": "100% Pashmina", "Size": "180cm x 70cm", "Weight": "150g", "Pattern": "Floral embroidery", "Origin": "Kashmir, India"}'::jsonb
);

-- Insert sample Carpet products
INSERT INTO products (name, category, price, original_price, description, image_url, images, rating, reviews_count, in_stock, stock_quantity, featured, features, specifications) VALUES
(
  'Silk Kashmir Carpet',
  'carpets',
  125000,
  150000,
  'Magnificent hand-knotted silk carpet featuring traditional Persian patterns. A masterpiece that takes months to create.',
  'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80'],
  4.9,
  28,
  true,
  3,
  true,
  '["100% Pure Silk", "Hand-knotted by master weavers", "600+ knots per square inch", "Natural dyes", "Museum quality"]'::jsonb,
  '{"Material": "100% Silk", "Size": "6ft x 4ft", "Knot Density": "600 KPSI", "Pattern": "Persian Floral", "Weaving Time": "6 months", "Origin": "Kashmir, India"}'::jsonb
),
(
  'Wool Chain Stitch Carpet',
  'carpets',
  45000,
  55000,
  'Beautiful chain stitch carpet with vibrant colors and traditional motifs. Durable and perfect for high-traffic areas.',
  'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80'],
  4.7,
  19,
  true,
  6,
  false,
  '["Pure wool base", "Chain stitch embroidery", "Colorfast natural dyes", "Durable construction", "Easy to maintain"]'::jsonb,
  '{"Material": "Wool with cotton base", "Size": "5ft x 3ft", "Technique": "Chain stitch", "Pattern": "Jacobean Floral", "Origin": "Kashmir, India"}'::jsonb
);

-- Insert sample Kurti products
INSERT INTO products (name, category, price, original_price, description, image_url, images, rating, reviews_count, in_stock, stock_quantity, featured, features, specifications) VALUES
(
  'Kashmiri Embroidered Kurti',
  'kurtis',
  4500,
  6000,
  'Elegant cotton kurti with traditional Kashmiri Aari embroidery. Perfect blend of tradition and contemporary style.',
  'https://images.unsplash.com/photo-1610652492500-ded49ceea18a?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1610652492500-ded49ceea18a?w=800&q=80'],
  4.5,
  56,
  true,
  25,
  true,
  '["Premium cotton fabric", "Hand embroidered Aari work", "Comfortable fit", "Machine washable", "Contemporary design"]'::jsonb,
  '{"Material": "100% Cotton", "Sizes": "S, M, L, XL, XXL", "Length": "42 inches", "Embroidery": "Aari work", "Care": "Machine wash cold", "Origin": "Kashmir, India"}'::jsonb
),
(
  'Silk Blend Kurti with Tilla Work',
  'kurtis',
  6500,
  8500,
  'Luxurious silk blend kurti featuring intricate tilla (metallic thread) embroidery. Perfect for special occasions.',
  'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80'],
  4.7,
  41,
  true,
  15,
  false,
  '["Silk-Cotton blend", "Gold tilla embroidery", "Elegant drape", "Festive wear", "Detailed craftsmanship"]'::jsonb,
  '{"Material": "Silk-Cotton blend", "Sizes": "S, M, L, XL", "Length": "44 inches", "Embroidery": "Tilla work", "Care": "Dry clean recommended", "Origin": "Kashmir, India"}'::jsonb
);

-- Insert sample Shawl products
INSERT INTO products (name, category, price, original_price, description, image_url, images, rating, reviews_count, in_stock, stock_quantity, featured, features, specifications) VALUES
(
  'Sozni Embroidered Shawl',
  'shawls',
  35000,
  42000,
  'Exquisite shawl featuring traditional Sozni embroidery - a needle embroidery technique passed down through generations.',
  'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80'],
  4.9,
  22,
  true,
  5,
  true,
  '["Pashmina base", "Sozni needle embroidery", "Months of handwork", "Intricate patterns", "Heirloom quality"]'::jsonb,
  '{"Material": "Pashmina", "Size": "200cm x 100cm", "Embroidery": "Sozni handwork", "Time to Create": "3 months", "Care": "Dry clean only", "Origin": "Kashmir, India"}'::jsonb
);

-- Insert sample Handicraft products
INSERT INTO products (name, category, price, original_price, description, image_url, images, rating, reviews_count, in_stock, stock_quantity, featured, features, specifications) VALUES
(
  'Walnut Wood Carved Box',
  'handicrafts',
  3500,
  4500,
  'Beautifully hand-carved walnut wood jewelry box with traditional Kashmiri motifs. Perfect for storing precious items.',
  'https://images.unsplash.com/photo-1609790443317-fce7d825d8d0?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1609790443317-fce7d825d8d0?w=800&q=80'],
  4.6,
  38,
  true,
  20,
  false,
  '["Premium walnut wood", "Hand-carved details", "Velvet lined interior", "Multiple compartments", "Unique piece"]'::jsonb,
  '{"Material": "Walnut Wood", "Size": "25cm x 15cm x 10cm", "Finish": "Natural polish", "Interior": "Velvet lined", "Care": "Dust with soft cloth", "Origin": "Kashmir, India"}'::jsonb
),
(
  'Papier Mache Decorative Vase',
  'handicrafts',
  2800,
  3500,
  'Colorful papier mache vase with traditional Kashmiri floral patterns. A stunning piece of decorative art.',
  'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80'],
  4.4,
  29,
  true,
  18,
  false,
  '["Traditional papier mache", "Hand-painted designs", "Natural colors", "Lightweight", "Decorative piece"]'::jsonb,
  '{"Material": "Papier Mache", "Height": "30cm", "Diameter": "15cm", "Finish": "Hand-painted", "Care": "Keep away from water", "Origin": "Kashmir, India"}'::jsonb
);

-- Verification query
SELECT 
  name, 
  category, 
  price, 
  in_stock, 
  featured,
  array_length(images, 1) as image_count
FROM products 
ORDER BY category, name;
