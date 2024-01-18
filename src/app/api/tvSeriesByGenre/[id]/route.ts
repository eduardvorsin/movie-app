import { Locales, fallbackLng } from '@/i18n/settings';
import { TVSeriesSubgenres, fetchTVSeriesByGenre } from '@/services/fetchTVSeriesByGenre/fetchTVSeriesByGenre';
import { ListsResponse, TVSeriesResponse } from '@/services/types';
import { TVSeriesGenres } from '@/types/shared';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
	params: {
		genreName: string
	}
};

export async function GET(request: NextRequest, { params: { genreName } }: Context): Promise<NextResponse<ListsResponse<TVSeriesResponse> | null>> {
	const { searchParams } = request.nextUrl;
	const page = searchParams.get('page') ?? '1';
	const lang = searchParams.get('lang') ?? fallbackLng;
	const data = await fetchTVSeriesByGenre(
		genreName as (TVSeriesGenres | TVSeriesSubgenres),
		Number(page),
		{ lang: lang as Locales }
	);

	return NextResponse.json(data);
}