import { Locales, fallbackLng } from '@/i18n/settings';
import { TrailersResponseList } from '../types';

const fetchTrailersByLocale = async (id: number, locale: Locales): Promise<TrailersResponseList | null> => {
	let trailers;

	try {
		const res = await fetch(`
		https://api.themoviedb.org/3/movie/${id}/videos?language=${locale}`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_SECRET}`,
			},
		});

		if (!res.ok) {
			throw new Error(`${res.status} ${res.statusText}`);
		}

		trailers = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return trailers as TrailersResponseList;
};

export const fetchTrailersForMovie = async (id: number, options?: {
	lang: Locales,
}): Promise<TrailersResponseList | null> => {
	const preferredTrailers = await fetchTrailersByLocale(id, options?.lang ?? fallbackLng);

	if (preferredTrailers && preferredTrailers.results.length === 0) {
		const fallbackTrailers = await fetchTrailersByLocale(id, fallbackLng);

		return fallbackTrailers;
	}

	return preferredTrailers;
};


