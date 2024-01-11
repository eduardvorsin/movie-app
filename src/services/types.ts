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

type ReleaseDate = {
	iso_3166_1: string,
	release_dates: [
		{
			certification: string,
			descriptors: string[],
			iso_639_1: string,
			note: string,
			release_date: string,
			type: 1 | 2 | 3 | 4 | 5 | 6,
		}
	],
};

export type MovieResponse = MovieAndSeriesResponse & {
	adult: boolean,
	original_title: string,
	title: string,
	video: boolean,
	release_date: string,
	release_dates: { results: ReleaseDate[] },
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

export type TrailerResponse = {
	name: string,
	key: string,
	site: 'YouTube' | 'Vimeo',
	size: number,
	type: 'Trailer' | 'Teaser' | 'Behind the Scenes' | 'Clip' | 'Featurette',
	official: boolean,
	published_at: string,
	id: string
}

export type TrailersResponseList = {
	id: number,
	results: TrailerResponse[],
}

export type Review = {
	author: string,
	author_details: {
		name: string,
		username: string,
		avatar_path: string | null,
		rating: number,
	},
	content: string,
	created_at: string,
	id: string,
	updated_at: string,
	url: string,
};

export type Credit = {
	id: number,
	known_for_department: Department,
	name: string,
	profile_path: string | null,
	popularity: number,
}

export type ActorCredit = Credit & { character: string };
export type CrewCredit = Credit & {
	department: Department,
	job: string,
};
