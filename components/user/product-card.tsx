"use client";

import Image from "next/image";
import React from "react";
const ProductCard: React.FC<any> = ({
  name,
  description,
  price,
  imageUrl,
  isCompact = false,
}) => {
  return (
    <div
      className={`border p-3 sm:p-4 hover:shadow-lg transition-shadow cursor-pointer h-full ${
        isCompact ? "w-[180px] sm:w-[200px]" : ""
      }`}
    >
      <div className="aspect-square bg-gray-100 mb-2 rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          width={200}
          height={200}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="space-y-1">
        {name && (
          <h3 className="font-medium text-sm sm:text-base truncate text-customBlack">
            {name}
          </h3>
        )}
        {description && (
          <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
        )}

        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-sm sm:text-base text-customBlack">
            Rs. {price}
          </span>
          {/* {originalPrice && discount && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 line-through">
                Rs. {originalPrice}
              </span>
              <span className="text-xs text-green-600">{discount}% OFF</span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
