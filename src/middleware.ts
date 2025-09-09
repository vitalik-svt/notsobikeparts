import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		PUBLIC_FILE.test(pathname)
	) {
		return;
	}

	if (pathname === "/") {
		return NextResponse.redirect(new URL("/ru", req.url));
	}
}

export const config = {
	matcher: ["/((?!_next|api|.*\\..*).*)"],
};
