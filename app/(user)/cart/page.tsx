// app/cart/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "@/components/user/cart/cart-item";
import { OrderSummary } from "@/components/user/cart/order-summary";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const cartItems = [
  {
    id: "1",
    name: "Classic White Tee",
    price: 29.99,
    size: "M",
    color: "White",
    quantity: 2,
    image: "/images/hero/women-fashion.jpeg",
  },
  {
    id: "2",
    name: "Slim Black Jeans",
    price: 59.99,
    size: "32",
    color: "Black",
    quantity: 1,
    image: "/images/hero/women-fashion.jpeg",
  },
  {
    id: "3",
    name: "Oversized Denim Jacket",
    price: 89.99,
    size: "L",
    color: "Blue",
    quantity: 1,
    image: "/images/hero/women-fashion.jpeg",
  },
  {
    id: "4",
    name: "Oversized Denim Jacket",
    price: 89.99,
    size: "L",
    color: "Blue",
    quantity: 1,
    image: "/images/hero/women-fashion.jpeg",
  },
];

export default function CartPage() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Mock handlers for cart actions
  const handleIncrease = (id: string) => {
    console.log("Increase quantity for item:", id);
  };

  const handleDecrease = (id: string) => {
    console.log("Decrease quantity for item:", id);
  };

  const handleRemove = (id: string) => {
    console.log("Remove item:", id);
  };

  return (
    <div className="container p-4 py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Cart items card */}
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">
              SHOPPING CART
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <div className="flex h-[60vh] flex-col items-center justify-center text-center space-y-4">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Your cart is empty</h3>
                <p className="text-muted-foreground">
                  Start adding some items to your cart
                </p>
                <Button asChild className="mt-4">
                  <Link href="/shop">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <div className="h-[60vh]">
                <ScrollArea className="h-full pr-4">
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li key={item.id}>
                        <CartItem
                          {...item}
                          onIncrease={() => handleIncrease(item.id)}
                          onDecrease={() => handleDecrease(item.id)}
                          onRemove={() => handleRemove(item.id)}
                        />
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order summary card */}
        {cartItems.length > 0 && (
          <Card className="lg:col-span-5 lg:sticky lg:top-8 h-fit">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">
                ORDER SUMMARY
              </CardTitle>
            </CardHeader>
            <CardContent>
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
