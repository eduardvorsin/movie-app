import { Locales, fallbackLng } from '@/i18n/settings';
import { Department } from '@/types/shared';
import { CastAndCrewCredit, TVSeriesEpisode } from '@/services/types';

type Episodes = TVSeriesEpisode & {
	episode_type: string,
	crew: (CastAndCrewCredit & {
		department: Department,
		job: string,
	})[],
	guest_stars: (CastAndCrewCredit & {
		character: string,
	})[],
};

export type TVSeriesSeasonDetails = {
	_id: string,
	air_date?: string,
	name: string,
	overview: string,
	id: number,
	poster_path: string | null,
	season_number: number,
	vote_average: number,
	episodes: Episodes[],
};

export const fetchSeasonsForTVSeries = async ({ id, seasonNumber, lang }: {
	id: string,
	seasonNumber: number,
	lang: Locales
}): Promise<TVSeriesSeasonDetails | null> => {
	const currentLang = lang ?? fallbackLng;
	const url = new URL(
		`/${process.env.API_VERSION}/tv/${id}/season/${seasonNumber}`,
		process.env.API_BASE_URL
	);
	url.searchParams.set('language', currentLang);

	let seasonDetails;
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

		seasonDetails = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return seasonDetails as TVSeriesSeasonDetails;
};