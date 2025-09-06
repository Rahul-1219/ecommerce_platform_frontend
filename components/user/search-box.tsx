"use client";

import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  _id: string;
  name: string;
}

interface SearchBoxProps {
  products?: Product[];
}

export function SearchBox({ products = [] }: SearchBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!query) {
      setFilteredProducts(products);
    } else {
      const q = query.trim().toLowerCase();
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(q)
      );
      setFilteredProducts(results);
    }
  }, [query, products]);

  const clearSearch = () => {
    setQuery("");
    setFilteredProducts(products);
  };

  return (
    <>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} aria-label="Open search">
          <Search className="h-6 w-6 text-white" />
        </button>
      ) : null}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-white px-4 pt-4"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Search Bar */}
            <div className="flex items-center w-full max-w-3xl mx-auto gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full h-12 pl-10 pr-10 border border-gray-300 bg-white text-customBlack font-medium 
                             focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-none"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-customBlack underline underline-offset-4 decoration-2 font-bold uppercase text-xs sm:text-sm"
                    onClick={clearSearch}
                  >
                    Clear
                  </span>
                )}
              </div>

              {/* Close Button OUTSIDE search bar */}
              <button
                className="text-customBlack"
                onClick={() => {
                  setIsOpen(false);
                  clearSearch();
                }}
              >
                <X className="h-7 w-7 sm:h-8 sm:w-8" />
              </button>
            </div>

            {/* Product Results */}
            <div className="mt-4 w-full max-w-3xl mx-auto flex-1 overflow-y-auto scrollbar-hide">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    className="block p-3 text-customBlack hover:bg-gray-100 font-normal text-sm md:text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {product.name}
                  </Link>
                ))
              ) : (
                <div className="p-3 text-gray-500 text-sm sm:text-base">
                  No products found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
