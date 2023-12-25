import { Locales, fallbackLng } from "@/i18n/settings";
import { ListsResponse, MovieResponse } from "@/services/types";
import { MovieDetails, fetchMovie } from "../fetchMovie/fetchMovie";

const fetchYearBoxOfficeMovies = async (page: number, options: { lang: Locales }): Promise<ListsResponse<MovieResponse> | null> => {
	const region = options.lang === 'ru' ? 'RU' : 'US';

	const startingDate = new Date(new Date().getTime() - 6 * 31 * 24 * 3600 * 1000).toISOString().slice(0, 10);
	const endDate = new Date().toISOString().slice(0, 10);

	const url = new URL('discover/movie', 'https://api.themoviedb.org/3/');
	const queryParams = {
		language: options.lang,
		page: page.toString(),
		region: region,
		sort_by: 'primary_release_date.asc',
		'primary_release_date.gte': startingDate,
		'primary_release_date.lte': endDate,
		'release_date.gte': startingDate,
		'release_date.lte': endDate,
		'vote_count.gte': '200',
	};

	(Object.keys(queryParams) as Array<keyof typeof queryParams>)
		.forEach((query) => {
			url.searchParams.append(query, queryParams[query]);
		});

	let moviesBoxOffice;
	try {
		const res = await fetch(url.href, {
			method: 'Get',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_SECRET}`,
			}
		});

		if (!res.ok) {
			throw new Error(`${res.status} ${res.statusText}`);
		}

		moviesBoxOffice = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return moviesBoxOffice as ListsResponse<MovieResponse>;
};

export const fetchMoviesBoxOffice = async (page: number, options?: { lang: Locales }): Promise<MovieDetails[]> => {
	const currentLang = options?.lang ?? fallbackLng;
	const movies = await fetchYearBoxOfficeMovies(page, { lang: currentLang });

	if (!movies) return [];

	const requests = movies.results.map(({ id }) => {
		return fetchMovie(id.toString(), { lang: currentLang });
	});
	const responses = await Promise.all(requests);
	const moviesBoxOffice = responses.
		filter((movie): movie is MovieDetails => {
			return movie !== null && movie?.revenue > 0;
		})
		.sort((prevMovie, movie) => movie.revenue - prevMovie.revenue);

	return moviesBoxOffice;
};
