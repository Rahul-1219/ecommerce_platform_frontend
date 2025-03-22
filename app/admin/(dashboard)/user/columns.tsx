"use client";

import { DataTableColumnHeader } from "@/components/custom/data-table-header";
import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheckBig, CircleX } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  isActive: boolean;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "isVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verified" />
    ),
    cell: ({ row }) =>
      row.original.isVerified ? (
        <CircleCheckBig color="#34B233" />
      ) : (
        <CircleX color="red" />
      ),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => <Switch checked={row.original.isActive} />,
  },
];
