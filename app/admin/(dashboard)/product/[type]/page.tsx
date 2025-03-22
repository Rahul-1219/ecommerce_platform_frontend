import { getCategoryDropDownList, productDetail } from "@/app/admin/action";
import ProductForm from "@/components/forms/product-form";

export default async function ProductUpdate({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const id: string = (await searchParams)!.id as string;
  const { data: categories } = await getCategoryDropDownList();
  const { data } = await productDetail(id);
  return (
    <div>
      <ProductForm
        initialValues={{
          name: data.name,
          category: data?.categoryId?._id,
          description: data.description,
          images: [],
          price: String(data.price),
          quantity: String(data.quantity),
        }}
        productVariants={data.productVariants}
        categories={categories}
        type="edit"
        id={id}
        productImages={data?.productImages?.map((image: any) => ({
          ...image,
          name: image?.image,
        }))}
      />
    </div>
  );
}
