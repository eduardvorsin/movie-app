
import { Locales, fallbackLng } from "@/i18n/settings";
import { ListsResponse, TVSeriesResponse } from "@/services/types";
import { fetchTVSeriesByFilters } from "../fetchTVSeriesByFilters/fetchTVSeriesByFilters";

export const fetchUpcomingTVSeries = async (page: number, options?: { lang: Locales }): Promise<ListsResponse<TVSeriesResponse> | null> => {

	const startingDate = new Date().toISOString().slice(0, 10);
	const endDate = new Date(new Date().getTime() + 31 * 24 * 3600 * 1000).toISOString().slice(0, 10);

	return await fetchTVSeriesByFilters(page, {
		language: options?.lang ?? fallbackLng,
		sort_by: 'popularity.desc',
		'first_air_date.gte': startingDate,
		'first_air_date.lte': endDate,
		'air_date.gte': startingDate,
		'air_date.lte': endDate,
	});;
};
