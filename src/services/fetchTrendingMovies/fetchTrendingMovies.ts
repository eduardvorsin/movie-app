import { Locales, fallbackLng } from "@/i18n/settings";
import { ListsResponse, MovieResponse } from "@/services/types";

export const fetchTrendingMovies = async (lang?: Locales): Promise<ListsResponse<MovieResponse> | null> => {
	const currentLang = lang ?? fallbackLng;
	const url = new URL(
		`/${process.env.API_VERSION}/trending/movie/week`,
		process.env.API_BASE_URL
	);
	url.searchParams.set('language', currentLang);

	let trendingMovies;
	try {
		const res = await fetch(url.href, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_SECRET}`,
			}
		});

		if (!res.ok) {
			throw new Error(`${res.status} ${res.statusText}`);
		}

		trendingMovies = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return trendingMovies as ListsResponse<MovieResponse>;
}

