import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n/settings";

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

	const hasLocale = i18n.locales.some((locale) =>
		pathname.startsWith(`/${locale}`)
	);

	if (!hasLocale) {
		return NextResponse.redirect(new URL(`/${i18n.defaultLocale}${pathname}`, req.url));
	}
}

export const config = {
	matcher: ["/((?!_next|api|.*\\..*).*)"],
};