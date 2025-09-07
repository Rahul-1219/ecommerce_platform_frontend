export const dynamic = "force-dynamic";
import { getOrdersList } from "../../action";
import OrderDataTable from "./data-table";

export default async function Order() {
  const response = await getOrdersList();
  return <OrderDataTable data={response?.data} />;
}
