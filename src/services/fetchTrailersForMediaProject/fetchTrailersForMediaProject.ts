import { Locales, fallbackLng } from '@/i18n/settings';
import { TrailersResponseList } from '../types';
import { MediaTypes } from '@/types/shared';

const fetchTrailersByLocale = async (id: number, options: {
	lang: Locales
	type: Omit<MediaTypes, 'person'>,
}): Promise<TrailersResponseList | null> => {
	const url = new URL(
		`/${process.env.API_VERSION}/${options.type}/${id}/videos`,
		process.env.API_BASE_URL
	);
	url.searchParams.set('language', options.lang);

	let trailers;
	try {
		const res = await fetch(url.href, {
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
	type: Omit<MediaTypes, 'person'>,
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


