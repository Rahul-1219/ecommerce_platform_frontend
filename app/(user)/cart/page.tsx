import Cart from "@/components/custom/cart";
import { getCart } from "../action";

const page = async () => {
  const response = await getCart();
  return <Cart cart={response?.data} />;
};

export default page;
