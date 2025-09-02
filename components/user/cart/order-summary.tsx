// components/cart/OrderSummary.tsx
import { createCheckoutSession } from "@/app/(user)/action";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  cartItems: any;
  shippingAddress: any;
  cartId: string;
  isLogin: boolean;
}

export function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
  cartItems,
  shippingAddress,
  cartId,
  isLogin,
}: OrderSummaryProps) {
  const { toast } = useToast();
  const [isCheckout, setIsCheckout] = useState(false);
  const router = useRouter();
  const handleCheckout = async () => {
    try {
      if (!isLogin) {
        router.push("/login");
        return;
      }
      if (!cartItems || cartItems.length === 0) return;
      if (!shippingAddress) {
        throw new Error("Please select shipping address.");
      }
      setIsCheckout(true);
      const res = await createCheckoutSession({
        cartItems,
        totalAmount: total,
        shippingAddress: shippingAddress,
        cartId,
      });
      if (!res) {
        router.push("/login");
      } else {
        if (res.status) {
          const { url } = res.data;
          if (url) {
            window.location.href = url;
          }
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
        duration: 2000,
      });
    } finally {
      setTimeout(() => {
        setIsCheckout(false);
      }, 2000);
    }
  };
  return (
    <div className="rounded-lg h-full flex flex-col">
      <div className="mt-6 space-y-4 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">Subtotal</p>
          <p className="text-sm font-bold text-gray-900">
            Rs.{subtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <p className="text-sm font-medium text-gray-600">Shipping</p>
          <p className="text-sm font-bold text-gray-900">
            {shipping === 0 ? "FREE" : `Rs. ${shipping.toFixed(2)}`}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <p className="text-sm font-medium text-gray-600">Tax</p>
          <p className="text-sm font-bold text-gray-900">
            {tax !== 0 && "Rs. "}
            {tax.toFixed(2)}
          </p>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-gray-900">Order total</p>
          <p className="text-base font-bold text-gray-900">
            Rs.{total.toFixed(2)}
          </p>
        </div>
      </div>

      <Button
        className="w-full mt-6"
        size="lg"
        onClick={handleCheckout}
        disabled={isCheckout}
      >
        {isCheckout ? (
          <Loader2 className="animate-spin" />
        ) : (
          "PROCEED TO CHECKOUT"
        )}
      </Button>

      <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
        <p>
          or{" "}
          <Link
            href={"/filter"}
            className="font-medium text-primary hover:text-primary/80"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
