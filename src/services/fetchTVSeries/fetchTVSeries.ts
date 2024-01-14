import { Locales, fallbackLng } from '@/i18n/settings';
import { CreditsResponse, ListsResponse, ExternalIDS, Genre, ProductionCompany, ProductionCountry, Review, TVSeriesResponse, Credit } from '@/services/types';
import { Department } from '@/types/shared';

export type TVSeriesActorCredit = Credit & {
	roles: {
		credit_id: string,
		character: string,
		episode_count: number,
	}[],
};
export type TVSeriesCrewCredit = Credit & {
	department: Department,
	jobs: {
		credit_id: string,
		job: string,
		episode_count: number,
	}[],
};

export type TVSeriesDetails = Omit<TVSeriesResponse, 'genres_id' | 'popularity'> & {
	episode_run_time: number[],
	genres: Genre[],
	homepage: string,
	in_production: boolean,
	languages: string[],
	last_air_date: string,
	next_episode_to_air: string,
	number_of_episodes: number,
	number_of_seasons: number,
	status: string,
	tagline: string,
	type: string,
	production_companies: ProductionCompany[],
	production_countries: ProductionCountry[],
	seasons: {
		air_date: string,
		episode_count: number,
		id: number,
		name: string,
		overview: string,
		poster_path: string,
		season_number: number,
		vote_average: number,
	}[],
	last_episode_to_air: {
		id: number,
		name: string,
		overview: string,
		vote_average: number,
		vote_count: number,
		air_date: string,
		episode_number: number,
		production_code: string,
		runtime: number,
		season_number: number,
		show_id: number,
		still_path: string,
	},
	external_ids: ExternalIDS,
	aggregate_credits: CreditsResponse<TVSeriesActorCredit, TVSeriesCrewCredit>,
	similar: ListsResponse<TVSeriesResponse>,
	recommendations: ListsResponse<TVSeriesResponse>,
	reviews: ListsResponse<Review>,
}

export const fetchTVSeries = async (id: string, options?: { lang: Locales }): Promise<TVSeriesDetails | null> => {
	const currentLang = options?.lang ?? fallbackLng;

	let tvSeries;
	try {
		const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?append_to_response=external_ids,aggregate_credits,similar,recommendations,reviews&language=${currentLang}`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_SECRET}`,
			},
		});

		if (!res.ok) {
			throw new Error(`${res.status} ${res.statusText}`);
		}

		tvSeries = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return tvSeries as TVSeriesDetails;
};