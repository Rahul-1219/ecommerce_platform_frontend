"use client";

import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
}

interface SearchBoxProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  products?: Product[];
}

export function SearchBox({
  isMobile,
  isOpen,
  onOpenChange,
  products = [],
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Local search function
  const searchProducts = (searchQuery: string) => {
    const query = searchQuery.trim();
    if (!query) {
      setFilteredProducts([]);
      return;
    }

    const parts = query
      .toLowerCase()
      .split(/[^\w]+/)
      .filter((part) => part.length > 0);

    if (parts.length === 0) {
      setFilteredProducts([]);
      return;
    }

    const results = products.filter((product) => {
      const normalizedName = product.name.toLowerCase().replace(/[^\w]/g, "");

      // OR logic: At least one part must match
      return parts.some((part) => normalizedName.includes(part));
    });

    setFilteredProducts(results);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      searchProducts(query);
      setShowResults(query.length > 0);
    }, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, products]);

  const clearSearch = () => {
    setQuery("");
    setFilteredProducts([]);
    setShowResults(false);
  };

  const SearchResults = () => (
    <div className="absolute left-0 right-0 top-full mt-1 bg-white border rounded-md shadow-lg max-h-80 overflow-y-auto z-50">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Link
            key={product._id}
            href={`/product/${product._id}`}
            className="block p-3 hover:bg-gray-50"
            onClick={() => {
              setShowResults(false);
              setQuery("");
              onOpenChange?.(false);
            }}
          >
            {product.name}
          </Link>
        ))
      ) : query ? (
        <></>
      ) : null}
    </div>
  );

  if (isMobile) {
    return !isOpen ? (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onOpenChange?.(true)}
        aria-label="Open search"
      >
        <Search className="h-5 w-5" />
      </Button>
    ) : (
      <div
        className="absolute inset-0 bg-background z-50 flex items-center px-4 gap-2"
        ref={searchRef}
      >
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full h-9 pl-9 pr-9"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          {query && (
            <X
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
              onClick={clearSearch}
            />
          )}
          {showResults && <SearchResults />}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            onOpenChange?.(false);
            clearSearch();
          }}
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className="relative w-64 md:w-80 lg:w-96 hidden sm:block"
      ref={searchRef}
    >
      <Input
        type="text"
        placeholder="Search products..."
        className="h-9 pl-9 pr-9"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setShowResults(true)}
      />
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      {query && (
        <X
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
          onClick={clearSearch}
        />
      )}
      {showResults && <SearchResults />}
    </div>
  );
}
