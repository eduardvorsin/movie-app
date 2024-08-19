import { FilterOptions, ListsResponse, MovieResponse } from "../types";

export const fetchMoviesByFilters = async (
	page: number,
	options: FilterOptions<'movie'>
): Promise<ListsResponse<MovieResponse> | null> => {
	const url = new URL(
		`/${process.env.API_VERSION}/discover/movie`,
		process.env.API_BASE_URL
	);
	url.searchParams.append('page', page.toString());
	(Object.keys(options) as Array<keyof typeof options>)
		.forEach((query) => {
			const value = options[query];
			if (value === undefined) return;

			url.searchParams.append(query, value.toString());
		});

	console.log('url.href', url.href)
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