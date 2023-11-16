export type KeyWithoutId<T> = T extends `${infer Name}_id` ? Name : never;
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type Department = 'Actors' | 'Production' | 'Crew' | 'Writing' | 'Directing' | 'Costume & Make-Up' | 'Visual Effects' | 'Editing' | 'Art' | 'Lighting' | 'Camera' | 'Creator';

export type ProductionCompany = {
	id: string,
	logo_path: string,
	name: string,
	origin_country: string,
}

export type ProductionCounty = {
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