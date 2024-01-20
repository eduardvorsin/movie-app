import { Locales, fallbackLng } from '@/i18n/settings';
import { fetchMoviesByFilters } from '../fetchMoviesByFilters/fetchMoviesByFilters';
import { FilterOptions, ListsResponse, MovieResponse, SortOptions } from '../types'
import { MovieGenres } from '@/types/shared';
import { getGenreIdByName } from '@/helpers/getGenreIdByName/getGenreIdByName';
import { getKeywordIdByName } from '@/helpers/getKeywordIdByName/getKeywordIdByName';

export type MovieSubgenres = 'anime';

export const fetchMoviesByGenre = async (
	genre: MovieGenres | MovieSubgenres | 'any',
	page: number,
	options?: {
		lang: Locales,
		country?: string,
		year?: string,
		sortBy?: SortOptions,
	}): Promise<ListsResponse<MovieResponse> | null> => {
	let genreId = '';
	if (genre === 'anime') {
		genreId = '16';
	} else if (genre !== 'any') {
		genreId = getGenreIdByName(genre);
	}

	const config: FilterOptions<'movie'> = {
		sort_by: options?.sortBy ?? 'vote_average.desc',
		language: options?.lang ?? fallbackLng,
		with_genres: genreId,
		'vote_count.gte': 200,
		'vote_average.gte': 7,
	};
	if (genre === 'anime') {
		config.with_keywords = getKeywordIdByName('anime');
	} else if (genre === 'horror') {
		config.without_genres = getGenreIdByName('music');
	} else {
		config.without_keywords = getKeywordIdByName('anime');
	};

	const movies = await fetchMoviesByFilters(page, config);
	return movies;
};