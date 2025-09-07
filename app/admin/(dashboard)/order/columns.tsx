"use client";

import { DataTableColumnHeader } from "@/components/custom/data-table-header";
import { DrawerDialog } from "@/components/custom/drawer-dialog";
import { OrderStatusForm } from "@/components/forms/order-status-form";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { RefreshCcw } from "lucide-react";
import { useRef } from "react";

// This type is used to define the shape of our data.
export type Order = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    id: string;
  };
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  updatedAt: string;
};

const statusColors: Record<string, string> = {
  pending:
    "bg-amber-200 text-amber-900 hover:bg-amber-300 hover:text-amber-950",
  processing: "bg-sky-200 text-sky-900 hover:bg-sky-300 hover:text-sky-950",
  shipped:
    "bg-purple-200 text-purple-900 hover:bg-purple-300 hover:text-purple-950",
  delivered:
    "bg-green-200 text-green-900 hover:bg-green-300 hover:text-green-950",
  cancelled: "bg-red-200 text-red-900 hover:bg-red-300 hover:text-red-950",
  returned: "bg-pink-200 text-pink-900 hover:bg-pink-300 hover:text-pink-950",
};

// Separate component for Action cell to use hooks safely
const ActionCell = ({ order }: { order: Order }) => {
  const drawerRef = useRef<any>(null);

  const closeDrawer = () => {
    drawerRef.current?.close();
  };

  const terminalStatuses = ["pending", "delivered", "cancelled", "returned"];
  const isTerminal = terminalStatuses.includes(order.status);

  if (isTerminal) {
    return (
      <RefreshCcw size={22} strokeWidth={1.25} className="text-gray-400" />
    );
  }

  return (
    <DrawerDialog
      ref={drawerRef}
      title="Update Order Status"
      rowText="Update"
      button={
        <RefreshCcw
          size={22}
          strokeWidth={1.25}
          className="cursor-pointer text-blue-600"
        />
      }
    >
      <OrderStatusForm
        orderId={order._id}
        currentStatus={order.status}
        onClose={closeDrawer}
      />
    </DrawerDialog>
  );
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "userId.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    id: "Name",
  },
  {
    accessorKey: "userId.email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    meta: { title: "Email" },
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Method" />
    ),
    meta: { title: "Payment Method" },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    meta: { title: "Payment Status" },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    meta: { title: "Amount" },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Status" />
    ),
    cell: ({ row }: any) => {
      const status = row.getValue("status");
      const color = statusColors[status];

      return (
        <Badge variant="secondary" className={`${color} px-2 py-1 rounded-md`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
    meta: { title: "Order Status" },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Update" />
    ),
    cell: ({ row }) => {
      const date = row.original.updatedAt;
      return date ? format(new Date(date), "dd MMM yyyy, hh:mm a") : "-";
    },
    meta: { title: "Last Update" },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => <ActionCell order={row.original} />,
  },
];
