"use server";
import { IDeleteProductImage } from "@/components/custom/image-scrollarea";
import { LoginSchema } from "@/schemas/auth";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getTokenFromCookies = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token ? token : null;
};

export const loginUser = async (request: LoginSchema) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "api/login", {
    method: "POST", // HTTP method
    headers: {
      "Content-Type": "application/json", // Content type is JSON
    },
    body: JSON.stringify(request), // Send the login data as a JSON string
  });
  const resData = await response.json();
  if (resData.status) {
    const cookieStore = await cookies();
    // Set the expiration time to 1 day from now
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 1); // Adds 1 day to the current time

    // Set the cookie with 1-day expiration
    cookieStore.set("token", resData.data.token, {
      expires: expiresIn,
      path: "/",
    });

    // Store userData securely
    cookieStore.set("userData", JSON.stringify(resData.data), {
      httpOnly: false, // Can be accessed on the client
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: expiresIn,
    });
  }
  return resData;
};

export const getCategories = async () => {
  const token = await getTokenFromCookies();

  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/category`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        next: { tags: ["category-list"] },
      }
    );

    const resData = await response.json();
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const addCategory = async (request: FormData) => {
  const token = await getTokenFromCookies();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/category`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: request,
      }
    );

    const resData = await response.json();
    revalidateTag("category-list");
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const updateCategory = async (request: FormData, id: string) => {
  const token = await getTokenFromCookies();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/category/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: request,
      }
    );

    const resData = await response.json();
    revalidateTag("category-list");
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const activeInactiveCategory = async (
  request: { isActive: boolean },
  id: string
) => {
  const token = await getTokenFromCookies();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/category/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(request),
      }
    );

    const resData = await response.json();
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const deleteCategory = async (id: string) => {
  const token = await getTokenFromCookies();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/category/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    const resData = await response.json();
    revalidateTag("category-list");
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const getCategoryDetail = async (id: string) => {
  const token = await getTokenFromCookies();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/category/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

    const resData = await response.json();
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const getUsers = async () => {
  const token = await getTokenFromCookies();

  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        next: { tags: ["user-list"] },
      }
    );

    const resData = await response.json();
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const getProducts = async () => {
  const token = await getTokenFromCookies();

  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/product`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        next: { tags: ["product-list"] },
      }
    );

    const resData = await response.json();
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const getCategoryDropDownList = async () => {
  const token = await getTokenFromCookies();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/category-dropdown-list`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

    const resData = await response.json();
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const addProduct = async (request: FormData) => {
  const token = await getTokenFromCookies();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/product`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: request,
      }
    );

    const resData = await response.json();
    revalidateTag("product-list");
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const productDetail = async (id: string) => {
  const token = await getTokenFromCookies();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/product/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

    const resData = await response.json();
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const updateProduct = async (request: FormData, id: string) => {
  const token = await getTokenFromCookies();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/product/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: request,
      }
    );

    const resData = await response.json();
    revalidateTag("product-list");
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const deleteProductImage = async (request: IDeleteProductImage) => {
  const token = await getTokenFromCookies();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/delete-product-image`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    const resData = await response.json();
    revalidateTag("product-list");
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const deleteProduct = async (id: string) => {
  const token = await getTokenFromCookies();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/product/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    const resData = await response.json();
    revalidateTag("product-list");
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

export const getDashboardStats = async () => {
  const token = await getTokenFromCookies();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/dashboard`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

    const resData = await response.json();
    return resData; // Return categories data
  }

  // If no token exists, redirect to login
  redirect("/admin/login");
};

// Clear token from local storage and Logout user
export const logOut = async () => {
  const cookieStore = await cookies();
  cookieStore.set("token", "");
};
