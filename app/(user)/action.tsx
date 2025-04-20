"use server";

export const getCategories = async () => {
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
};
