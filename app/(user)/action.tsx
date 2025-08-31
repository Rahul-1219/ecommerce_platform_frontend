"use server";

import { getTokenFromCookies, setToken, getSessionId } from "@/utils/auth";
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
    const token = await getTokenFromCookies("user-token");
    let sessionId: string | null = "";
    if (!token) sessionId = await getSessionId();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/product-detail/${id}${
        sessionId ? `?sessionId=${sessionId}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
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

export const getFilterProducts = async (filterOpts: unknown, page = 1) => {
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
    if (error instanceof Error) {
      console.error(error.message); // Safe access
    } else {
      console.error(String(error)); // Fallback for non-Error throws
    }
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
    const sessionId: string = await getSessionId();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...reqBody, sessionId }),
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
    const sessionId: string = await getSessionId();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...reqBody, sessionId }),
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
      return null;
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

export const addToCart = async (request) => {
  try {
    const token = await getTokenFromCookies("user-token");
    let sessionId: string | null = "";
    if (!token) sessionId = await getSessionId();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify({ ...request, sessionId }),
      }
    );
    const resData = await response.json();
    revalidateTag("cart-list");
    revalidateTag("cart-count");
    return resData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCart = async () => {
  try {
    const token = await getTokenFromCookies("user-token");
    let sessionId: string | null = "";
    if (!token) sessionId = await getSessionId();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/cart${
        sessionId ? `?sessionId=${sessionId}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        next: { tags: ["cart-list"] },
      }
    );
    const resData = await response.json();
    return resData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateCartItem = async (request, itemId) => {
  try {
    const token = await getTokenFromCookies("user-token");
    let sessionId: string | null = "";
    if (!token) sessionId = await getSessionId();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/cart/${itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify({ ...request, sessionId }),
      }
    );
    const resData = await response.json();
    revalidateTag("cart-list");
    revalidateTag("cart-count");
    return resData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const removeCartItem = async (itemId) => {
  try {
    const token = await getTokenFromCookies("user-token");
    let sessionId: string | null = "";
    if (!token) sessionId = await getSessionId();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/cart/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify({ sessionId }),
      }
    );
    const resData = await response.json();
    revalidateTag("cart-list");
    revalidateTag("cart-count");
    return resData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCartItemsCount = async () => {
  try {
    const token = await getTokenFromCookies("user-token");
    let sessionId: string | null = "";
    if (!token) sessionId = await getSessionId();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/cart/items/count${
        sessionId ? `?sessionId=${sessionId}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        next: { tags: ["cart-count"] },
      }
    );
    const resData = await response.json();
    return resData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createCheckoutSession = async (requestBody) => {
  try {
    const token = await getTokenFromCookies("user-token");
    if (token) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: token } : {}),
          },
          body: JSON.stringify(requestBody),
        }
      );
      const resData = await response.json();
      return resData;
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verifyStripePayment = async (requestBody) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/verify-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    const resData = await response.json();
    return resData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
