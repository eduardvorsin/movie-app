import { Countries } from '@/helpers/getCountryCodeFromName/getCountryCodeFromName';
import { Locales, fallbackLng } from '@/i18n/settings';
import { MovieSubgenres, fetchMoviesByGenre } from '@/services/fetchMoviesByGenre/fetchMoviesByGenre';
import { ListsResponse, MovieResponse, SortOptions } from '@/services/types';
import { MovieGenres } from '@/types/shared';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
	params: {
		id: string
	}
};

export async function GET(request: NextRequest, { params: { id } }: Context): Promise<NextResponse<ListsResponse<MovieResponse> | null>> {
	const { searchParams } = request.nextUrl;
	const page = searchParams.get('page') ?? '1';
	const lang = searchParams.get('lang') ?? fallbackLng;
	const sortBy = searchParams.get('sortBy') ?? 'vote_average.desc';
	const timePeriod = searchParams.get('timePeriod') ?? '';
	const country = searchParams.get('country') ?? '';

	const data = await fetchMoviesByGenre(
		id as (MovieGenres | MovieSubgenres),
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