import { Locales, fallbackLng } from "@/i18n/settings";
import { ListsResponse, MovieResponse } from "@/types/shared";

type TrendingMovie = MovieResponse & { media_type: string };

export const fetchTrendingMovies = async (lang?: Locales): Promise<ListsResponse<TrendingMovie> | null> => {
	const currentLang = lang ?? fallbackLng;

	let trendingMovies;
	try {
		const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=${currentLang}`, {
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

	return trendingMovies as ListsResponse<TrendingMovie>;
}