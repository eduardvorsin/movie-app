import { Locales, fallbackLng } from '@/i18n/settings';
import { fetchTVSeriesByFilters } from '@/services/fetchTVSeriesByFilters/fetchTVSeriesByFilters';
import { FilterOptions, ListsResponse, TVSeriesResponse } from '../types'
import { Collections } from '@/constants';
import { getKeywordIdByName } from '@/helpers/getKeywordIdByName/getKeywordIdByName';
import { getGenreIdByName } from '@/helpers/getGenreIdByName/getGenreIdByName';

export const fetchTVSeriesByCollection = async (id: Collections, page: number, options?: { lang: Locales }): Promise<ListsResponse<TVSeriesResponse> | null> => {
	const withoutGenres = id === 'investigation' ? getGenreIdByName('documentary') : '';
	const config: FilterOptions<'tv'> = {
		sort_by: 'vote_average.desc',
		language: options?.lang ?? fallbackLng,
		'vote_count.gte': 30,
		'vote_average.gte': 5,
		with_keywords: getKeywordIdByName(id),
		without_genres: withoutGenres,
	};

	return await fetchTVSeriesByFilters(page, config);
};