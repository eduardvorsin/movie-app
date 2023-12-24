import { Locales, fallbackLng } from "@/i18n/settings";
import { APIListsResponse, APIMovieResponse } from "@/types/shared";

export const fetchUpcomingMovies = async (page: number, options?: { lang: Locales }): Promise<APIListsResponse<APIMovieResponse> | null> => {
	const currentLang = options?.lang ?? fallbackLng;
	const region = currentLang === 'ru' ? 'RU' : 'US';

	const startingDate = new Date().toISOString().slice(0, 10);
	const endDate = new Date(new Date().getTime() + 31 * 24 * 3600 * 1000).toISOString().slice(0, 10);

	const url = new URL('discover/movie', 'https://api.themoviedb.org/3/');
	const queryParams = {
		language: currentLang,
		page: page.toString(),
		region: region,
		sort_by: 'primary_release_date.asc',
		'primary_release_date.gte': startingDate,
		'primary_release_date.lte': endDate,
		'release_date.gte': startingDate,
		'release_date.lte': endDate,
	};

	(Object.keys(queryParams) as Array<keyof typeof queryParams>)
		.forEach((query) => {
			url.searchParams.append(query, queryParams[query]);
		});

	let upcomingMovies;
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

		upcomingMovies = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return upcomingMovies as APIListsResponse<APIMovieResponse>;
};
