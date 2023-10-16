import { NextRequest, NextResponse } from 'next/server';
import { fallbackLng, locales } from './i18n/settings';

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	
	if(
		pathname.startsWith(`/${fallbackLng}`)||
		pathname === `/${fallbackLng}`
	){
		const url = new URL(
				pathname.replace(
					`/${fallbackLng}`,
					pathname===`/${fallbackLng}` ? '/' : '',
				),
				request.url
		);

		return NextResponse.redirect(url);
	}

	const pathnameIsMissingLocale = locales.every(locale =>{
		return !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`;
	});

	if(pathnameIsMissingLocale){
		return NextResponse.rewrite(
			new URL(`/${fallbackLng}${pathname}`,request.url),
		)
	}
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|manifest.json|assets|favicon.ico).*)',
}
