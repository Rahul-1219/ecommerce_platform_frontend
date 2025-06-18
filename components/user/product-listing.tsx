"use client";

import { getFilterProducts } from "@/app/(user)/action";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import FilterSidebar from "@/components/user/filter-sidebar";
import ProductCard from "@/components/user/product-card";
import { useToast } from "@/hooks/use-toast";
import { Filter, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface FilterOption {
  _id: string;
  label: string;
  value: string;
}

interface Category {
  _id: string;
  name: string;
  type: string;
  isActive: boolean;
  subcategories: Array<{
    _id: string;
    name: string;
    type: string;
    isActive: boolean;
  }>;
}

interface PriceOption {
  label: string;
  type: string;
}

interface ProductListingProps {
  filterOptions: {
    tags: FilterOption[];
    categories: Category[];
    price: PriceOption[];
  };
  initialProducts: any[];
  initialPagination: any;
  defaultFilters: any;
}

interface FiltersState {
  tags: string[];
  subcategories: string[];
  price: string;
  [key: string]: any; // Index signature for dynamic access
}

export default function ProductListing({
  filterOptions,
  initialProducts,
  initialPagination,
  defaultFilters,
}: ProductListingProps) {
  const { toast } = useToast();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);

  const { ref, inView } = useInView({ threshold: 0.2 });
  const router = useRouter();

  const loadProducts = useCallback(
    async (page: number, reset = false, reqFilters: any = null) => {
      setLoading(true);
      try {
        const filtersToApply = reqFilters !== null ? reqFilters : filters;
        const response = await getFilterProducts(filtersToApply, page);
        const { data: newProducts, pagination: newPagination } = response;

        if (reset) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => [...prev, ...newProducts]);
        }
        setPagination(newPagination);
        setFilters(response.filterOptions);
      } catch (error) {
        console.error("Error loading products:", error);
        toast({
          title: "Error loading products",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [filters, toast]
  );

  const handleApplyFilters = useCallback(
    (newFilters: Partial<FiltersState>) => {
      setFilters((prev) => ({
        ...prev,
        ...newFilters,
      }));
      newFilters.category = defaultFilters.category;
      // Use setTimeout to ensure state is updated before loading products
      loadProducts(1, true, newFilters);

      toast({
        title: "Filters applied successfully",
        duration: 2000,
      });
      setMobileFilterOpen(false);
    },
    [loadProducts, toast]
  );

  // Reset products when filters change (for initial load)
  useEffect(() => {
    loadProducts(1, true);
  }, []); // Empty dependency array to run only once on mount

  // Infinite scroll for mobile
  useEffect(() => {
    if (
      inView &&
      !loading &&
      pagination.hasNextPage &&
      window.innerWidth < 768
    ) {
      loadProducts(pagination.currentPage + 1);
    }
  }, [inView, loading, pagination, loadProducts]);

  const handleLoadMore = () => {
    if (!loading && pagination.hasNextPage) {
      loadProducts(pagination.currentPage + 1);
    }
  };

  const handleResetFilters = (filters) => {
    router.push("/filter");
    setFilters(filters);
    loadProducts(1, true, filters);
  };

  return (
    <div className="container mx-auto px-4  py-8 sm:px-6 md:px-8 lg:px-10">
      {/* Desktop Layout */}
      <div className="hidden md:flex">
        {/* Filters Sidebar - Fixed position */}
        <div className="w-72 pr-4 border-r h-[calc(100vh-8rem)] sticky top-24 overflow-y-auto">
          <FilterSidebar
            filterOptions={filterOptions}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
            initialFilters={filters}
          />
        </div>

        {/* Products Section - Scrollable */}
        <div className="flex-1 pl-6">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <div className="text-sm text-gray-500">
              Showing 1-{products.length} of {pagination.count} items
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pb-8">
            {products.map((product) => (
              <Link href={`/product/${product._id}`} key={product._id}>
                <ProductCard
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.images[0].image}
                />
              </Link>
            ))}
          </div>

          {/* Show More button for desktop */}
          {pagination.hasNextPage ? (
            <div className="flex justify-center">
              {loading ? (
                <Loader className="h-6 w-6 animate-spin" />
              ) : (
                <Button
                  variant="link"
                  disabled={loading}
                  onClick={handleLoadMore}
                  className="min-w-32 text-blue-800"
                >
                  Show More
                </Button>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
          <div className="text-sm text-gray-500">
            Showing 1-{products.length} of {pagination.count} items
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <Link href={`/product/${product._id}`} key={product._id}>
              <ProductCard
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.images[0].image}
              />
            </Link>
          ))}
          {loading && (
            <div className="col-span-full text-center py-4">
              <Loader className="h-6 w-6 animate-spin mx-auto" />
            </div>
          )}
          <div ref={ref} className="h-0 w-full col-span-full" />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="border-b sticky top-0 bg-white z-10">
            <DrawerTitle className="uppercase">Filters</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto">
            <FilterSidebar
              filterOptions={filterOptions}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
              initialFilters={filters}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
