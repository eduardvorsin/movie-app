import { Locales, fallbackLng } from '@/i18n/settings';
import { CreditsResponse, ListsResponse, ExternalIDS, Genre, ProductionCompany, ProductionCountry, Review, TVSeriesResponse, CastAndCrewCredit, TVSeriesEpisode } from '@/services/types';
import { Department } from '@/types/shared';

export type TVSeriesCastCredit = CastAndCrewCredit & {
	roles: {
		credit_id: string,
		character: string,
		episode_count: number,
	}[],
};
export type TVSeriesCrewCredit = CastAndCrewCredit & {
	department: Department,
	jobs: {
		credit_id: string,
		job: string,
		episode_count: number,
	}[],
};

type TVSeriesData = Omit<TVSeriesResponse, 'genre_ids' | 'popularity'> & {
	episode_run_time: number[],
	genres: Genre[],
	homepage: string,
	in_production: boolean,
	languages: string[],
	last_air_date?: string,
	next_episode_to_air: string | null,
	number_of_episodes: number,
	number_of_seasons: number,
	status: string,
	tagline: string,
	type: string,
	production_companies: ProductionCompany[],
	production_countries: ProductionCountry[],
	seasons: {
		air_date?: string,
		episode_count: number,
		id: number,
		name: string,
		overview: string,
		poster_path: string | null,
		season_number: number,
		vote_average: number,
	}[],
	last_episode_to_air: TVSeriesEpisode,
};

type TVSeriesAdditionalData = {
	external_ids: ExternalIDS,
	aggregate_credits: CreditsResponse<TVSeriesCastCredit, TVSeriesCrewCredit>,
	similar: ListsResponse<TVSeriesResponse>,
	recommendations: ListsResponse<TVSeriesResponse>,
	reviews: ListsResponse<Review>,
	content_ratings: {
		id: number,
		results: {
			descriptors: string[],
			iso_3166_1: string,
			rating: string,
		}[],
	}
}

export type TVSeriesDetails = TVSeriesData & TVSeriesAdditionalData;

const appendToResponse = [
	'external_ids',
	'aggregate_credits',
	'similar',
	'recommendations',
	'content_ratings',
	'reviews'
] as const;

export const fetchTVSeries = async <
	T extends boolean,
	R = T extends true ? TVSeriesDetails : TVSeriesData,
>(id: string, options: {
	lang: Locales,
	includeAdditionalData: T,
}): Promise<R | null> => {
	const currentLang = options?.lang ?? fallbackLng;
	const url = new URL(
		`/${process.env.API_VERSION}/tv/${id}`,
		process.env.API_BASE_URL
	);
	url.searchParams.append('language', currentLang);
	if (options.includeAdditionalData) {
		url.searchParams.append('append_to_response', appendToResponse.join(','));
	}

	let tvSeries;
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

		tvSeries = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return tvSeries as R;
};