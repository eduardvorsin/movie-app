import { Locales, fallbackLng } from '@/i18n/settings';
import { TrailersResponseList } from '../types';

type MediaType = 'movie' | 'tv';

const fetchTrailersByLocale = async (id: number, options: {
	lang: Locales
	type: MediaType,
}): Promise<TrailersResponseList | null> => {
	let trailers;

	try {
		const res = await fetch(`https://api.themoviedb.org/3/${options.type}/${id}/videos?language=${options.lang}`, {
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

export const fetchTrailersForMediaProject = async (id: number, options: {
	lang: Locales,
	type: MediaType,
}): Promise<TrailersResponseList | null> => {
	const preferredTrailers = await fetchTrailersByLocale(id, {
		lang: options?.lang ?? fallbackLng,
		type: options.type,
	});

	if (preferredTrailers && preferredTrailers.results.length === 0) {
		const fallbackTrailers = await fetchTrailersByLocale(id, {
			lang: fallbackLng,
			type: options.type,
		});

		return fallbackTrailers;
	}

	return preferredTrailers;
};


