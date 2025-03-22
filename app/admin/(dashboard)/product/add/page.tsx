import { getCategoryDropDownList } from "@/app/admin/action";
import ProductForm from "@/components/forms/product-form";

export default async function ProductDetail() {
  const response = await getCategoryDropDownList();

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
    />
  );
}
