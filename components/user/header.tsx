import {
  getCartItemsCount,
  getCategories,
  getProductsSearchList,
} from "@/app/(user)/action";
import { HeaderClient } from "./header-client";
import { getTokenFromCookies } from "@/utils/auth";

const Header = async () => {
  const categoriesResponse = await getCategories();
  const productsSearchListResponse = await getProductsSearchList();
  const userToken = await getTokenFromCookies("user-token");
  const isAuthenticated = userToken ? true : false;
  const { data: countRes } = await getCartItemsCount();
  return (
    <HeaderClient
      categories={categoriesResponse}
      products={productsSearchListResponse}
      isAuthenticated={isAuthenticated}
      itemCount={countRes?.count}
    />
  );
};

export default Header;
