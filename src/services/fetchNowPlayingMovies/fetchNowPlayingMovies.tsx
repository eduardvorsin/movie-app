import { Locales, fallbackLng } from '@/i18n/settings';
import { ListsResponse, MovieResponse } from '@/services/types';
import { fetchMoviesByFilters } from '../fetchMoviesByFilters/fetchMoviesByFilters';

export const fetchNowPlayingMovies = async (lang?: Locales): Promise<ListsResponse<MovieResponse> | null> => {
	const currentLang = lang ?? fallbackLng;

	const startingDate = new Date(new Date().getTime() - 31 * 24 * 3600 * 1000).toISOString().slice(0, 10);
	const endDate = new Date().toISOString().slice(0, 10);

	const nowPlayingMovies = await fetchMoviesByFilters(1, {
		language: currentLang,
		sort_by: 'popularity.desc',
		'release_date.gte': startingDate,
		'release_date.lte': endDate,
		'primary_release_date.gte': startingDate,
		'primary_release_date.lte': endDate,
		with_release_type: '2|3',
	});

	return nowPlayingMovies;
}