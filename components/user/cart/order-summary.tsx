// components/cart/OrderSummary.tsx
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <div className="rounded-lg h-full flex flex-col">
      <div className="mt-6 space-y-4 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">Subtotal</p>
          <p className="text-sm font-bold text-gray-900">
            ${subtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <p className="text-sm font-medium text-gray-600">Shipping</p>
          <p className="text-sm font-bold text-gray-900">
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <p className="text-sm font-medium text-gray-600">Tax</p>
          <p className="text-sm font-bold text-gray-900">${tax.toFixed(2)}</p>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-gray-900">Order total</p>
          <p className="text-base font-bold text-gray-900">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      <Button className="w-full mt-6" size="lg">
        PROCEED TO CHECKOUT
      </Button>

      <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
        <p>
          or{" "}
          <a
            href="/shop"
            className="font-medium text-primary hover:text-primary/80"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </p>
      </div>
    </div>
  );
}
