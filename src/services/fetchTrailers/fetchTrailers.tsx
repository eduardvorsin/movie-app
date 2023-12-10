import { Locales, fallbackLng } from '@/i18n/settings';

type Trailer = {
	name: string,
	key: string,
	site: 'YouTube' | 'Vimeo',
	size: number,
	type: 'Trailer' | 'Teaser' | 'Behind the Scenes' | 'Clip' | 'Featurette',
	official: boolean,
	published_at: string,
	id: string
}

type TrailersData = {
	id: number,
	results: Trailer[],
}

const fetchTrailersByLocale = async (id: string, locale: Locales): Promise<TrailersData | Error> => {
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
			throw new Error('The trailers for the movie project could not be uploaded');
		}

		trailers = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			return error;
		}
	}

	return trailers;
};

export const fetchTrailers = async (id: string, options: {
	lang: Locales,
}): Promise<TrailersData | Error> => {
	const preferredTrailers = await fetchTrailersByLocale(id, options.lang);

	if (!(preferredTrailers instanceof Error) && preferredTrailers.results.length === 0) {
		const fallbackTrailers = await fetchTrailersByLocale(id, fallbackLng);

		return fallbackTrailers;
	}

	return preferredTrailers;
};


