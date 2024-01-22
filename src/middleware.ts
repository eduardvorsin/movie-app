import { NextRequest, NextResponse } from 'next/server';
import { Locales, fallbackLng, locales } from '@/i18n/settings';

export function middleware(request: NextRequest) {
	const langFromCookie = request.cookies.get('i18next')?.value;
	const langFromHeaders = request.headers.get('accept-language')?.slice(0, 2);
	const currentLang = langFromCookie ?? langFromHeaders ?? fallbackLng;

	const { pathname } = request.nextUrl;

	const pathnameIsMissingLocale = locales.every(locale => {
		return !pathname.startsWith(`/${locale}`) && pathname !== `/${locale}`;
	});

	if (pathnameIsMissingLocale) {
		const currentLocale = locales.includes(currentLang as Locales) ? currentLang : fallbackLng;
		const newUrl = new URL(`/${currentLocale}${pathname}`, request.url);

		return NextResponse.redirect(newUrl);
	}
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|manifest.json|assets|favicon.ico).*)',
}
