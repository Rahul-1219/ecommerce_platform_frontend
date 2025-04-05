"use client";
import { Check, Heart, Share2, ShoppingCart, Star } from "lucide-react";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

const ProductDetail = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product?.productVariants?.[0]?.color || ""
  );

  const [selectedSize, setSelectedSize] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const mainSwiperRef = useRef(null);

  const currentVariant =
    product?.productVariants?.find((v: any) => v.color === selectedColor) ||
    product?.productVariants?.[0] ||
    {}; // Default to an empty object

  const availableSizes = currentVariant?.size
    ? currentVariant?.size.split(", ")
    : [];

  const handleQuantityChange = (value) => {
    const newValue = quantity + value;
    if (newValue >= 1 && newValue <= currentVariant?.quantity) {
      setQuantity(newValue);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Product Images with Swiper */}
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
              {product.productImages.map((img) => (
                <SwiperSlide key={img._id}>
                  <div className="swiper-zoom-container">
                    <img
                      src={img.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    {!product.isActive && (
                      <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Out of Stock
                      </span>
                    )}
                    {currentVariant?.quantity < 5 &&
                      currentVariant?.quantity > 0 && (
                        <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Low Stock
                        </span>
                      )}
                  </div>
                </SwiperSlide>
              ))}
              {/* Custom Navigation Buttons */}
              <div className="swiper-button-next !w-10 !h-10 !bg-white/80 !rounded-full !shadow-md !text-gray-700 after:!text-xl after:!font-bold" />
              <div className="swiper-button-prev !w-10 !h-10 !bg-white/80 !rounded-full !shadow-md !text-gray-700 after:!text-xl after:!font-bold" />
            </Swiper>
          </div>

          {/* Thumbnail Gallery */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={"auto"}
            freeMode={true}
            centeredSlides={false}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="!py-2"
          >
            {product.productImages.map((img, index) => (
              <SwiperSlide key={img._id} className="!w-16 !h-16">
                <div
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-all swiper-thumbnail ${
                    activeSlideIndex === index
                      ? "border-blue-500"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <img
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
          {/* Title and Actions */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-sm text-gray-500">
                {product.categoryId.name}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">
                {product.name}
              </h1>
            </div>
            <div className="flex gap-2">
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
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-6">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < 4 ? "fill-current" : ""}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">(128 reviews)</span>
          </div>

          {/* Price Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${currentVariant?.price?.toFixed(2)}
              </span>
              {currentVariant?.price < product.price && (
                <span className="text-lg text-gray-500 line-through">
                  ${product?.price?.toFixed(2)}
                </span>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {currentVariant?.quantity > 0 ? (
                <span className="text-green-600 font-medium">
                  {currentVariant?.quantity} available
                </span>
              ) : (
                <span className="text-red-600 font-medium">Out of stock</span>
              )}
            </div>
          </div>

          {/* Color Variants */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
            <div className="flex gap-2">
              {product?.productVariants?.map((variant) => (
                <button
                  key={variant._id}
                  onClick={() => {
                    setSelectedColor(variant.color);
                    setSelectedSize(null);
                  }}
                  className={`w-10 h-10 rounded-full transition-all flex items-center justify-center relative ${
                    selectedColor === variant.color
                      ? "after:content-[''] after:absolute after:inset-[-4px] after:rounded-full after:border-2 after:border-[#c2c2c2]"
                      : ""
                  }`}
                  style={{ backgroundColor: variant.color.toLowerCase() }}
                  title={variant.color}
                ></button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <button className="text-xs text-blue-600 hover:text-blue-800">
                Size guide
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={!product.isActive}
                  className={`py-2 px-3 border rounded-md text-sm font-medium transition-all ${
                    selectedSize === size
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  } ${
                    !product.isActive ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center max-w-xs">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1 || !product.isActive}
                className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                -
              </button>
              <div className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={
                  quantity >= currentVariant?.quantity || !product.isActive
                }
                className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              disabled={!selectedSize || !product.isActive}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              disabled={!selectedSize || !product.isActive}
              className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium flex-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Buy Now
            </button>
          </div>

          {/* Product Description */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
