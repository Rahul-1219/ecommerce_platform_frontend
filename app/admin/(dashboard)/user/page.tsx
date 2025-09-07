export const dynamic = "force-dynamic";
import { getUsers } from "../../action";
import UserDataTable from "./data-table";

const User = async () => {
  const response = await getUsers();

  return (
    <div>
      <UserDataTable data={response.data} />
    </div>
  );
};

export default User;
