import { TVSeriesGenres } from './../../types/shared';
import { Locales, fallbackLng } from '@/i18n/settings';
import { FilterOptions, ListsResponse, TVSeriesResponse } from '../types'
import { fetchTVSeriesByFilters } from '../fetchTVSeriesByFilters/fetchTVSeriesByFilters';
import { getGenreIdByName } from '@/helpers/getGenreIdByName/getGenreIdByName';
import { getKeywordIdByName } from '@/helpers/getKeywordIdByName/getKeywordIdByName';

export type TVSeriesSubgenres = 'medical' | 'historical' | 'anime' | 'teen' | 'sports' | 'love';

const isSubgenre = (genre: TVSeriesGenres | TVSeriesSubgenres | 'any'): genre is TVSeriesSubgenres => {
	const subgenres: TVSeriesSubgenres[] = ['medical', 'historical', 'anime', 'teen', 'sports', 'sports', 'love'];
	return subgenres.includes(genre as TVSeriesSubgenres);
};

export const fetchTVSeriesByGenre = async (
	genre: TVSeriesGenres | TVSeriesSubgenres | 'any',
	page: number,
	options?: {
		lang: Locales,
		withCountry?: string,
	}): Promise<ListsResponse<TVSeriesResponse> | null> => {
	let genreId = '';
	if (genre === 'anime') {
		genreId = '16';
	} else if (genre !== 'any' && !isSubgenre(genre)) {
		genreId = getGenreIdByName(genre);
	}

	const config: FilterOptions<'tv'> = {
		sort_by: 'vote_average.desc',
		language: options?.lang ?? fallbackLng,
		with_genres: genreId,
		'vote_count.gte': 50,
		'vote_average.gte': 7,
		with_origin_country: options?.withCountry ?? '',
		with_keywords: isSubgenre(genre) ? getKeywordIdByName(genre) : '',
		without_keywords: (genre === 'sports' || genre === 'war & politics') ? getKeywordIdByName('anime') : '',
		without_genres: genre === 'war & politics' ? getGenreIdByName('documentary') : '',
	};

	return await fetchTVSeriesByFilters(page, config);
};