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
