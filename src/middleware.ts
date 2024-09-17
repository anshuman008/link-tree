import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ['/create'];

export async function middleware(req:any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Check if the current route is protected
  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      console.log('Token is not present. Redirecting...');
      const redirectUrl = new URL('/', req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }

    console.log('Token is present:', token);
  }

  return NextResponse.next();
}

// Protect only the '/create' route
export const config = {
  matcher: ['/create'],
};
