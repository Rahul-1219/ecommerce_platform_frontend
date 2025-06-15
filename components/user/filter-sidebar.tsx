"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const filterSchema = z.object({
  tags: z.array(z.string()),
  subcategories: z.array(z.string()),
  price: z.string().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;

interface FilterSidebarProps {
  filterOptions: {
    tags: Array<{ _id: string; label: string }>;
    categories: Array<{
      _id: string;
      name: string;
      subcategories: Array<{ _id: string; name: string }>;
    }>;
    price: Array<{ label: string; type: string }>;
  };
  onApplyFilters: (filters: FilterValues) => void;
  onResetFilters: (filters: FilterValues) => void;
  initialFilters: any;
}

export default function FilterSidebar({
  filterOptions,
  onApplyFilters,
  onResetFilters,
  initialFilters,
}: FilterSidebarProps) {
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      tags: initialFilters.tags || [],
      subcategories: initialFilters.subcategories || [],
      price: initialFilters.price || "",
    },
  });

  // Watch all form values to determine button states
  const formValues = useWatch({
    control: form.control,
  });

  // Check if any filters are selected
  const hasFilters = Boolean(
    (formValues?.tags && formValues.tags.length > 0) ||
      (formValues?.subcategories && formValues.subcategories.length > 0) ||
      (formValues?.price && formValues.price !== "")
  );

  const onSubmit = (data: FilterValues) => {
    onApplyFilters(data);
  };

  const onReset = () => {
    const defaultValues = {
      tags: [],
      subcategories: [],
      price: "",
    };
    form.reset(defaultValues);
    onResetFilters(defaultValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="hidden md:flex justify-between items-center">
          <button
            type="button"
            onClick={onReset}
            disabled={!hasFilters}
            className={`text-sm ${
              hasFilters
                ? "text-blue-500 hover:underline"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Reset All
          </button>
          <button
            type="submit"
            disabled={!hasFilters}
            className={`text-sm ${
              hasFilters
                ? "text-blue-500 hover:underline"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Apply
          </button>
        </div>

        <Accordion
          type="multiple"
          defaultValue={["tags", "categories", "price"]}
        >
          {/* Tags Filter */}
          <AccordionItem value="tags">
            <AccordionTrigger className="font-semibold">TAGS</AccordionTrigger>
            <AccordionContent className="space-y-3 mt-2">
              {filterOptions.tags.map((tag) => (
                <FormField
                  key={tag._id}
                  name="tags"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(tag._id)}
                          onCheckedChange={(checked) => {
                            checked
                              ? field.onChange([...field.value, tag._id])
                              : field.onChange(
                                  field.value?.filter((v) => v !== tag._id)
                                );
                          }}
                          className="h-4 w-4"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal leading-none">
                        {tag.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Categories Filter */}
          <AccordionItem value="categories">
            <AccordionTrigger className="font-semibold">
              CATEGORIES
            </AccordionTrigger>
            <AccordionContent className="space-y-3 mt-2 ms-3">
              <Accordion type="multiple" className="space-y-3">
                {filterOptions.categories.map((category) => (
                  <AccordionItem
                    key={category._id}
                    value={category._id}
                    className="border-none"
                  >
                    <AccordionTrigger className="py-1 hover:no-underline">
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="ml-6 mt-2 space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <FormField
                          key={subcategory._id}
                          name="subcategories"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(
                                    subcategory._id
                                  )}
                                  onCheckedChange={(checked) => {
                                    checked
                                      ? field.onChange([
                                          ...field.value,
                                          subcategory._id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (v) => v !== subcategory._id
                                          )
                                        );
                                  }}
                                  className="h-4 w-4"
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal leading-none">
                                {subcategory.name}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>

          {/* Price Filter */}
          <AccordionItem value="price">
            <AccordionTrigger className="font-semibold">PRICE</AccordionTrigger>
            <AccordionContent className="mt-2 space-y-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value || ""}
                        className="flex flex-col space-y-3"
                      >
                        {filterOptions.price.map((priceOption) => (
                          <FormItem
                            key={priceOption.type}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={priceOption.type} />
                            </FormControl>
                            <FormLabel className="text-sm font-normal leading-none">
                              {priceOption.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Mobile buttons */}
        <div className="md:hidden flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onReset}
            disabled={!hasFilters}
          >
            Reset
          </Button>
          <Button type="submit" className="flex-1" disabled={!hasFilters}>
            Apply
          </Button>
        </div>
      </form>
    </Form>
  );
}
