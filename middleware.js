import getLocale from "@/utils/helpers/getLocale";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;
    let locale = getLocale(req.url);
    if (token) {
      const headers = new Headers(req.headers);
      headers.set("userid", token.user.id);
      if (!locale) {
        locale = token.user.settings.language || "gb";
      }
      headers.set("locale", locale);
      return NextResponse.next({
        request: {
          headers: headers,
        },
      });
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/brands",
    "/profile",
    "/stores",
    "/products",
    "/orders",
    "/settings",
  ],
};
