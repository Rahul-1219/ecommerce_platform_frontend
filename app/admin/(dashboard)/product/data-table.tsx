import { DataTable } from "@/components/custom/data-table";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { columns, Product } from "./columns";

const ProductDataTable = ({ data }: { data: Product[] }) => {
  return (
    <div className="container mx-auto">
      <div className="pb-2">
        <h1 className="text-2xl font-semibold">Products List</h1>
      </div>
      <DataTable columns={columns} data={data}>
        <Link href="product/add">
          <Button variant="outline" size="sm" className="h-8 px-3">
            <CirclePlus />
            Add
          </Button>
        </Link>
      </DataTable>
    </div>
  );
};

export default ProductDataTable;
