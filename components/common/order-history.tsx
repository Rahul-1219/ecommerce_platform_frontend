"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { OrderStatus } from "../user/order-status";

interface ProductImage {
  _id: string;
  image: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  images: ProductImage[];
}

interface OrderItem {
  _id: string;
  productId: Product;
  quantity: number;
  price: number;
  subtotal: number;
}

interface StatusEntry {
  _id?: string;
  status: string;
  note?: string;
  updatedAt: string;
}

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  paymentStatus?: string;
  paymentMethod?: string;
  createdAt: string;
  statusHistory: StatusEntry[];
  orderItems: OrderItem[];
}

/** status -> label + dot color */
const statusMeta: Record<string, { label: string; dot: string }> = {
  placed: { label: "Order Placed", dot: "bg-gray-400" },
  pending: { label: "Pending", dot: "bg-yellow-500" },
  processing: { label: "Processing", dot: "bg-yellow-500" },
  shipped: { label: "Shipped", dot: "bg-blue-500" },
  delivered: { label: "Delivered", dot: "bg-green-500" },
  cancelled: { label: "Cancelled", dot: "bg-red-500" },
};

function formatDateTime(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function OrderHistory({ orders }: { orders: Order[] }) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // ---- TOP-LEVEL memoization (only once) ----
  // timelinesMap[orderId] = StatusEntry[] (oldest -> newest)
  const timelinesMap = useMemo(() => {
    const map: Record<string, StatusEntry[]> = {};

    orders.forEach((order) => {
      const history = Array.isArray(order.statusHistory)
        ? [...order.statusHistory]
        : [];

      // Always inject "placed" as the first step
      const placed: StatusEntry = {
        _id: `placed-${order._id}`,
        status: "placed",
        note: "Order placed.",
        updatedAt: order.createdAt,
      };

      // Prepend placed (don’t duplicate if backend adds it later)
      const merged = [placed, ...history.filter((s) => s.status !== "placed")];

      // Sort oldest -> newest
      merged.sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      );

      map[order._id] = merged;
    });

    return map;
  }, [orders]);

  // item counts map
  const itemsCountMap = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach((o) => {
      map[o._id] =
        o.orderItems?.reduce((s, it) => s + (it.quantity ?? 0), 0) ?? 0;
    });
    return map;
  }, [orders]);

  // toggle expand
  const toggleExpand = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>Your recent orders and their status</CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="space-y-6">
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order._id;
              const timeline = timelinesMap[order._id] ?? [];
              const itemsCount = itemsCountMap[order._id] ?? 0;

              return (
                <div
                  key={order._id}
                  className="border rounded-lg p-4 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">
                        Order #{order._id.slice(-6)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <OrderStatus status={order.status} />
                  </div>

                  <Separator className="my-3" />

                  {/* Summary */}
                  <div className="flex justify-between text-sm">
                    <span>
                      {itemsCount} {itemsCount === 1 ? "item" : "items"}
                    </span>
                    <span className="font-medium">
                      ₹{Number(order.totalAmount).toFixed(2)}
                    </span>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="mt-4 border-t pt-4 space-y-6">
                      {/* Order Items */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          Order Items
                        </h4>
                        <div className="space-y-3">
                          {order.orderItems.map((item) => (
                            <div
                              key={item._id}
                              className="flex items-center justify-between text-sm border-b pb-3 last:border-0"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={
                                    item.productId.images?.[0]?.image ||
                                    "/placeholder.png"
                                  }
                                  alt={item.productId.name}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium">
                                    {item.productId.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Qty: {item.quantity} × ₹{item.price}
                                  </p>
                                </div>
                              </div>
                              <span className="font-medium">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status timeline */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          Status History
                        </h4>

                        <div className="relative pl-6">
                          {/* vertical line */}
                          <div className="absolute left-[9px] top-0 bottom-0 border-l border-border" />

                          <ol className="space-y-5">
                            {timeline.map((entry, idx) => {
                              const meta = statusMeta[entry.status] ?? {
                                label: entry.status,
                                dot: "bg-gray-400",
                              };

                              return (
                                <li
                                  key={entry._id ?? `${order._id}-${idx}`}
                                  className="relative"
                                >
                                  <span
                                    className={`absolute left-[-3px] top-[2px] h-3 w-3 rounded-full ring-2 ring-background ${meta.dot}`}
                                  />
                                  <div className="pl-4">
                                    <p className="text-sm font-medium capitalize">
                                      {meta.label}
                                    </p>
                                    {entry.note ? (
                                      <p className="text-xs text-muted-foreground">
                                        {entry.note}
                                      </p>
                                    ) : null}
                                    <p className="text-[11px] text-muted-foreground">
                                      {formatDateTime(entry.updatedAt)}
                                    </p>
                                  </div>
                                </li>
                              );
                            })}
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom full-width toggle */}
                  <div className="mt-auto pt-4 flex justify-end items-center w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-4"
                      onClick={() => toggleExpand(order._id)}
                    >
                      {isExpanded ? "Hide Details" : "View Details"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
