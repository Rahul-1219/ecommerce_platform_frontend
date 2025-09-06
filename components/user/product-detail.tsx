"use client";

import { addToCart } from "@/app/(user)/action";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

interface Variant {
  _id: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
  isAddedToCart: boolean;
}

const ProductDetail = ({ product }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [isAddingCart, setIsAddingCart] = useState(false);

  const mainSwiperRef = useRef(null);

  // Group variants by color (replace empty with "No Color")
  const groupedVariants = useMemo(() => {
    if (!product?.productVariants) return {};
    return product.productVariants.reduce((acc, variant) => {
      const colorKey = variant.color?.trim() || "No Color";
      if (!acc[colorKey]) acc[colorKey] = [];
      acc[colorKey].push(variant);
      return acc;
    }, {});
  }, [product]);

  // Check if any real colors exist
  const hasColors = useMemo(() => {
    return Object.keys(groupedVariants).some((c) => c !== "No Color");
  }, [groupedVariants]);

  const hasPrice = product?.productVariants?.some((v) => v.price);

  // Sizes for the selected color
  const availableSizes = useMemo(() => {
    if (!selectedColor || !groupedVariants[selectedColor]) return [];
    return groupedVariants[selectedColor].map((v) => v.size);
  }, [selectedColor, groupedVariants]);

  // Update selectedVariant when color/size changes
  useEffect(() => {
    // Default selection: if no colors at all, select "No Color"
    if (!selectedColor) {
      if (groupedVariants["No Color"]) {
        setSelectedColor("No Color");
      } else {
        const firstColor = Object.keys(groupedVariants)[0];
        setSelectedColor(firstColor);
      }
    }

    if (selectedColor && selectedSize && groupedVariants[selectedColor]) {
      const variant = groupedVariants[selectedColor].find(
        (v) => v.size === selectedSize
      );
      setSelectedVariant(variant || null);
    } else if (selectedColor && groupedVariants[selectedColor]) {
      const variant = groupedVariants[selectedColor][0];
      setSelectedSize(variant.size || null);
      setSelectedVariant(variant);
    }
  }, [selectedColor, selectedSize, groupedVariants]);

  const currentVariant = selectedVariant;

  // Check if out of stock
  const isOutOfStock = useMemo(() => {
    if (!product?.isActive) return true;
    if (!currentVariant) return true;
    return currentVariant.quantity <= 0;
  }, [product?.isActive, currentVariant]);

  const handleQuantityChange = (value: number) => {
    const newValue = quantity + value;
    if (newValue >= 1 && newValue <= (currentVariant?.quantity || 0)) {
      setQuantity(newValue);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingCart(true);
    try {
      const response = await addToCart({
        productId: product._id,
        productVariantId: currentVariant?._id || "",
        quantity: quantity,
        size: selectedSize || "",
      });
      if (!response.status) throw new Error(response.message);
      // router.push("/cart");
      toast({ title: response.message, duration: 2000 });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message || "Failed to add to cart",
        duration: 2000,
      });
    } finally {
      setIsAddingCart(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="mb-4 rounded-xl overflow-hidden shadow-sm relative">
            <Swiper
              ref={mainSwiperRef}
              spaceBetween={10}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              zoom={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs, Zoom]}
              className="aspect-square bg-gray-50"
              onSlideChange={(swiper) =>
                setActiveSlideIndex(swiper.activeIndex)
              }
            >
              {product?.productImages?.map((img) => (
                <SwiperSlide key={img._id}>
                  <div className="swiper-zoom-container">
                    <Image
                      fill
                      src={img.image}
                      alt={product?.name}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    {!product?.isActive && (
                      <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Out of Stock
                      </span>
                    )}
                    {currentVariant?.quantity! < 5 &&
                      currentVariant?.quantity! > 0 && (
                        <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Low Stock
                        </span>
                      )}
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-button-next !w-10 !h-10 !bg-white/80 !rounded-full !shadow-md !text-gray-700 after:!text-xl after:!font-bold" />
              <div className="swiper-button-prev !w-10 !h-10 !bg-white/80 !rounded-full !shadow-md !text-gray-700 after:!text-xl after:!font-bold" />
            </Swiper>
          </div>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={"auto"}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="!py-2"
          >
            {product?.productImages?.map((img, index) => (
              <SwiperSlide key={img._id} className="!w-16 !h-16">
                <div
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-all swiper-thumbnail ${
                    activeSlideIndex === index
                      ? "border-blue-500"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <Image
                    fill
                    src={img.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-customBlack mt-1">
                {product?.name}
              </h1>
              <span className="text-md text-gray-500">
                {product?.categoryId.name}
              </span>
            </div>
            {/* <div className="flex gap-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full ${
                  isWishlisted
                    ? "text-red-500"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-600">
                <Share2 className="w-5 h-5" />
              </button>
            </div> */}
          </div>

          {/* Rating */}
          {/* <div className="flex items-center mb-6">
            <div className="flex text-amber-400">
              {[...Array(5)]?.map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < 4 ? "fill-current" : ""}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">(128 reviews)</span>
          </div> */}

          {/* Price */}
          <div className="mb-6 py-4 px-2 bg-gray-50 rounded-[0.125rem]">
            <div className="flex items-baseline gap-3">
              {hasPrice ? (
                <span className="text-xl font-bold text-customBlack">
                  Rs. {currentVariant?.price?.toFixed(2)}
                </span>
              ) : (
                <span className="text-xl font-bold text-customBlack">
                  Rs. {product?.price?.toFixed(2)}
                </span>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {currentVariant?.quantity! > 0 ? (
                <span className="text-green-600 font-medium">
                  {currentVariant?.quantity} available
                </span>
              ) : (
                <span className="text-red-600 font-medium">Out of stock</span>
              )}
            </div>
          </div>

          {/* Color selector (skip if only "No Color") */}
          {hasColors && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex gap-2">
                {Object.keys(groupedVariants).map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedSize(null);
                      setQuantity(1);
                    }}
                    className={`w-10 h-10 rounded-full transition-all flex items-center justify-center relative ${
                      selectedColor === color
                        ? "after:content-[''] after:absolute after:inset-[-4px] after:rounded-full after:border-2 after:border-[#c2c2c2]"
                        : ""
                    }`}
                    style={{
                      backgroundColor:
                        color === "No Color" ? "#e5e7eb" : color.toLowerCase(),
                      border:
                        color.toLowerCase() === "white"
                          ? "1px solid #ccc"
                          : "none",
                    }}
                    title={color}
                  >
                    {color === "No Color" && (
                      <span className="text-xs text-gray-600">N</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {availableSizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size || null);
                      setQuantity(1);
                    }}
                    disabled={!product?.isActive}
                    className={`py-2 px-3 border rounded-[0.125rem] text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-gray-400"
                    } ${
                      !product?.isActive ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center max-w-xs">
              {/* Decrease Button */}
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1 || isOutOfStock}
                className="w-10 h-10 border border-gray-300 rounded-l-[0.125rem] flex items-center justify-center disabled:opacity-50 hover:bg-gray-50"
              >
                -
              </button>
              <div className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={
                  isOutOfStock || quantity >= (currentVariant?.quantity || 0)
                }
                className="w-10 h-10 border border-gray-300 rounded-r-[0.125rem] flex items-center justify-center disabled:opacity-50 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {currentVariant?.isAddedToCart ? (
              <button
                className="bg-customBlack hover:bg-[#191919e5] border-2 border-customBlack hover:border-[#191919e5] uppercase text-white py-3 px-6 rounded-[0.125rem] font-medium flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart className="w-6 h-6" />
                Go to Cart
              </button>
            ) : (
              <button
                disabled={isOutOfStock || isAddingCart || !selectedSize}
                className="bg-customBlack hover:bg-[#191919e5] border-2 border-customBlack hover:border-[#191919e5] uppercase text-white py-3 px-6 rounded-[0.125rem] font-medium flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                onClick={handleAddToCart}
              >
                {isAddingCart ? (
                  <Loader2 />
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart
                  </>
                )}
              </button>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
