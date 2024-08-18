import { fallbackLng, Locales } from '@/i18n/settings';
import { ListsResponse, MultiSearchData } from '../types';

export const fetchMultiSearchData = async (value: string, page: number, options?: {
	language: Locales,
}): Promise<ListsResponse<MultiSearchData> | null> => {
	const url = new URL('search/multi', 'https://api.themoviedb.org/3/')
	url.searchParams.append('query', value);
	url.searchParams.append('page', page.toString());
	url.searchParams.append('language', options?.language ?? fallbackLng);

	let searchData;
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

		searchData = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return await searchData as ListsResponse<MultiSearchData>;
};