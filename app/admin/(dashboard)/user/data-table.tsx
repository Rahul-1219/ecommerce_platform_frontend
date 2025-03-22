import { DataTable } from "@/components/custom/data-table";
import { columns, User } from "./columns";

const UserDataTable = ({ data }: { data: User[] }) => {
  return (
    <div className="container mx-auto">
      <div className="pb-2">
        <h1 className="text-2xl font-semibold">Users List</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default UserDataTable;
