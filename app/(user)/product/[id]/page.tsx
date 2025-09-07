export const dynamic = "force-dynamic";

import ProductDetail from "@/components/user/product-detail";
import { productDetail } from "../../action";

const Product = async ({ params }: any) => {
  const pathParams = await params;
  const product = await productDetail(pathParams.id);
  return <ProductDetail product={product?.data} />;
};

export default Product;
