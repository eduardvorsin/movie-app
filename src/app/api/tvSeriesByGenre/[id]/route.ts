import { Countries } from '@/helpers/getCountryCodeFromName/getCountryCodeFromName';
import { Locales, fallbackLng } from '@/i18n/settings';
import { TVSeriesSubgenres, fetchTVSeriesByGenre } from '@/services/fetchTVSeriesByGenre/fetchTVSeriesByGenre';
import { ListsResponse, SortOptions, TVSeriesResponse } from '@/services/types';
import { TVSeriesGenres } from '@/types/shared';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
	params: {
		id: string
	}
};

export async function GET(request: NextRequest, { params: { id } }: Context): Promise<NextResponse<ListsResponse<TVSeriesResponse> | null>> {
	const { searchParams } = request.nextUrl;
	const page = searchParams.get('page') ?? '1';
	const lang = searchParams.get('lang') ?? fallbackLng;
	const sortBy = searchParams.get('sortBy') ?? 'vote_average.desc';
	const timePeriod = searchParams.get('timePeriod') ?? '';
	const country = searchParams.get('country') ?? '';

	const data = await fetchTVSeriesByGenre(
		id as (TVSeriesGenres | TVSeriesSubgenres),
		Number(page),
		{
			lang: lang as Locales,
			sortBy: sortBy as SortOptions,
			country: country as Countries,
			timePeriod: timePeriod,
		}
	);

	return NextResponse.json(data);
}