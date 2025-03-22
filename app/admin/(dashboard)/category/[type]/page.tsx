import { getCategoryDetail } from "@/app/admin/action";
import CategoryDataTable from "../data-table";

const CategoryDetail = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const id: string = (await searchParams)!.id as string;
  const response = await getCategoryDetail(id);

  return (
    <div className="container mx-auto">
      <div className="pb-2">
        <h1 className="text-2xl font-semibold">{response?.data?.name}</h1>
      </div>
      <CategoryDataTable data={response?.data?.subCategories} categoryId={id} />
    </div>
  );
};

export default CategoryDetail;
