"use server";

export const getCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/category-list`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { tags: ["category-list"] },
      }
    );

    const resData = await response.json();
    return resData; // Return categories data
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const productList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/product-list`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { tags: ["product-list"] },
      }
    );

    const resData = await response.json();
    return resData; // Return products data
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const bannersList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/banners`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { tags: ["banners"] },
      }
    );

    const resData = await response.json();
    return resData; // Return products data
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const productDetail = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/product-detail/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { tags: ["product-detail"] },
      }
    );

    const resData = await response.json();
    return resData; // Return product data
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getFilterOptions = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/filter-options`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { tags: ["filter-options"] },
      }
    );

    const resData = await response.json();
    return resData; // Return product data
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getFilterProducts = async (filterOpts: any, page = 1) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/filter-products?page=${page}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filterOpts),
      }
    );

    const resData = await response.json();
    return resData; // Return product data
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getProductsSearchList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/products-search-list`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { tags: ["product-list"] },
      }
    );

    const resData = await response.json();
    return resData; // Return categories data
  } catch (error: any) {
    throw new Error(error.message);
  }
};
