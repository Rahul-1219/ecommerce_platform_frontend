import Profile from "@/components/custom/profile";
import { getUserOrders } from "../action";

const page = async () => {
  const { data: orders } = await getUserOrders();
  return <Profile orders={orders} />;
};

export default page;
