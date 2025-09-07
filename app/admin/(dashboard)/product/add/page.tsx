export const dynamic = "force-dynamic";
import { getCategoryDropDownList, getTagList } from "@/app/admin/action";
import ProductForm from "@/components/forms/product-form";

export default async function ProductDetail() {
  const response = await getCategoryDropDownList();
  const { data: tags } = await getTagList();

  return (
    <ProductForm
      initialValues={{
        name: "",
        category: "",
        description: "",
        images: [],
        price: "",
        quantity: "",
      }}
      categories={response.data}
      tags={tags}
    />
  );
}
