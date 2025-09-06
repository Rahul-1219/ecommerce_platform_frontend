// components/cart/CartItem.tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface CartItemProps {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
  stock: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItem({
  id,
  productId,
  name,
  price,
  size,
  color,
  quantity,
  image,
  stock,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4 py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden">
        <Link href={`/product/${productId}`}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain transition-transform duration-300 hover:scale-110"
            sizes="(max-width: 640px) 100vw, 96px"
          />
        </Link>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between">
          <div>
            <Link href={`/product/${productId}`}>
              <h3 className="font-medium text-customBlack hover:text-blue-500">
                {name}
              </h3>
            </Link>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              {color && (
                <>
                  <span
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                  <span>/</span>
                </>
              )}
              <span>{size}</span>
            </div>
          </div>
          <p className="font-medium text-customBlack">Rs. {price.toFixed(2)}</p>
        </div>

        <div className="mt-4 flex-1 flex items-end justify-between">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-r-none rounded-l-[0.125rem]"
              onClick={onDecrease}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-l-none rounded-r-[0.125rem]"
              onClick={onIncrease}
              disabled={quantity >= stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600"
            onClick={onRemove}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
