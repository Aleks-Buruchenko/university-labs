import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Proxy обеспечивает ранний редирект, а серверные страницы и API
// дополнительно проверяют сессию самостоятельно.
export default auth((request) => {
  const path = request.nextUrl.pathname;
  const isAuthenticated = Boolean(request.auth?.user);
  const isProtectedProductRoute =
    /^\/products\/\d+$/.test(path) ||
    path === "/products/new" ||
    /^\/products\/\d+\/edit$/.test(path);

  if (!isAuthenticated && isProtectedProductRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/products/:path*"],
};
