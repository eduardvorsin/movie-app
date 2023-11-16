import { Department, ExternalIDS } from '@/types/shared';
import { fetchTranslation } from '@/i18n/server';
import { Locales, fallbackLng } from '@/i18n/settings';

export type ActorCredit = {
	id: number,
	title?: string,
	name?: string,
	release_date?: number,
	first_air_date?: number,
	vote_average: number,
	vote_count: number,
	character?: string,
	department?: Department,
	job?: string,
};

export type ActorCredits = {
	cast: ActorCredit[],
	crew: Array<ActorCredit & { department: Department }>
};

export type Actor = {
	adult: boolean,
	also_known_as: string[],
	biography: string,
	birthday: string,
	deathday: string | null,
	gender: number,
	homepage: string | null,
	id: number,
	imdb_id: string,
	known_for_department: string,
	name: string,
	place_of_birth: string,
	popularity: number,
	profile_path: string,
	external_ids: ExternalIDS
	combined_credits: ActorCredits,
};

export const fetchActor = async (id: string, options?: { lang: Locales }): Promise<Actor | Error> => {
	const currentLang = options?.lang ?? fallbackLng;
	const { t } = await fetchTranslation(currentLang, ['common']);

	let actor;
	try {
		const res = await fetch(`https://api.themoviedb.org/3/person/${id}?append_to_response=external_ids,combined_credits&language=${currentLang}`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_SECRET}`,
			},
		});

		if (!res.ok) {
			throw new Error(t('errors.pageNotFound'));
		}

		actor = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			return error;
		}
	}

	return actor;
};