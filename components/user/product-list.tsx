"use client";

import Link from "next/link";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./product-card";

interface Product {
  _id: string;
  name: string;
  price: string;
  description: string;
  category: { name: string };
  images: [
    {
      image: string;
    }
  ];
}

interface ProductListProps {
  title: string;
  tagId: string;
  products: Product[];
  showAllButton?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  tagId,
  products,
  showAllButton = true,
}) => {
  return (
    <div className="container p-4 sm:p-6 my-6 sm:my-8 bg-gray-50">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        {/* Responsive title text */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-customBlack uppercase">
          {title}
        </h2>
        {showAllButton && (
          <Link
            href={`/filter?t=${tagId}`}
            className="hover:underline hover:underline-offset-4 hover:decoration-2 text-sm uppercase font-semibold"
          >
            Show all
          </Link>
        )}
      </div>

      {/* Swiper for mobile AND tablets (up to lg breakpoint) */}
      <div className="xl:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={"auto"}
          centeredSlides={false}
          freeMode={true}
          modules={[FreeMode]}
          className="px-2 pb-10"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className="!w-[180px] sm:!w-[200px]">
              <Link href={`/product/${product._id}`}>
                <ProductCard
                  id={product._id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  originalPrice={product.price}
                  discount={10}
                  category={product.category.name}
                  imageUrl={product.images[0].image}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid (lg breakpoint and above) */}
      <div className="hidden xl:grid grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id}>
            <ProductCard
              id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              originalPrice={product.price}
              discount={10}
              category={product.category.name}
              imageUrl={product.images[0].image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
