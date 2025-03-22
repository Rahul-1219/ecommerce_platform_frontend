"use client";

import { DataTableColumnHeader } from "@/components/custom/data-table-header";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Variant } from "./data-table";

export const columns: ColumnDef<Variant>[] = [
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row, table }) => {
      const updateData = table.options.meta?.updateData;

      return (
        <Input
          value={row.original.color}
          onChange={(e) => {
            if (updateData) {
              const updatedVariant = {
                ...row.original,
                color: e.target.value,
              };
              updateData(row.index, updatedVariant);
            }
          }}
          className="w-full"
        />
      );
    },
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row, table }) => {
      const updateData = table.options.meta?.updateData;

      return (
        <Input
          value={row.original.size}
          onChange={(e) => {
            if (updateData) {
              const updatedVariant = {
                ...row.original,
                size: e.target.value,
              };
              updateData(row.index, updatedVariant);
            }
          }}
          className="w-full"
        />
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row, table }) => {
      const updateData = table.options.meta?.updateData;

      return (
        <Input
          type="number"
          value={row.original.price}
          onChange={(e) => {
            if (updateData) {
              const updatedVariant = {
                ...row.original,
                price: parseFloat(e.target.value) || 0,
              };
              updateData(row.index, updatedVariant);
            }
          }}
          className="w-full"
        />
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row, table }) => {
      const updateData = table.options.meta?.updateData;

      return (
        <Input
          type="number"
          value={row.original.quantity}
          onChange={(e) => {
            if (updateData) {
              const updatedVariant = {
                ...row.original,
                quantity: parseInt(e.target.value) || 0,
              };
              updateData(row.index, updatedVariant);
            }
          }}
          className="w-full"
        />
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const deleteData = table.options.meta?.deleteData;

      return (
        <Trash2
          size={22}
          className="cursor-pointer"
          onClick={() => deleteData && deleteData(row.index)}
          color="red"
        />
      );
    },
  },
];
