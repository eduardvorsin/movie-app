export type KeyWithoutId<T> = T extends `${infer Name}_id` ? Name : never;
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type Department = 'Actors' | 'Production' | 'Crew' | 'Writing' | 'Directing' | 'Costume & Make-Up' | 'Visual Effects' | 'Editing' | 'Art' | 'Lighting' | 'Camera' | 'Creator';

type CommonGenres = 'animation' | 'comedy' | 'crime' | 'documentary' | 'drama' | 'family' | 'mystery' | 'western';

export type MovieGenres = 'adventure' | 'romance' | 'fantastic' | 'history' | 'music' | 'war' | 'thriller' | 'fantasy' | 'horror' | 'tv movie' | 'action' | 'science fiction';

export type TVGenres = CommonGenres | 'action & adventure' | 'kids' | 'news' | 'reality' | 'sci-fi & fantasy' | 'soap' | 'talk' | 'war & politics';

export type Genres = MovieGenres | TVGenres;

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

export type SocialNetworksItem = {
	name: KeyWithoutId<keyof ExternalIDS>,
	url: string,
};

export type PlaceholderData = {
	img: {
		src: string;
		height: number;
		width: number;
	};
	color: {
		r: number;
		g: number;
		b: number;
		hex: string;
	};
	base64: string;
};

export type APIListsResponse<T> = {
	page: number,
	results: T[],
	total_page: number,
	total_results: number,
}

export type APIMovieResponse = {
	adult: boolean,
	backdrop_path: string | null,
	genre_ids: number[],
	id: number,
	original_language: string,
	original_title: string,
	title: string,
	video: boolean,
	overview: string,
	popularity: number,
	poster_path: string | null,
	release_date: string,
	vote_average: number,
	vote_count: number,
}

export type APICreditsResponse<T, U> = {
	cast: T[],
	crew: U[],
}