import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });
  if (req.nextUrl.pathname.startsWith("/user")) {
    if (!token) return NextResponse.redirect(new URL("/auth/signIn", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/author")) {
    if (!token) return NextResponse.redirect(new URL("/auth/signIn", req.url));
    if (token && token.user.userrole !== "author")
      return NextResponse.rewrite(new URL("/401", req.url));
  }
}
