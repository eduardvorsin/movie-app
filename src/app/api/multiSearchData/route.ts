import { Locales, fallbackLng } from '@/i18n/settings';
import { fetchMultiSearchData } from '@/services/fetchMultiSearchData/fetchMultiSearchData';
import { ListsResponse, MultiSearchData } from '@/services/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse<ListsResponse<MultiSearchData> | null>> {
	const { searchParams } = request.nextUrl;
	const query = searchParams.get('query') ?? '';
	const page = searchParams.get('page') ?? '1';
	const lang = searchParams.get('lang') ?? fallbackLng;
	const data = await fetchMultiSearchData(query, Number(page), {
		language: lang as Locales,
	});

	return NextResponse.json(data);

};