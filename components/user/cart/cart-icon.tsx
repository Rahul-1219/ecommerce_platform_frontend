import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export function CartIcon({ count }: { count: number }) {
  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
