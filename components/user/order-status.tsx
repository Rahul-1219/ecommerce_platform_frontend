import { Badge } from "@/components/ui/badge";

type OrderStatusProps = {
  //   status: "processing" | "shipped" | "delivered" | "cancelled";
  status: string;
};

export function OrderStatus({ status }: OrderStatusProps) {
  const statusMap = {
    pending: { label: "Processing", color: "bg-yellow-500" },
    processing: { label: "Processing", color: "bg-yellow-500" },
    shipped: { label: "Shipped", color: "bg-blue-500" },
    delivered: { label: "Delivered", color: "bg-green-500" },
    cancelled: { label: "Cancelled", color: "bg-red-500" },
  };

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-1 ${
        status === "delivered"
          ? "border-green-500 text-green-500"
          : status === "shipped"
          ? "border-blue-500 text-blue-500"
          : status === "processing"
          ? "border-yellow-500 text-yellow-500"
          : "border-red-500 text-red-500"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${statusMap[status].color}`} />
      {statusMap[status].label}
    </Badge>
  );
}
