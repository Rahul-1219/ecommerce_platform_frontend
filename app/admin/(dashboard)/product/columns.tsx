"use client";

import { DataTableColumnHeader } from "@/components/custom/data-table-header";
import { DrawerDialog } from "@/components/custom/drawer-dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { deleteProduct, updateProduct } from "../../action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertDialogBox } from "@/components/custom/alert-dialog";
import { Trash2 } from "lucide-react";

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

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const pathname = usePathname();
      return (
        <Link
          className="hover:text-blue-500"
          href={`/admin/product/${row.original.type}?id=${row.original._id}`}
        >
          {row.original.name}
        </Link>
      );
    },
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
    cell: ({ row }) => {
      const [isActive, setIsActive] = useState(row.original.isActive);
      const { toast } = useToast();
      const handleSwitchClick = async () => {
        const newValue = !isActive; // Toggle state
        setIsActive(newValue);
        const formData = new FormData();
        formData.set("isActive", String(newValue));
        const response = await updateProduct(formData, row.original._id);
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
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const { toast } = useToast();

      const handleDeleteProduct = async () => {
        const response = await deleteProduct(row.original._id);
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
    },
  },
];
