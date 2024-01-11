import { Department } from '@/types/shared';
import { Locales, fallbackLng } from '@/i18n/settings';
import { CreditsResponse, ExternalIDS, PersonCredit } from '../types';


export type PersonDetails = {
	adult: boolean,
	also_known_as: string[],
	biography: string,
	birthday: string,
	deathday: string | null,
	gender: number,
	homepage: string | null,
	id: number,
	imdb_id: string,
	known_for_department: Department,
	name: string,
	place_of_birth: string,
	popularity: number,
	profile_path: string | null,
	external_ids: ExternalIDS
	combined_credits: CreditsResponse<PersonCredit, PersonCredit & { department: Department }>,
};

export const fetchPerson = async (id: string, options?: { lang: Locales }): Promise<PersonDetails | null> => {
	const currentLang = options?.lang ?? fallbackLng;

	let person;
	try {
		const res = await fetch(`https://api.themoviedb.org/3/person/${id}?append_to_response=external_ids,combined_credits&language=${currentLang}`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_SECRET}`,
			},
		});

		if (!res.ok) {
			throw new Error(`${res.status} ${res.statusText}`);
		}

		person = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return person as PersonDetails;
};