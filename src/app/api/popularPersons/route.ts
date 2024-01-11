import { Locales, fallbackLng } from '@/i18n/settings';
import { fetchPopularPersons } from '@/services/fetchPopularPersons/fetchPopularPersons';
import { ListsResponse, PopularPerson } from '@/services/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse<ListsResponse<PopularPerson> | null>> {
	const { searchParams } = request.nextUrl;
	const page = searchParams.get('page') ?? '1';
	const lang = searchParams.get('lang') ?? fallbackLng;
	const data = await fetchPopularPersons(
		Number(page),
		{ lang: lang as Locales }
	);

	return NextResponse.json(data);
}