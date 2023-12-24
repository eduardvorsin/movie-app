import { Locales, fallbackLng } from '@/i18n/settings';
import { APICreditsResponse, APIListsResponse, APIMovieResponse, Department, ExternalIDS, Genre, ProductionCompany, ProductionCountry } from '@/types/shared';

type Review = {
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

type Credit = {
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

export type MovieDetails = Omit<APIMovieResponse, 'genres_id' | 'popularity'> & {
	genres: Genre[],
	budget: number,
	imdb_id: string,
	production_companies: ProductionCompany[],
	production_countries: ProductionCountry[],
	homepage: string,
	revenue: number,
	runtime: number,
	status: string,
	tagline: string,
	external_ids: ExternalIDS,
	credits: APICreditsResponse<ActorCredit, CrewCredit>,
	similar: APIListsResponse<APIMovieResponse>,
	recommendations: APIListsResponse<APIMovieResponse>,
	reviews: APIListsResponse<Review>,
}

export const fetchMovie = async (id: string, options?: { lang: Locales }): Promise<MovieDetails | null> => {
	const currentLang = options?.lang ?? fallbackLng;

	let movie;
	try {
		const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=external_ids,credits,similar,recommendations,reviews&language=${currentLang}`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_SECRET}`,
			},
		});

		if (!res.ok) {
			throw new Error(`${res.status} ${res.statusText}`);
		}

		movie = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return null;
		}
	}

	return movie as MovieDetails;
};