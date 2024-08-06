import { Locales, fallbackLng } from '@/i18n/settings';
import { fetchMoviesByFilters } from '../fetchMoviesByFilters/fetchMoviesByFilters';
import { FilterOptions, ListsResponse, MovieResponse } from '../types'
import { Collections } from '@/constants';
import { getKeywordIdByName } from '@/helpers/getKeywordIdByName/getKeywordIdByName';
import { getGenreIdByName } from '@/helpers/getGenreIdByName/getGenreIdByName';

export const fetchMoviesByCollection = async (id: Collections, page: number, options?: { lang: Locales }): Promise<ListsResponse<MovieResponse> | null> => {
	const withoutGenres = id === 'investigation' ? getGenreIdByName('documentary') : '';
	const config: FilterOptions<'movie'> = {
		sort_by: 'vote_average.desc',
		language: options?.lang ?? fallbackLng,
		'vote_count.gte': 30,
		'vote_average.gte': 5,
		with_keywords: getKeywordIdByName(id),
		without_genres: withoutGenres,
	};

	const movies = await fetchMoviesByFilters(page, config);
	return movies;
};