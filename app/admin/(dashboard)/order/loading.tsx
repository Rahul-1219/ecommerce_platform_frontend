import { DataTableSkeleton } from "@/components/custom/datatable-skeleton";
import { columns } from "./columns";

const Loading = () => {
  return <DataTableSkeleton columns={columns} />;
};

export default Loading;
