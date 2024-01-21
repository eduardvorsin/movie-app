import { Locales, fallbackLng } from '@/i18n/settings';
import { fetchMoviesByFilters } from '../fetchMoviesByFilters/fetchMoviesByFilters';
import { FilterOptions, ListsResponse, MovieResponse, SortOptions } from '../types'
import { MovieGenres } from '@/types/shared';
import { getGenreIdByName } from '@/helpers/getGenreIdByName/getGenreIdByName';
import { getKeywordIdByName } from '@/helpers/getKeywordIdByName/getKeywordIdByName';
import { Countries, getCountryCodeFromName } from '@/helpers/getCountryCodeFromName/getCountryCodeFromName';

export type MovieSubgenres = 'anime';

export const fetchMoviesByGenre = async (
	genre: MovieGenres | MovieSubgenres | 'any',
	page: number,
	options?: {
		lang: Locales,
		country?: Countries,
		timePeriod?: string,
		sortBy?: SortOptions,
	}): Promise<ListsResponse<MovieResponse> | null> => {
	let genreId = '';
	if (genre === 'anime') {
		genreId = '16';
	} else if (genre !== 'any') {
		genreId = getGenreIdByName(genre);
	}

	let primaryReleaseDateGTE = '';
	let primaryReleaseDateLTE = '';
	if (options && options.timePeriod) {
		const timePeriods = options.timePeriod.split('-');
		primaryReleaseDateGTE = `${timePeriods.at(0)}-01-01`;
		primaryReleaseDateLTE = `${timePeriods.at(-1)}-12-31`
	}

	const config: FilterOptions<'movie'> = {
		sort_by: options?.sortBy ?? 'vote_average.desc',
		language: options?.lang ?? fallbackLng,
		with_genres: genreId,
		'vote_count.gte': 100,
		'vote_average.gte': 7,
		'primary_release_date.gte': primaryReleaseDateGTE,
		'primary_release_date.lte': primaryReleaseDateLTE,
		with_origin_country: getCountryCodeFromName(options?.country ?? ''),
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