import { FilterOptions, ListsResponse, TVSeriesResponse } from "../types";

export const fetchTVSeriesByFilters = async (
	page: number,
	options: FilterOptions<'tv'>
): Promise<ListsResponse<TVSeriesResponse> | null> => {
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