import { Locales, fallbackLng } from "@/i18n/settings";
import { ListsResponse, MovieResponse } from "@/services/types";
import { fetchMoviesByFilters } from "../fetchMoviesByFilters/fetchMoviesByFilters";

export const fetchUpcomingMovies = async (page: number, options?: { lang: Locales }): Promise<ListsResponse<MovieResponse> | null> => {
	const currentLang = options?.lang ?? fallbackLng;
	const region = currentLang === 'ru' ? 'RU' : 'US';

	const startingDate = new Date().toISOString().slice(0, 10);
	const endDate = new Date(new Date().getTime() + 31 * 24 * 3600 * 1000).toISOString().slice(0, 10);

	const upcomingMovies = await fetchMoviesByFilters(page, {
		language: currentLang,
		region: region,
		sort_by: 'primary_release_date.asc',
		'primary_release_date.gte': startingDate,
		'primary_release_date.lte': endDate,
		'release_date.gte': startingDate,
		'release_date.lte': endDate,
	});

	return upcomingMovies;
};
