import { Locales, fallbackLng } from "@/i18n/settings";
import { ListsResponse, TVSeriesResponse } from "@/services/types";

export const fetchPopularTVSeries = async (page: number, options?: { lang: Locales }): Promise<ListsResponse<TVSeriesResponse> | null> => {
	const currentLang = options?.lang ?? fallbackLng;

	const currentDate = new Date();
	const year = currentDate.getMonth() >= 5 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;

	const url = new URL('discover/tv', 'https://api.themoviedb.org/3/');
	const queryParams = {
		language: currentLang,
		page: page.toString(),
		sort_by: 'popularity.desc',
		first_air_date_year: year.toString(),
		'vote_count.gte': '200',
	};

	(Object.keys(queryParams) as Array<keyof typeof queryParams>)
		.forEach((query) => {
			url.searchParams.append(query, queryParams[query]);
		});

	let popularTVSeries;
	try {
		const res = await fetch(url.href, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_SECRET}`,
			},
		})

		if (!res.ok) {
			throw new Error(`${res.status} ${res.statusText}`);
		}

		popularTVSeries = await res.json();

	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return popularTVSeries as ListsResponse<TVSeriesResponse>;
}
