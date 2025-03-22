import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have the Skeleton component from ShadCN UI

export default function ProductFormSkeleton() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto py-10">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="col-span-6 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="col-span-6 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-40 w-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-32 w-full" />
      </div>

      <Skeleton className="h-12 w-full mx-auto" />
    </div>
  );
}
