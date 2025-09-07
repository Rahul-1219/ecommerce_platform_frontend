"use client";

import { AlertDialogBox } from "@/components/custom/alert-dialog";
import { DataTableColumnHeader } from "@/components/custom/data-table-header";
import { DrawerDialog } from "@/components/custom/drawer-dialog";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { deleteProduct, updateProduct } from "../../action";

export type Product = {
  _id: string;
  name: string;
  type: string;
  images: [
    {
      image: string;
    }
  ];
  categoryId: {
    name: string;
  };
  isActive: boolean;
};

// Name cell component
const NameCell: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link
      className="hover:text-blue-500"
      href={`/admin/product/${product.type}?id=${product._id}`}
    >
      {product.name}
    </Link>
  );
};

// Active switch cell component
const ActiveSwitchCell: React.FC<{ product: Product }> = ({ product }) => {
  const [isActive, setIsActive] = useState(product.isActive); // your comment preserved
  const { toast } = useToast();

  const handleSwitchClick = async () => {
    const newValue = !isActive; // Toggle state
    setIsActive(newValue);
    const formData = new FormData();
    formData.set("isActive", String(newValue));
    const response = await updateProduct(formData, product._id);
    if (response.status) {
      setIsActive(response.data.isActive);
    } else {
      toast({
        variant: "destructive",
        title: response.message,
        duration: 2000,
      });
    }
  };

  return <Switch checked={isActive} onClick={handleSwitchClick} />;
};

// Action cell component
const ActionCell: React.FC<{ product: Product }> = ({ product }) => {
  const { toast } = useToast();

  const handleDeleteProduct = async () => {
    const response = await deleteProduct(product._id);
    if (!response.status) {
      toast({
        variant: "destructive",
        title: response.message,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex justify-start gap-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <AlertDialogBox
              button={<Trash2 className="cursor-pointer" color="red" />}
              callback={handleDeleteProduct}
            />
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <NameCell product={row.original} />,
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) =>
      row.original?.images[0]?.image ? (
        <DrawerDialog
          title={row.original?.name}
          button={
            <Image
              src={row.original?.images[0]?.image}
              alt={row.original.name}
              width={34}
              height={34}
              className="rounded object-cover cursor-pointer"
            />
          }
        >
          <div className="flex justify-center py-2">
            <Image
              src={row.original?.images[0]?.image}
              alt={row.original.name}
              width={300}
              height={300}
              className="rounded object-cover"
            />
          </div>
        </DrawerDialog>
      ) : (
        "-"
      ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) =>
      row.original?.categoryId?.name ? row.original?.categoryId?.name : "-",
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => <ActiveSwitchCell product={row.original} />,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <ActionCell product={row.original} />,
  },
];
