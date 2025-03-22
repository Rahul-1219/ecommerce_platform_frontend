import { Skeleton } from "@/components/ui/skeleton"; // Assuming Skeleton component from ShadCN
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
export function DataTableSkeleton({ columns }: { columns: any[] }) {
  // Check if columns is an array and has elements, else fallback to a default column structure
  const columnCount = Array.isArray(columns) ? columns.length : 5; // Default 5 columns if undefined or not an array

  return (
    <div>
      {/* Skeleton for the search input */}
      <div className="flex items-center py-4 gap-4">
        <Skeleton className="h-10 w-32" />
        <div className="ml-auto flex gap-3">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      {/* Skeleton for the Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columnCount }).map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-6 w-32" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="transition-colors hover:bg-muted/50"
              >
                {Array.from({ length: columnCount }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-6 w-32" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
