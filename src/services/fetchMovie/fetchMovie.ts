import { fetchTranslation } from '@/i18n/server';
import { Locales, fallbackLng } from '@/i18n/settings';
import { Genre, ProductionCompany, ProductionCounty } from '@/types/shared';

export type Movie = {
	backdrop_path: string | null,
	budget: number,
	genres: Genre[],
	homepage: string,
	id: number,
	imdb_id: string,
	original_language: string,
	original_title: string,
	overview: string,
	poster_path: string,
	production_companies: ProductionCompany[],
	production_countries: ProductionCounty[],
	release_date: string,
	revenue: number,
	runtime: number,
	status: string,
	tagline: string,
	title: string,
	video: boolean,
	vote_average: number,
	vote_count: number,
}

export const fetchMovie = async (id: string, options?: { lang: Locales }): Promise<Movie | Error> => {
	const currentLang = options?.lang ?? fallbackLng;
	const { t } = await fetchTranslation(currentLang, ['common']);

	let movie;
	try {
		const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?&language=${currentLang}`, {
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