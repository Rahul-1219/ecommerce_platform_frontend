"use server";

import { getTokenFromCookies, setToken } from "@/utils/auth";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export const signup = async (reqBody) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      }
    );

    const resData = await response.json();
    return resData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const sendVerificationCode = async (reqBody) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/send-verification-code`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      }
    );

    const resData = await response.json();
    return resData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verifyCode = async (reqBody, isPasswordForgot = false) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/verify-code`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      }
    );

    const resData = await response.json();
    if (resData.status === 1) {
      if (!isPasswordForgot) {
        // Set token to cookies
        await setToken(resData?.data?.token, resData?.data?.expiresIn);
      }
    }
    return resData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const login = async (reqBody) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      }
    );
    const resData = await response.json();
    if (resData.status === 1) {
      // Set token to cookies
      await setToken(resData?.data?.token, resData?.data?.expiresIn);
    }
    return resData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const forgotPassword = async (reqBody, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(reqBody),
      }
    );
    const resData = await response.json();
    return resData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Clear token from local storage and Logout user
export const logOut = async () => {
  const cookieStore = await cookies();
  cookieStore.set("user-token", "");
};

export const getUserProfile = async () => {
  try {
    const token = await getTokenFromCookies("user-token");
    if (token) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/user-profile`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: token },
          next: { tags: ["user-profile"] },
        }
      );

      const resData = await response.json();
      return resData;
    } else {
      // If no token exists, redirect to login
      redirect("/login");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateProfile = async (request) => {
  try {
    const token = await getTokenFromCookies("user-token");
    if (token) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/update-profile`,
        {
          method: "POST",
          headers: { Authorization: token },
          body: request,
        }
      );

      const resData = await response.json();
      revalidateTag("user-profile");
      return resData;
    } else {
      // If no token exists, redirect to login
      redirect("/login");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const changePassword = async (request) => {
  try {
    const token = await getTokenFromCookies("user-token");
    if (token) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/change-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify(request),
        }
      );

      const resData = await response.json();
      return resData;
    } else {
      // If no token exists, redirect to login
      redirect("/login");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
