import { Hero } from "@/components/user/hero";
import ProductList from "@/components/user/product-list";

export default function Home() {
  // Sample clothing product data with ₹ prices
  const featuredProducts = [
    {
      id: 1,
      name: "Classic White Tee test tes tsfkj",
      price: "₹599",
      category: "T-Shirts",
    },
    { id: 2, name: "Slim Fit Jeans", price: "₹1,499", category: "Jeans" },
    {
      id: 3,
      name: "Oversized Hoodie",
      price: "₹1,299",
      category: "Sweatshirts",
    },
    { id: 4, name: "Canvas Sneakers", price: "₹1,199", category: "Footwear" },
    { id: 5, name: "Denim Jacket", price: "₹2,199", category: "Outerwear" },
  ];

  const trendingProducts = [
    { id: 6, name: "Linen Shirt", price: "₹999", category: "Shirts" },
    {
      id: 7,
      name: "High-Waisted Leggings",
      price: "₹899",
      category: "Activewear",
    },
    { id: 8, name: "Cashmere Sweater", price: "₹3,299", category: "Knitwear" },
    { id: 9, name: "Cargo Pants", price: "₹1,399", category: "Pants" },
    { id: 10, name: "Bucket Hat", price: "₹599", category: "Accessories" },
  ];

  const newArrivals = [
    {
      id: 11,
      name: "Leather Biker Jacket",
      price: "₹4,999",
      category: "Outerwear",
    },
    { id: 12, name: "Silk Slip Dress", price: "₹2,299", category: "Dresses" },
    { id: 13, name: "Cropped Cardigan", price: "₹1,099", category: "Sweaters" },
    { id: 14, name: "Wide-Leg Trousers", price: "₹1,699", category: "Pants" },
    { id: 15, name: "Platform Boots", price: "₹2,799", category: "Footwear" },
  ];

  return (
    <div>
      <Hero />

      <ProductList title="Featured Clothing" products={featuredProducts} />

      <ProductList title="Trending Now" products={trendingProducts} />

      <ProductList title="New Arrivals" products={newArrivals} />
    </div>
  );
}
