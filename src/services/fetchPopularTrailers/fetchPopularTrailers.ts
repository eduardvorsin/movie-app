import { Locales, fallbackLng } from '@/i18n/settings';
import { fetchMoviesByFilters } from '../fetchMoviesByFilters/fetchMoviesByFilters';
import { fetchTrailersForMovie } from '../fetchTrailersForMovie/fetchTrailersForMovie';
import { TrailerResponse, TrailersResponseList } from '../types';

export const fetchPopularTrailers = async (page: number, options?: { lang: Locales }): Promise<TrailerResponse[]> => {
	const currentLang = options?.lang ?? fallbackLng;

	const startingDate = new Date().toISOString().slice(0, 10);
	const endDate = new Date(new Date().getTime() + 365 * 31 * 24 * 3600 * 1000).toISOString().slice(0, 10);

	const popularMovies = await fetchMoviesByFilters(page, {
		language: currentLang,
		sort_by: 'popularity.desc',
		'primary_release_date.gte': startingDate,
		'primary_release_date.lte': endDate,
		'release_date.gte': startingDate,
		'release_date.lte': endDate,
	});

	if (!popularMovies) return [];

	const requests = [...popularMovies.results].map(({ id }) => {
		return fetchTrailersForMovie(id);
	});
	const responses = await Promise.all(requests);
	const popularTrailers = responses
		.filter((response): response is TrailersResponseList => (response !== null))
		.map((trailers) => {
			return trailers.results.find(({ site, type }) => site === 'YouTube' && (type === 'Teaser' || type === 'Trailer'));
		})
		.filter((trailer): trailer is TrailerResponse => trailer !== undefined);

	return popularTrailers;
}
