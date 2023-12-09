import { Locales, fallbackLng } from '@/i18n/settings';
import { Department } from '@/types/shared';

type PopularPerson = {
	gender: number,
	id: number,
	known_for_department: Department,
	name: string,
	popularity: number,
	profile_path: string | null,
}

type PopularPersons = {
	page: number,
	results: PopularPerson[],
	total_page: number,
	total_results: number,
}

export const fetchPopularPersons = async (page: number, options?: { lang: Locales }): Promise<PopularPersons | Error> => {
	const currentLang = options?.lang ?? fallbackLng;

	let popularPersons;
	try {
		const res = await fetch(`https://api.themoviedb.org/3/person/popular?page=${page}&language=${currentLang}`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_SECRET}`,
			}
		});

		if (!res.ok) {
			throw new Error('Couldn\'t fetch a list of popular people');
		}

		popularPersons = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			return error;
		}
	}

	return popularPersons;
};