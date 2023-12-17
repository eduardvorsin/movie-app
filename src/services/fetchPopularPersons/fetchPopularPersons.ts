import { Locales, fallbackLng } from '@/i18n/settings';
import { APIListsResponse, Department } from '@/types/shared';

type PopularPerson = {
	adult: boolean,
	gender: number,
	id: number,
	known_for_department: Department,
	name: string,
	popularity: number,
	profile_path: string | null,
}

export const fetchPopularPersons = async (page: number, options?: { lang: Locales }): Promise<APIListsResponse<PopularPerson> | Error> => {
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