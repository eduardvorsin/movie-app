import { Locales, fallbackLng } from '@/i18n/settings';
import { fetchMoviesByCollection } from '@/services/fetchMovieByCollection/fetchMovieByCollection';
import { ListsResponse, MovieResponse } from '@/services/types';
import { NextRequest, NextResponse } from 'next/server';
import { Collections } from 'src/constants';

type Context = {
	params: {
		id: string
	}
};

export async function GET(request: NextRequest, { params: { id } }: Context): Promise<NextResponse<ListsResponse<MovieResponse> | null>> {
	const { searchParams } = request.nextUrl;
	const page = searchParams.get('page') ?? '1';
	const lang = searchParams.get('lang') ?? fallbackLng;
	const data = await fetchMoviesByCollection(
		id as Collections,
		Number(page),
		{ lang: lang as Locales }
	);

	return NextResponse.json(data);
}