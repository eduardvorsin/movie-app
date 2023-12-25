import { Locales, fallbackLng } from '@/i18n/settings';
import { ListsResponse, MovieResponse } from '@/services/types';

export const fetchNowPlayingMovies = async (lang?: Locales): Promise<ListsResponse<MovieResponse> | null> => {
	const currentLang = lang ?? fallbackLng;

	let nowPlayingMovies;
	try {
		const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=${currentLang}`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_SECRET}`,
			}
		});

		if (!res.ok) {
			throw new Error(`${res.status} ${res.statusText}`);
		}

		nowPlayingMovies = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return nowPlayingMovies as ListsResponse<MovieResponse>;
}