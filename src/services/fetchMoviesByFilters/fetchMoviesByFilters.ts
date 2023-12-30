import { Locales } from "@/i18n/settings";
import { ListsResponse, MovieResponse } from "../types";

export type Options = {
	language: Locales,
	region?: 'US' | 'RU',
	include_adult?: boolean,
	sort_by: 'popularity.asc' | 'popularity.desc' | 'revenue.asc' | 'revenue.desc' | 'primary_release_date.asc' | 'primary_release_date.desc' | 'vote_average.asc' | 'vote_average.desc' | 'vote_count.asc' | 'vote_count.desc',
	release_year?: string,
	primary_release_year?: string,
	'primary_release_date.gte'?: string,
	'primary_release_date.lte'?: string,
	'release_date.gte'?: string,
	'release_date.lte'?: string,
	'vote_average.gte'?: number,
	'vote_average.lte'?: number,
	'vote_count.gte'?: number,
	'vote_count.lte'?: number,
	with_release_type?: string,
	without_genres?: string,
	with_genres?: string,
	with_keywords?: string,
	without_keywords?: string,
}

export const fetchMoviesByFilters = async (page: number, options: Options) => {
	if (page < 1) throw new Error('The page number cannot be less than 1');

	const url = new URL('discover/movie', 'https://api.themoviedb.org/3/');

	url.searchParams.append('page', page.toString());
	(Object.keys(options) as Array<keyof typeof options>)
		.forEach((query) => {
			const value = options[query];
			if (value === undefined) return;

			url.searchParams.append(query, value.toString());
		});

	let movies;
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

		movies = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return movies as ListsResponse<MovieResponse>;
};