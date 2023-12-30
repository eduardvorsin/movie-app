import { Locales, fallbackLng } from '@/i18n/settings';
import { fetchMoviesByFilters } from '../fetchMoviesByFilters/fetchMoviesByFilters';
import { ListsResponse, MovieResponse } from '../types'

export const fetchTopRatedMovies = async (page: number, options?: { lang: Locales }): Promise<ListsResponse<MovieResponse> | null> => {
	const currentLang = options?.lang ?? fallbackLng;

	const topRatedMovies = await fetchMoviesByFilters(page, {
		sort_by: 'vote_average.desc',
		language: currentLang,
		without_genres: '99,10755',
		'vote_count.gte': 200,
		'vote_average.gte': 8,
	});

	return topRatedMovies;
};