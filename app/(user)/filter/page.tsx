import ProductListing from "@/components/user/product-listing";
import { getFilterOptions, getFilterProducts } from "../action";

export default async function ProductsPage({ searchParams }) {
  const query = await searchParams;
  const defaultFilters: any = {
    tags: [],
    category: "",
    subcategories: [],
    price: "",
  };
  if (query.t) {
    defaultFilters.tags.push(query.t);
  }
  if (query.c) {
    defaultFilters.category = query.c;
  }
  if (query.s) {
    defaultFilters.subcategories.push(query.s);
  }
  const filterOptions = await getFilterOptions();
  const filterProducts = await getFilterProducts(defaultFilters, 1);

  return (
    <ProductListing
      filterOptions={filterOptions.data}
      initialProducts={filterProducts.data}
      initialPagination={filterProducts.pagination}
      defaultFilters={defaultFilters}
    />
  );
}
