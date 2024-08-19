import { Locales, fallbackLng } from '@/i18n/settings';
import { CreditsResponse, ListsResponse, MovieResponse, ExternalIDS, Genre, ProductionCompany, ProductionCountry, Review, CastAndCrewCredit, ReleaseDate } from '@/services/types';
import { Department } from '@/types/shared';

type MovieCastCredit = CastAndCrewCredit & { character: string };
type MovieCrewCredit = CastAndCrewCredit & {
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
	credits: CreditsResponse<MovieCastCredit, MovieCrewCredit>,
	similar: ListsResponse<MovieResponse>,
	recommendations: ListsResponse<MovieResponse>,
	reviews: ListsResponse<Review>,
	certification?: string,
	release_dates: { results: ReleaseDate[] },
}

const appendToResponse = [
	'external_ids',
	'credits',
	'similar',
	'recommendations',
	'release_dates',
	'reviews'
] as const;

export const fetchMovie = async (id: string, options?: { lang: Locales }): Promise<MovieDetails | null> => {
	const currentLang = options?.lang ?? fallbackLng;
	const url = new URL(
		`/${process.env.API_VERSION}/movie/${id}`,
		process.env.API_BASE_URL
	);
	url.searchParams.append('append_to_response', appendToResponse.join(','));
	url.searchParams.append('language', currentLang);

	let movie;
	try {
		const res = await fetch(url.href, {
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