import { Locales, fallbackLng } from '@/i18n/settings';
import { Options, fetchMoviesByFilters } from '../fetchMoviesByFilters/fetchMoviesByFilters';
import { ListsResponse, MovieResponse } from '../types'
import { MovieGenres } from '@/types/shared';
import { getGenreIdByName } from '@/helpers/getGenreIdByName/getGenreIdByName';
import { getKeywordIdByName } from '@/helpers/getKeywordIdByName/getKeywordIdByName';

export const fetchMoviesByGenre = async (genre: MovieGenres | 'anime', page: number, options?: { lang: Locales }): Promise<ListsResponse<MovieResponse> | null> => {
	const currentLang = options?.lang ?? fallbackLng;
	const genreId = genre === 'anime' ? '16' : getGenreIdByName(genre) ?? '';

	const config: Options = {
		sort_by: 'vote_average.desc',
		language: currentLang,
		with_genres: genreId,
		'vote_count.gte': 200,
		'vote_average.gte': 7,
	};
	if (genre === 'anime') {
		config.with_keywords = getKeywordIdByName('anime');
	} else if (genre === 'horror') {
		config.without_genres = getGenreIdByName('music') ?? '';
	} else {
		config.without_keywords = getKeywordIdByName('anime');
	};

	const movies = await fetchMoviesByFilters(page, config);
	return movies;
};