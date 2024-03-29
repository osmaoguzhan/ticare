import getLocale from "@/utils/helpers/getLocale";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import Constants from "@/utils/Constants";

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;
    let { locale } = getLocale(req.url);
    if (token) {
      const headers = new Headers(req.headers);
      headers.set("userid", token.user.id);
      if (!locale) {
        locale = token.user.settings.language || "gb";
      }
      headers.set("locale", locale);

      // Admins can't access user pages
      if (
        token?.user?.role === Constants.ROLES.ADMIN &&
        !req.nextUrl.pathname.includes("/admin")
      ) {
        req.nextUrl.pathname = `/admin/sales`;
        return NextResponse.redirect(req.nextUrl);
      }

      // If user didn't set company, redirect to settings
      if (
        token?.user?.role === Constants.ROLES.USER &&
        !token?.user?.company &&
        req.nextUrl.pathname !== "/settings" &&
        req.nextUrl.pathname !== "/profile"
      ) {
        req.nextUrl.pathname = `/settings`;
        return NextResponse.redirect(req.nextUrl);
      }

      // If user is not admin and tries to access admin pages, redirect to dashboard
      if (
        token?.user?.role === Constants.ROLES.USER &&
        req.nextUrl.pathname.includes("/admin")
      ) {
        req.nextUrl.pathname = `/dashboard`;
        return NextResponse.redirect(req.nextUrl);
      }

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
    "/admin/:path*",
    "/dashboard",
    "/profile",
    "/stores",
    "/products",
    "/sales",
    "/suppliers",
    "/customers",
    "/settings",
  ],
};
