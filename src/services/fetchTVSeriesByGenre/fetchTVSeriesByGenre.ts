import { TVSeriesGenres } from './../../types/shared';
import { Locales, fallbackLng } from '@/i18n/settings';
import { FilterOptions, ListsResponse, SortOptions, TVSeriesResponse } from '../types'
import { fetchTVSeriesByFilters } from '../fetchTVSeriesByFilters/fetchTVSeriesByFilters';
import { getGenreIdByName } from '@/helpers/getGenreIdByName/getGenreIdByName';
import { getKeywordIdByName } from '@/helpers/getKeywordIdByName/getKeywordIdByName';
import { Countries, getCountryCodeFromName } from '@/helpers/getCountryCodeFromName/getCountryCodeFromName';

export type TVSeriesSubgenres = 'medical' | 'historical' | 'anime' | 'teen' | 'sports' | 'love';

const isSubgenre = (genre: TVSeriesGenres | TVSeriesSubgenres | 'any'): genre is TVSeriesSubgenres => {
	const subgenres: TVSeriesSubgenres[] = ['medical', 'historical', 'anime', 'teen', 'sports', 'sports', 'love'];
	return subgenres.includes(genre as TVSeriesSubgenres);
};

export const fetchTVSeriesByGenre = async (
	genre: TVSeriesGenres | TVSeriesSubgenres | 'any',
	page: number,
	options?: {
		lang: Locales,
		country?: Countries,
		timePeriod?: string,
		sortBy?: SortOptions,
	}): Promise<ListsResponse<TVSeriesResponse> | null> => {
	let genreId = '';
	if (genre === 'anime') {
		genreId = '16';
	} else if (genre !== 'any' && !isSubgenre(genre)) {
		genreId = getGenreIdByName(genre);
	}

	let firstAirDateGTE = '';
	let firstAirDateLTE = '';
	if (options && options.timePeriod) {
		const timePeriods = options.timePeriod.split('-');
		firstAirDateGTE = `${timePeriods.at(0)}-01-01`;
		firstAirDateLTE = `${timePeriods.at(-1)}-12-31`
	}
	const countryCode = getCountryCodeFromName(options?.country ?? '');


	const config: FilterOptions<'tv'> = {
		sort_by: options?.sortBy ?? 'vote_average.desc',
		language: options?.lang ?? fallbackLng,
		with_genres: genreId,
		'vote_count.gte': countryCode === 'RU' ? 50 : 100,
		'vote_average.gte': 7,
		'first_air_date.gte': firstAirDateGTE,
		'first_air_date.lte': firstAirDateLTE,
		with_origin_country: countryCode,
		with_keywords: isSubgenre(genre) ? getKeywordIdByName(genre) : '',
		without_keywords: (genre === 'sports' || genre === 'war & politics') ? getKeywordIdByName('anime') : '',
		without_genres: genre === 'war & politics' ? getGenreIdByName('documentary') : '',
	};

	return await fetchTVSeriesByFilters(page, config);
};