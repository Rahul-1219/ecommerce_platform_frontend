export const dynamic = "force-dynamic";
import { getCategories } from "../../action";
import CategoryDataTable from "./data-table";

export default async function Category() {
  const response = await getCategories();

  return (
    <div className="container mx-auto">
      <div className="pb-2">
        <h1 className="text-2xl font-semibold">Category List</h1>
      </div>
      <CategoryDataTable data={response?.data} />
    </div>
  );
}
