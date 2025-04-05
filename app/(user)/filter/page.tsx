"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import ProductCard from "@/components/user/product-card";
import { ArrowUpDown, Filter } from "lucide-react";

const filterSchema = z.object({
  priceRange: z.tuple([z.number(), z.number()]),
  brands: z.array(z.string()),
  categories: z.array(z.string()),
  sortOption: z.string(),
});

type FilterValues = z.infer<typeof filterSchema>;

export default function ProductListingPage() {
  const { toast } = useToast();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);
  const [localPrice, setLocalPrice] = useState<[number, number]>([200, 5200]);

  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      priceRange: [200, 5200],
      brands: [],
      categories: [],
      sortOption: "Recommended",
    },
  });

  const brands = [
    { name: "Roadster1", count: 1950 },
    { name: "Greyloong2", count: 2018 },
    { name: "Roadster3", count: 1950 },
    { name: "Greyloong4", count: 2018 },
    { name: "Roadster5", count: 1950 },
    { name: "Greyloong6", count: 2018 },
    { name: "Roadster7", count: 1950 },
    { name: "Greyloong8", count: 2018 },
    { name: "Roadster9", count: 1950 },
    { name: "Greyloong0", count: 2018 },
  ];

  const categories = [
    { name: "T-shirts", count: 193377 },
    { name: "Loange T-shirts", count: 1237 },
    { name: "T-shirts1", count: 193377 },
    { name: "Loange T-shirts2", count: 1237 },
    { name: "T-shirts2", count: 193377 },
    { name: "Loange T-shirts4", count: 1237 },
    { name: "T-shirts3", count: 193377 },
    { name: "Loange T-shirts1", count: 1237 },
    { name: "T-shirts4", count: 193377 },
    { name: "Loange T-shirts8", count: 1237 },
  ];

  const products = [
    {
      brand: "Roadster",
      name: "Men Striped Polo Collar T-shirt",
      price: 721,
      originalPrice: 1899,
      discount: 62,
    },
    ...Array(20).fill({
      brand: "Sample Brand",
      name: "Sample Product Title",
      price: 999,
      originalPrice: 1999,
      discount: 50,
    }),
  ];

  const onSubmit = (data: FilterValues) => {
    console.log("Applying filters:", data);
    toast({
      title: "Filters applied successfully",
      duration: 2000,
    });
  };

  const onReset = () => {
    form.reset({
      priceRange: [200, 5200],
      brands: [],
      categories: [],
      sortOption: "Recommended",
    });
    setLocalPrice([200, 5200]);
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (
        Array.isArray(value.priceRange) &&
        value.priceRange.length === 2 &&
        typeof value.priceRange[0] === "number" &&
        typeof value.priceRange[1] === "number"
      ) {
        setLocalPrice(value.priceRange as [number, number]);
      }
    });

    return () => subscription.unsubscribe?.();
  }, [form]);

  const FilterSidebar = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="hidden md:flex justify-between items-center">
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-blue-500 hover:underline"
          >
            Reset All
          </button>
          <button
            type="submit"
            className="text-sm text-blue-500 hover:underline"
          >
            Apply
          </button>
        </div>

        <Accordion
          type="multiple"
          defaultValue={["categories", "brand", "price"]}
        >
          <AccordionItem value="categories">
            <AccordionTrigger className="font-semibold">
              CATEGORIES
            </AccordionTrigger>
            <AccordionContent className="space-y-2 mt-2">
              {categories.map((category) => (
                <FormField
                  key={category.name}
                  name="categories"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(category.name)}
                          onCheckedChange={(checked) => {
                            checked
                              ? field.onChange([...field.value, category.name])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== category.name
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {category.name}{" "}
                        <span className="text-gray-500">
                          ({category.count})
                        </span>
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="brand">
            <AccordionTrigger className="font-semibold">BRAND</AccordionTrigger>
            <AccordionContent className="space-y-2 mt-2">
              {brands.map((brand) => (
                <FormField
                  key={brand.name}
                  name="brands"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(brand.name)}
                          onCheckedChange={(checked) => {
                            checked
                              ? field.onChange([...field.value, brand.name])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== brand.name
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {brand.name}{" "}
                        <span className="text-gray-500">({brand.count})</span>
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <button className="text-blue-500 text-sm mt-2">
                + 1119 more
              </button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger className="font-semibold">PRICE</AccordionTrigger>
            <AccordionContent className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="priceRange"
                render={({ field }) => {
                  const sliderValue =
                    Array.isArray(field.value) && field.value.length === 2
                      ? (field.value as [number, number])
                      : [200, 5200];

                  return (
                    <FormItem className="px-2">
                      <FormControl>
                        <Slider
                          min={200}
                          max={5200}
                          step={1}
                          value={sliderValue}
                          onValueChange={(val) => field.onChange(val)}
                          className="w-full"
                        />
                      </FormControl>

                      <div className="flex justify-between mt-2 text-sm font-medium">
                        <span>₹{sliderValue[0].toLocaleString()}</span>
                        <span>
                          {sliderValue[1] === 5200
                            ? `₹${sliderValue[1].toLocaleString()}+`
                            : `₹${sliderValue[1].toLocaleString()}`}
                        </span>
                      </div>
                    </FormItem>
                  );
                }}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="md:hidden space-y-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onReset}
          >
            Reset
          </Button>
          <Button type="submit" className="w-full">
            Apply
          </Button>
        </div>
      </form>
    </Form>
  );

  const SortOptions = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="sortOption"
          control={form.control}
          render={({ field }) => (
            <div className="space-y-2">
              {[
                { value: "Recommended", label: "Recommended" },
                { value: "PriceLowToHigh", label: "Price: Low to High" },
                { value: "PriceHighToLow", label: "Price: High to Low" },
                { value: "NewestFirst", label: "Newest First" },
                { value: "Discount", label: "Discount" },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={field.value === option.value ? "default" : "ghost"}
                  className="w-full justify-start"
                  type="button"
                  onClick={() => {
                    field.onChange(option.value);
                    setMobileSortOpen(false);
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          )}
        />
      </form>
    </Form>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar - Sticky with independent scrolling */}
        <div className="hidden md:block w-1/4">
          <div className="sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto pr-2">
            <div className="filter-scrollbar">
              <h1 className="text-2xl font-bold mb-6">
                Men T-Shirts{" "}
                <span className="text-gray-500 text-lg">- 193747 items</span>
              </h1>
              <FilterSidebar />
            </div>
          </div>
        </div>

        {/* Products Section - Independent scrolling */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Showing 1-{products.length} of 193747 items
            </div>
            <Form {...form}>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <FormField
                  name="sortOption"
                  control={form.control}
                  render={({ field }) => (
                    <FormControl>
                      <select
                        className="border rounded-md px-2 py-1 text-sm"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="Recommended">Recommended</option>
                        <option value="PriceLowToHigh">
                          Price: Low to High
                        </option>
                        <option value="PriceHighToLow">
                          Price: High to Low
                        </option>
                        <option value="NewestFirst">Newest First</option>
                        <option value="Discount">Discount</option>
                      </select>
                    </FormControl>
                  )}
                />
              </div>
            </Form>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                id={product.id}
                name={product.name}
                title={product.name}
                brand={product.brand}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                category={product.category}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile buttons */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 flex gap-3 z-10">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setMobileSortOpen(true)}
        >
          <ArrowUpDown className="h-5 w-5" />
          SORT
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setMobileFilterOpen(true)}
        >
          <Filter className="h-5 w-5" />
          FILTER
        </Button>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto">
            <FilterSidebar />
          </div>
        </DrawerContent>
      </Drawer>

      {/* Mobile Sort Drawer */}
      <Drawer open={mobileSortOpen} onOpenChange={setMobileSortOpen}>
        <DrawerContent className="max-h-[70vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle>Sort By</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <SortOptions />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
