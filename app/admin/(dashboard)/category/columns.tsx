"use client";

import { AlertDialogBox } from "@/components/custom/alert-dialog";
import { DataTableColumnHeader } from "@/components/custom/data-table-header";
import { DrawerDialog } from "@/components/custom/drawer-dialog";
import CategoryForm from "@/components/forms/category-form";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { activeInactiveCategory, deleteCategory } from "../../action";

// This type is used to define the shape of our data.
export type Category = {
  _id: string;
  name: string;
  image: string;
  fileId: string;
  isActive: boolean;
  type: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      // wrap hook in component
      const NameCell = () => {
        const pathname = usePathname();
        if (pathname === "/admin/category") {
          return (
            <Link
              className="hover:text-blue-500"
              href={`/admin/category/${row.original.type}?id=${row.original._id}`}
            >
              {row.original.name}
            </Link>
          );
        } else {
          return <>{row.original.name}</>;
        }
      };
      return <NameCell />;
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <DrawerDialog
        title={row.original.name}
        button={
          <Image
            src={row.original.image}
            alt={row.original.name}
            width={34}
            height={34}
            className="rounded object-cover cursor-pointer"
          />
        }
      >
        <div className="flex justify-center py-2">
          <Image
            src={row.original.image}
            alt={row.original.name}
            width={300}
            height={300}
            className="rounded object-cover"
          />
        </div>
      </DrawerDialog>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const ActiveSwitch = () => {
        const [isActive, setIsActive] = useState(row.original.isActive);
        const { toast } = useToast();
        const handleSwitchClick = async () => {
          const newValue = !isActive; // Toggle state
          setIsActive(newValue);
          const response = await activeInactiveCategory(
            { isActive: newValue },
            row.original._id
          );
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
      return <ActiveSwitch />;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const ActionCell = () => {
        const drawerRef = useRef<any>(null); // Reference to DrawerDialog
        const { toast } = useToast();

        const closeDrawer = () => {
          if (drawerRef.current) {
            drawerRef.current.close(); // Close drawer via ref
          }
        };

        const handleDeleteCategory = async () => {
          const response = await deleteCategory(row.original._id);
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
                  <DrawerDialog
                    ref={drawerRef}
                    title="Edit Category"
                    button={<SquarePen className="cursor-pointer" />}
                  >
                    <CategoryForm
                      row={row}
                      className="px-4"
                      action="edit"
                      onClose={closeDrawer}
                    />
                  </DrawerDialog>
                </TooltipTrigger>
                <TooltipContent>Edit</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <AlertDialogBox
                    button={<Trash2 className="cursor-pointer" color="red" />}
                    callback={handleDeleteCategory}
                  />
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      };
      return <ActionCell />;
    },
  },
];
