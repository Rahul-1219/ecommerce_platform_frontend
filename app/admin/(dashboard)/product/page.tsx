export const dynamic = "force-dynamic";
import { getProducts } from "../../action";
import ProductDataTable from "./data-table";

const Product = async () => {
  const response = await getProducts();

  return (
    <div>
      <ProductDataTable data={response.data} />
    </div>
  );
};

export default Product;
