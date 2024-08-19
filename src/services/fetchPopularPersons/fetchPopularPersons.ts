import { Locales, fallbackLng } from '@/i18n/settings';
import { ListsResponse, PopularPerson } from '../types';

export const fetchPopularPersons = async (page: number, options?: { lang: Locales }): Promise<ListsResponse<PopularPerson> | null> => {
	const currentLang = options?.lang ?? fallbackLng;
	const url = new URL(
		`/${process.env.API_VERSION}/person/popular`,
		process.env.API_BASE_URL
	);
	url.searchParams.set('page', page.toString());
	url.searchParams.set('language', currentLang);

	let popularPersons;
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

		popularPersons = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return popularPersons as ListsResponse<PopularPerson>;
};