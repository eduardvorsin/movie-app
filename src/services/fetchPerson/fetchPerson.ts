import { Department } from '@/types/shared';
import { Locales, fallbackLng } from '@/i18n/settings';
import { CombinedCredits, ExternalIDS } from '@/services/types';

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
	combined_credits: CombinedCredits,
};

const appendToResponse = [
	'external_ids',
	'combined_credits',
] as const;

export const fetchPerson = async (id: string, options?: { lang: Locales }): Promise<PersonDetails | null> => {
	const currentLang = options?.lang ?? fallbackLng;
	const url = new URL(
		`/${process.env.API_VERSION}/person/${id}`,
		process.env.API_BASE_URL
	);
	url.searchParams.set('append_to_response', appendToResponse.join(','));
	url.searchParams.set('language', currentLang);

	let person;
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

		person = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return person as PersonDetails;
};