import { fetchTranslation } from '@/i18n/server';
import { Locales, fallbackLng } from '@/i18n/settings';
import { Department, ExternalIDS, Genre, ProductionCompany, ProductionCounty } from '@/types/shared';

type Movie = {
	backdrop_path: string | null,
	genre_ids: number[],
	id: number,
	original_language: string,
	original_title: string,
	overview: string,
	popularity: number,
	poster_path: string | null,
	release_date: string,
	title: string,
	video: boolean,
	vote_average: number,
	vote_count: number,
}

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

type Reviews = {
	page: number,
	results: Review[],
	total_page: number,
	total_results: number,
};


type SimilarMovies = {
	page: number,
	results: Movie[],
	total_page: number,
	total_results: number,
};

type RecommendedMovies = SimilarMovies;

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
export type MovieCredits = {
	cast: ActorCredit[],
	crew: CrewCredit[],
}

export type MovieDetails = Omit<Movie, 'genres_id' | 'popularity'> & {
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
	credits: MovieCredits,
	similar: SimilarMovies,
	recommendations: RecommendedMovies,
	reviews: Reviews,
}

export const fetchMovie = async (id: string, options?: { lang: Locales }): Promise<MovieDetails | Error> => {
	const currentLang = options?.lang ?? fallbackLng;
	const { t } = await fetchTranslation(currentLang, ['common']);

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
			throw new Error(t('errors.pageNotFound'));
		}

		movie = await res.json();
	} catch (error) {
		if (error instanceof Error) {
			return error;
		}
	}

	return movie;
};