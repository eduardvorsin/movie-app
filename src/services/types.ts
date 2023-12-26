export type ListsResponse<T> = {
	page: number,
	results: T[],
	total_page: number,
	total_results: number,
}

type MovieAndSeriesResponse = {
	backdrop_path: string | null,
	genre_ids: number[],
	id: number,
	original_language: string,
	overview: string,
	popularity: number,
	poster_path: string | null,
	vote_average: number,
	vote_count: number,
}

export type MovieResponse = MovieAndSeriesResponse & {
	adult: boolean,
	original_title: string,
	title: string,
	video: boolean,
	release_date: string,
}

export type TVSeriesResponse = MovieAndSeriesResponse & {
	first_air_date?: string,
	name: string,
	origin_country: string[],
	original_name: string,
}

export type CreditsResponse<T, U> = {
	cast: T[],
	crew: U[],
}

export type ProductionCompany = {
	id: string,
	logo_path: string | null,
	name: string,
	origin_country: string,
}

export type ProductionCountry = {
	iso_3166_1: string,
	name: string
};

export type Genre = {
	id: string,
	name: string
};

export type ExternalIDS = {
	imdb_id: string | null,
	facebook_id: string | null,
	instagram_id: string | null,
	tiktok_id: string | null,
	twitter_id: string | null,
	youtube_id: string | null,
}