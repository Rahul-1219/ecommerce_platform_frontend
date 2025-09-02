"use client";

import { removeCartItem, updateCartItem } from "@/app/(user)/action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "@/components/user/cart/cart-item";
import { OrderSummary } from "@/components/user/cart/order-summary";
import { useUserStore } from "@/context/user-store";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "@/utils/debounce";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

export default function Cart({ cart }) {
  const { toast } = useToast();
  const { user } = useUserStore();
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    const defaultAddr = user?.addresses.find((addr) => addr.isDefault);
    if (defaultAddr) setSelectedAddressId(defaultAddr._id);
  }, [user?.addresses]);

  const [cartItems, setCartItems] = useState(
    cart?.items?.map((item) => ({
      id: item._id,
      productId: item?.product?._id,
      productVariantId: item?.productVariantId,
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
    })) || []
  );

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const debouncedUpdate = debounce(
    (id: string, type: "increase" | "decrease") => {
      updateCartItem({ type }, id).catch((error: any) =>
        toast({ variant: "destructive", title: error.message, duration: 2000 })
      );
    },
    500
  );

  const handleIncrease = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    debouncedUpdate(id, "increase");
  };

  const handleDecrease = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    debouncedUpdate(id, "decrease");
  };

  const handleRemove = async (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    await removeCartItem(id);
  };

  return (
    <div className="container p-4 py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Cart Items */}
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
                  <Link href="/filter">Browse Products</Link>
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

        {/* Right: Address Selection + Order Summary */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-8">
          {/* Order Summary */}
          {cartItems.length > 0 && (
            <>
              {/* Address Selection */}
              {user && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      Select Shipping Address
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Your order will be placed on the selected shipping
                      address.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-1 gap-3">
                      {user?.addresses.length > 0 ? (
                        user?.addresses.map((addr) => (
                          <div
                            key={addr._id}
                            onClick={() => setSelectedAddressId(addr._id)}
                            className={`border rounded-lg p-4 cursor-pointer transition ${
                              selectedAddressId === addr._id
                                ? "border-blue-500 shadow-lg"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium flex items-center gap-2">
                                {addr.isDefault && <Badge>Default</Badge>}
                                {addr.street}
                              </h3>
                              <input
                                type="radio"
                                checked={selectedAddressId === addr._id}
                                onChange={() => setSelectedAddressId(addr._id)}
                                className="accent-blue-500"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {addr.city}, {addr.state} {addr.pincode}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {addr.type === "home" ? "🏠 Home" : "📦 Other"}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-600">
                          Manage addresses in{" "}
                          <Link
                            href="/profile"
                            className="text-blue-600 hover:underline font-medium"
                          >
                            profile
                          </Link>
                          .
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
              <Card>
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
                    cartItems={cartItems}
                    shippingAddress={user?.addresses.find(
                      (addr) => addr._id === selectedAddressId
                    )}
                    cartId={cart?.cartId}
                    isLogin={user ? true : false}
                  />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
