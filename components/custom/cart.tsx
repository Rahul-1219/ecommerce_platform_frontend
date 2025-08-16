"use client";

import { removeCartItem, updateCartItem } from "@/app/(user)/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "@/components/user/cart/cart-item";
import { OrderSummary } from "@/components/user/cart/order-summary";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "@/utils/debounce";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Cart({ cart }) {
  const { toast } = useToast();

  const [cartItems, setCartItems] = useState(() =>
    cart?.items
      ? cart?.items?.map((item) => ({
          id: item._id,
          productId: item?.product?._id,
          name: item.product.name,
          price: item?.productVariant
            ? item.productVariant.price
            : item.product.price,
          size: item?.productVariant ? item.productVariant.size : "",
          color: item?.productVariant ? item.productVariant.color : "",
          quantity: item.quantity,
          image: item?.product?.images[0]?.image,
          stock: item?.productVariant
            ? item.productVariant.quantity
            : item.product.quantity,
        }))
      : []
  );

  // subtotal, shipping, tax, total will update based on cartItems state
  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  // Debounced API functions
  const debouncedUpdate = debounce(
    (id: string, type: "increase" | "decrease") => {
      updateCartItem({ type }, id).catch((error: any) => {
        toast({
          variant: "destructive",
          title: error.message,
          duration: 2000,
        });
      });
    },
    500 // 0.5s delay
  );

  // Increase quantity
  const handleIncrease = async (id: string) => {
    try {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      debouncedUpdate(id, "increase");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
        duration: 2000,
      });
    }
  };

  // Decrease quantity (not less than 1)
  const handleDecrease = async (id: string) => {
    try {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      debouncedUpdate(id, "decrease");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
        duration: 2000,
      });
    }
  };

  // Remove item completely
  const handleRemove = async (id: string) => {
    try {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      await removeCartItem(id);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
        duration: 2000,
      });
    }
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
            {cartItems?.length === 0 ? (
              <div className="flex h-[60vh] flex-col items-center justify-center text-center space-y-4">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Your cart is empty</h3>
                <p className="text-muted-foreground">
                  Start adding some items to your cart
                </p>
                <Button asChild className="mt-4">
                  <Link href="/filter">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <div className="h-[60vh]">
                <ScrollArea className="h-full pr-4">
                  <ul className="space-y-4">
                    {cartItems?.map((item) => (
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
        {cartItems?.length > 0 && (
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
