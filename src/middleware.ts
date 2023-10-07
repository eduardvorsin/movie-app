import { NextRequest, NextResponse } from 'next/server';
import { getLocalesFromString } from './helpers/helpers';
import { fallbackLng, languages } from './i18n/settings';

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const localeRegexp = /(?!\/)[a-z]{2}(?!\/)?/;
	const currentLocale = pathname.match(localeRegexp)?.[0] ?? fallbackLng;

	const pathnameHasSupportedLang = languages.some((lang) => lang === currentLocale);

	if (pathnameHasSupportedLang) return;

	const locale = getLocalesFromString(request.headers.get('accept-language') ?? fallbackLng)[0];
	request.nextUrl.pathname = `/${locale}/${pathname}`;

	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: [
		'/((?!_next).*)',
	],
}
