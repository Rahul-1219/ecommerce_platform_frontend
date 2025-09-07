"use client";

import { updateOrderStatus } from "@/app/admin/action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

const orderStatusSchema = z.object({
  status: z.string().min(1, "Status is required"),
  note: z.string().optional(),
});

type OrderStatusFormValues = z.infer<typeof orderStatusSchema>;

interface OrderStatusFormProps {
  onClose: () => void;
  orderId: string;
  currentStatus: string;
}

// Allowed transitions map
const statusTransitions: Record<string, string[]> = {
  pending: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered", "returned"],
  delivered: [],
  cancelled: [],
  returned: [],
};

export function OrderStatusForm({
  onClose,
  orderId,
  currentStatus,
}: OrderStatusFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const form = useForm<OrderStatusFormValues>({
    resolver: zodResolver(orderStatusSchema),
    defaultValues: {
      status: "",
      note: "",
    },
  });

  const onSubmit = async (data: OrderStatusFormValues) => {
    setIsUpdating(true);
    try {
      await updateOrderStatus(orderId, data);
      onClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
        duration: 2000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const availableNextStatuses = statusTransitions[currentStatus] || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Status Select */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={availableNextStatuses.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {availableNextStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Optional Note */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Write a note..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <Button
          className="w-full"
          type="submit"
          disabled={availableNextStatuses.length === 0 || isUpdating}
        >
          {isUpdating ? <Loader2 /> : "Update"}
        </Button>
      </form>
    </Form>
  );
}
