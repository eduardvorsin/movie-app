import { Locales, fallbackLng } from '@/i18n/settings';
import { CreditsResponse, ListsResponse, MovieResponse, ExternalIDS, Genre, ProductionCompany, ProductionCountry, Review, Credit } from '@/services/types';
import { Department } from '@/types/shared';

export type MovieActorCredit = Credit & { character: string };
export type MovieCrewCredit = Credit & {
	department: Department,
	job: string,
};

export type MovieDetails = Omit<MovieResponse, 'genre_ids' | 'popularity'> & {
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
	credits: CreditsResponse<MovieActorCredit, MovieCrewCredit>,
	similar: ListsResponse<MovieResponse>,
	recommendations: ListsResponse<MovieResponse>,
	reviews: ListsResponse<Review>,
	certification?: string,
}

export const fetchMovie = async (id: string, options?: { lang: Locales }): Promise<MovieDetails | null> => {
	const currentLang = options?.lang ?? fallbackLng;

	let movie;
	try {
		const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=external_ids,credits,similar,recommendations,release_dates,reviews&language=${currentLang}`, {
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

	const movieData = movie as MovieDetails;
	const release = movieData.release_dates.results
		.find((release_date) => release_date.iso_3166_1 === 'US');
	const certification = release?.release_dates[0].certification;

	return {
		...movieData,
		certification,
	} as MovieDetails;
};