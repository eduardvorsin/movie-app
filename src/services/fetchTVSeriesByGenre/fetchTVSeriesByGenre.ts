import { TVSeriesGenres } from './../../types/shared';
import { Locales, fallbackLng } from '@/i18n/settings';
import { ListsResponse, TVSeriesResponse } from '../types'
import { Options, fetchTVSeriesByFilters } from '../fetchTVSeriesByFilters/fetchTVSeriesByFilters';
import { getGenreIdByName } from '@/helpers/getGenreIdByName/getGenreIdByName';
import { getKeywordIdByName } from '@/helpers/getKeywordIdByName/getKeywordIdByName';

type Subgenres = 'medical' | 'historical' | 'anime' | 'teen' | 'sports' | 'love';

const isSubgenre = (genre: TVSeriesGenres | Subgenres | 'any'): genre is Subgenres => {
	const subgenres: Subgenres[] = ['medical', 'historical', 'anime', 'teen', 'sports', 'sports', 'love'];
	return subgenres.includes(genre as Subgenres);
};

export const fetchTVSeriesByGenre = async (
	genre: TVSeriesGenres | Subgenres | 'any',
	page: number,
	options?: {
		lang: Locales,
		withCountry?: string,
	}): Promise<ListsResponse<TVSeriesResponse> | null> => {
	let genreId = '';
	if (genre === 'anime') {
		genreId = '16';
	} else if (genre !== 'any' && !isSubgenre(genre)) {
		genreId = getGenreIdByName(genre);
	}

	const config: Options = {
		sort_by: 'vote_average.desc',
		language: options?.lang ?? fallbackLng,
		with_genres: genreId,
		'vote_count.gte': 50,
		'vote_average.gte': 7,
		with_origin_country: options?.withCountry ?? '',
		with_keywords: isSubgenre(genre) ? getKeywordIdByName(genre) : '',
		without_keywords: (genre === 'sports' || genre === 'war & politics') ? getKeywordIdByName('anime') : '',
		without_genres: genre === 'war & politics' ? getGenreIdByName('documentary') : '',
	};

	return await fetchTVSeriesByFilters(page, config);
};