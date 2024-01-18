import { Locales, fallbackLng } from '@/i18n/settings';
import { MovieSubgenres, fetchMoviesByGenre } from '@/services/fetchMoviesByGenre/fetchMoviesByGenre';
import { ListsResponse, MovieResponse } from '@/services/types';
import { MovieGenres } from '@/types/shared';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
	params: {
		genreName: string
	}
};

export async function GET(request: NextRequest, { params: { genreName } }: Context): Promise<NextResponse<ListsResponse<MovieResponse> | null>> {
	const { searchParams } = request.nextUrl;
	const page = searchParams.get('page') ?? '1';
	const lang = searchParams.get('lang') ?? fallbackLng;
	const data = await fetchMoviesByGenre(
		genreName as (MovieGenres | MovieSubgenres),
		Number(page),
		{ lang: lang as Locales }
	);

	return NextResponse.json(data);
}