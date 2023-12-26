import { Locales, fallbackLng } from "@/i18n/settings";
import { MovieDetails, fetchMovie } from "../fetchMovie/fetchMovie";
import { fetchMoviesByFilters } from "../fetchMoviesByFilters/fetchMoviesByFilters";

export const fetchMoviesBoxOffice = async (page: number, options?: { lang: Locales }): Promise<MovieDetails[]> => {
	const currentLang = options?.lang ?? fallbackLng;
	const startingDate = new Date(new Date().getTime() - 3 * 31 * 24 * 3600 * 1000).toISOString().slice(0, 10);
	const endDate = new Date().toISOString().slice(0, 10);

	const movies = await fetchMoviesByFilters(page, {
		language: currentLang,
		sort_by: 'revenue.desc',
		'primary_release_date.gte': startingDate,
		'primary_release_date.lte': endDate,
		'release_date.gte': startingDate,
		'release_date.lte': endDate,
		'vote_count.gte': 200,
	});

	if (!movies) return [];

	const requests = movies.results.map(({ id }) => {
		return fetchMovie(id.toString(), { lang: currentLang });
	});
	const responses = await Promise.all(requests);
	const moviesBoxOffice = responses.
		filter((movie): movie is MovieDetails => {
			return movie !== null && movie?.revenue > 0;
		});

	return moviesBoxOffice;
};
