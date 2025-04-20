import { cookies } from "next/headers";

export const getTokenFromCookies = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token ? token : null;
};
