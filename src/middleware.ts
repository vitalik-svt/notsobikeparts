import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["ru", "en"];

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		PUBLIC_FILE.test(pathname)
	) {
		return;
	}

	const hasLocale = locales.some((locale) =>
		pathname.startsWith(`/${locale}`)
	);

	if (!hasLocale) {
		return NextResponse.redirect(new URL(`/ru${pathname}`, req.url));
	}
}

export const config = {
	matcher: ["/((?!_next|api|.*\\..*).*)"],
};