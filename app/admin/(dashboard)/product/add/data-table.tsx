"use client";

import { DataTable } from "@/components/custom/data-table";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { columns } from "./columns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export type Variant = {
  _id: string | null;
  color: string;
  size: string;
  price: number;
  quantity: number;
};

const ProductVariantDataTable = ({
  data = [],
  setVariants,
}: {
  data: Variant[];
  setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
}) => {
  const [variant, setVariant] = useState<Variant>({
    _id: null,
    color: "",
    size: "",
    price: 0,
    quantity: 0,
  });

  const handleVariant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVariant((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleAddVariant = () => {
    setVariants((prev) => [variant, ...prev]);
    setVariant({
      _id: null,
      color: "",
      size: "",
      price: 0,
      quantity: 0,
    });
  };

  const updateData = (rowIndex: number, updatedVariant: Variant) => {
    setVariants((prev) => {
      const newVariants = [...prev];
      newVariants[rowIndex] = updatedVariant;
      return newVariants;
    });
  };

  const deleteData = (rowIndex: number) => {
    setVariants((prev) => prev.filter((_, index) => index !== rowIndex));
  };

  return (
    <div className="container mx-auto">
      <DataTable
        columns={columns}
        data={data}
        meta={{
          updateData,
          deleteData,
        }}
        pageSize={5}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 px-3"
            >
              <CirclePlus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Product Variant</h4>
                <p className="text-sm text-muted-foreground">
                  Add a new variant to the product.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    name="color"
                    className="col-span-2 h-8"
                    value={variant.color}
                    onChange={handleVariant}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    name="size"
                    className="col-span-2 h-8"
                    value={variant.size}
                    onChange={handleVariant}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    className="col-span-2 h-8"
                    type="number"
                    value={variant.price}
                    onChange={handleVariant}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    className="col-span-2 h-8"
                    type="number"
                    value={variant.quantity}
                    onChange={handleVariant}
                  />
                </div>
                <Button
                  className="py-4"
                  onClick={handleAddVariant}
                  type="button"
                >
                  Add
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </DataTable>
    </div>
  );
};

export default ProductVariantDataTable;
