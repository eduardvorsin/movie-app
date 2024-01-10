import { Locales } from "@/i18n/settings";
import { ListsResponse, TVSeriesResponse } from "../types";

export type Options = {
	language: Locales,
	include_adult?: boolean,
	sort_by: 'popularity.asc' | 'popularity.desc' | 'revenue.asc' | 'revenue.desc' | 'primary_release_date.asc' | 'primary_release_date.desc' | 'vote_average.asc' | 'vote_average.desc' | 'vote_count.asc' | 'vote_count.desc',
	'air_date.gte'?: string,
	'air_date.lte'?: string,
	'first_air_date.gte'?: string,
	'first_air_date.lte'?: string,
	first_air_date_year?: number,
	include_null_first_air_dates?: boolean,
	screened_theatrically?: boolean,
	timezone?: 'string,'
	'vote_average.gte'?: number,
	'vote_average.lte'?: number,
	'vote_count.gte'?: number,
	'vote_count.lte'?: number,
	with_genres?: string,
	with_keywords?: string,
	without_genres?: string,
	without_keywords?: string,
	with_origin_country?: string,
}

export const fetchTVSeriesByFilters = async (page: number, options: Options): Promise<ListsResponse<TVSeriesResponse> | null> => {
	if (page < 1) throw new Error('The page number cannot be less than 1');

	const url = new URL('discover/tv', 'https://api.themoviedb.org/3/');

	url.searchParams.append('page', page.toString());
	(Object.keys(options) as Array<keyof typeof options>)
		.forEach((query) => {
			const value = options[query];
			if (value === undefined) return;

			url.searchParams.append(query, value.toString());
		});

	let tvSeries;
	try {
		const res = await fetch(url.href, {
			method: 'Get',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_SECRET}`,
			}
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

	return tvSeries as ListsResponse<TVSeriesResponse>;
};