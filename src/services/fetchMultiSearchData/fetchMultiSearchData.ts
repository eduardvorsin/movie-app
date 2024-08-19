import { fallbackLng, Locales } from '@/i18n/settings';
import { ListsResponse, MultiSearchData } from '@/services/types';

export const fetchMultiSearchData = async (value: string, page: number, options?: {
	language: Locales,
}): Promise<ListsResponse<MultiSearchData> | null> => {
	const url = new URL(
		`/${process.env.API_VERSION}/search/multi`,
		process.env.API_BASE_URL
	);
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