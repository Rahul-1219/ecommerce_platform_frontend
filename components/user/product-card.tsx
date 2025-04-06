"use client";

import React from "react";
import Image from "next/image";

interface ProductCardProps {
  id: number;
  name: string;
  title?: string;
  brand?: string;
  price: string | number;
  originalPrice?: string | number;
  discount?: number | string;
  category?: string;
  imageUrl?: string;
  isCompact?: boolean; // used for Swiper cards
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  title,
  brand,
  price,
  originalPrice,
  discount,
  category,
  imageUrl = "/images/hero/women-fashion.jpeg",
  isCompact = false,
}) => {
  return (
    <div
      className={`border rounded-lg p-3 sm:p-4 hover:shadow-lg transition-shadow cursor-pointer h-full ${
        isCompact ? "w-[180px] sm:w-[200px]" : ""
      }`}
    >
      <div className="aspect-square bg-gray-100 mb-2 rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-1">
        {brand && (
          <h3 className="font-medium text-sm sm:text-base line-clamp-1">
            {brand}
          </h3>
        )}
        {title && (
          <p className="text-xs text-gray-600 line-clamp-2 h-10">{title}</p>
        )}
        {!brand && !title && (
          <>
            <h3 className="font-medium text-sm sm:text-base truncate">
              {name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">{category}</p>
          </>
        )}

        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-sm sm:text-base">Rs. {price}</span>
          {originalPrice && discount && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 line-through">
                Rs. {originalPrice}
              </span>
              <span className="text-xs text-green-600">{discount}% OFF</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
