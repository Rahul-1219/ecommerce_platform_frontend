import { DataTable } from "@/components/custom/data-table";
import { columns, Order } from "./columns";

const OrderDataTable = ({ data }: { data: Order[] }) => {
  return (
    <div className="container mx-auto">
      <div className="pb-2">
        <h1 className="text-2xl font-semibold">Orders</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default OrderDataTable;
