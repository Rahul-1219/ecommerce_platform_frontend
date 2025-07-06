import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = (await cookies()).get("token")?.value;
  const userToken = (await cookies()).get("user-token")?.value;

  if (!token && path.startsWith("/admin") && path !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }
  if (token && path === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }
  if (
    userToken &&
    (path === "/login" || path === "/signup" || path === "/forgot-password")
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!userToken && path === "/profile") {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Apply middleware to all routes under /admin/
};
