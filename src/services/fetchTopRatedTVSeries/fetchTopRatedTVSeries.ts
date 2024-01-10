import { Locales, fallbackLng } from '@/i18n/settings';
import { ListsResponse, TVSeriesResponse } from '../types'
import { fetchTVSeriesByFilters } from '../fetchTVSeriesByFilters/fetchTVSeriesByFilters';

export const fetchTopRatedTVSeries = async (page: number, options?: { lang: Locales }): Promise<ListsResponse<TVSeriesResponse> | null> => {

	return await fetchTVSeriesByFilters(page, {
		sort_by: 'vote_average.desc',
		language: options?.lang ?? fallbackLng,
		without_genres: '99,10755',
		'vote_count.gte': 200,
		'vote_average.gte': 8,
	});
};