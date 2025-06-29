import { getCategories, getProductsSearchList } from "@/app/(user)/action";
import { HeaderClient } from "./header-client";
import { getTokenFromCookies } from "@/utils/auth";

const Header = async () => {
  const categoriesResponse = await getCategories();
  const productsSearchListResponse = await getProductsSearchList();
  const userToken = await getTokenFromCookies("user-token");
  const isAuthenticated = userToken ? true : false;
  return (
    <HeaderClient
      categories={categoriesResponse}
      products={productsSearchListResponse}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default Header;
