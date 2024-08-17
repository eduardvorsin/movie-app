'use client';

import { CSSProperties, useReducer, useState } from 'react';
import { MovieGenres, TVSeriesGenres } from '@/types/shared';
import Button from '../Button/Button';
import { useParams } from 'next/navigation';
import { Locales, fallbackLng } from '@/i18n/settings';
import { Collections, imgPath } from '@/constants';
import { ListsResponse, MovieResponse, TVSeriesResponse } from '@/services/types';
import Banner from '../Banner/Banner';
import MovieCard from '../MovieCard/MovieCard';
import { getLocalizedDate } from '@/i18n/utils/getLocalizedDate/getLocalizedDate';
import { MovieSubgenres } from '@/services/fetchMoviesByGenre/fetchMoviesByGenre';
import { TVSeriesSubgenres } from '@/services/fetchTVSeriesByGenre/fetchTVSeriesByGenre';
import { Countries } from '@/helpers/getCountryCodeFromName/getCountryCodeFromName';
import { CatalogSortOptions } from '../CatalogFilters/CatalogFilters';

const isMovieItem = (
	item: MovieResponse | TVSeriesResponse,
	type: 'movie' | 'tv'
): item is MovieResponse => {
	return type === 'movie';
}

const apiRoutes = {
	movie: {
		collection: 'movieByCollection',
		genre: 'movieByGenre',
	},
	tv: {
		collection: 'tvSeriesByCollection',
		genre: 'tvSeriesByGenre',
	},
} as const;

const imgPathByContentType = {
	collection: imgPath['movieCard_h'],
	genre: imgPath['movieCard_v'],
}

type ConditionalProps<M extends 'movie' | 'tv'> = (
	{
		contentType: 'collection',
		collectionName: Collections,
		genreName?: never,
	} | {
		contentType: 'genre',
		collectionName?: never,
		genreName: 'any' | (M extends 'movie' ? MovieGenres | MovieSubgenres : TVSeriesGenres | TVSeriesSubgenres),
	}
);

type Data = MovieResponse | TVSeriesResponse;

export type Props<M extends 'movie' | 'tv'> = {
	className?: string,
	testId?: string,
	style?: CSSProperties,
	mediaType: M,
	initialData: ListsResponse<Data>,
	searchOptions?: {
		country?: Countries,
		timePeriod?: string,
		sortBy?: CatalogSortOptions,
	},
	dictionary: {
		errorTitle: string,
		errorText: string,
		loadMoreButton: string,
		movieCard: Record<'rating', string>,
	},
} & ConditionalProps<M>;

type State = {
	status: 'loading' | 'successful' | 'error' | 'idle',
	items: Data[],
	error: string,
};

type Action = {
	type: 'set_loading',
} | {
	type: 'set_error',
	payload: string,
} | {
	type: 'set_data',
	payload: Data[],
};

const createInitialState = (initialData: Data[] | null): State => {
	return {
		status: 'idle' as const,
		items: initialData ?? [],
		error: '',
	};
}

type Reducer = (state: State, action: Action) => State;

const reducer: Reducer = (state, action) => {
	if (action.type === 'set_loading') {
		return {
			status: 'loading' as const,
			error: '',
			items: state.items,
		};
	} else if (action.type === 'set_error') {
		return {
			status: 'error' as const,
			error: action.payload,
			items: [],
		};
	} else if (action.type = 'set_data') {
		return {
			status: 'successful' as const,
			error: '',
			items: [...state.items, ...action.payload],
		};
	}

	return state;
};

export default function InfiniteMovieFeed<M extends 'movie' | 'tv'>({
	className,
	mediaType,
	initialData,
	testId,
	style,
	contentType,
	searchOptions,
	dictionary,
	...props
}: Props<M>) {
	const [state, dispatch] = useReducer<Reducer, Data[]>(
		reducer,
		initialData.results,
		createInitialState
	);
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const [page, setPage] = useState<number>(1);

	const loadMore = async (page: number) => {
		const id = contentType === 'collection' ? props.collectionName : props.genreName;
		const params = {
			page: page.toString(),
			lang: lang,
			country: searchOptions?.country ?? '',
			timePeriod: searchOptions?.timePeriod ?? '',
			sortBy: searchOptions?.sortBy ?? '',
		};
		const baseURL = `/api/${apiRoutes[mediaType][contentType]}/${id}`;
		const searchParams = new URLSearchParams();

		(Object.keys(params) as (keyof typeof params)[]).map((key) => (
			searchParams.set(key, params[key])
		));

		const url = `${baseURL}?${searchParams.toString()}`;
		dispatch({ type: 'set_loading' });

		const res = await fetch(url);
		const data = (await res.json()) as ListsResponse<MovieResponse | TVSeriesResponse> | null;
		if (data?.results) {
			dispatch({ type: 'set_data', payload: data.results });

		} else {
			dispatch({ type: 'set_error', payload: dictionary.errorText });
		}
	}

	const clickHandler = () => {
		loadMore(page + 1);
		setPage((prevPage) => prevPage + 1);
	};

	const classes = [
		'flex flex-col',
		className
	].join(' ');

	const containerClasses = [
		'grid duration-150 transition-opacity',
		contentType === 'collection' ? 'mx-auto xs:mx-0 max-w-[320px] xs:max-w-full grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-5' : 'mx-auto 2xs:mx-0 max-w-[200px] 2xs:max-w-full grid-cols-1 2xs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5',
		state.status === 'loading' ? 'opacity-50 pointer-events-none' : 'opacity-100'
	].join(' ');

	return (
		<div
			className={classes}
			data-testid={testId}
			style={style}
		>
			{!state.error && (
				<div className={containerClasses}>
					{state.items.map((item) => {
						const contentData = {
							title: isMovieItem(item, mediaType) ? item.title : item.name,
							release_date: isMovieItem(item, mediaType) ? item.release_date : item.first_air_date
						};

						return (
							<MovieCard
								key={item.id}
								mediaType='movie'
								movieId={item.id}
								variant={contentType === 'collection' ? 'horizontal' : 'vertical'}
								src={
									item.backdrop_path ? `${imgPathByContentType[contentType]}${contentType === 'collection' ? item.backdrop_path : item.poster_path}` : ''
								}
								alt={contentData.title}
								title={contentData.title}
								titleElement='h4'
								appearance={contentType === 'collection' ? 'secondary' : 'primary'}
								genres={item.genre_ids}
								showRating
								rating={item.vote_average * 10}
								releaseDate={getLocalizedDate(contentData.release_date, lang)}
								titleLevel={5}
								sizes='(min-width: 1230px) 286px, (min-width: 1024px) 25vw, (min-width: 650px) 33.3vw, (min-width: 480px) 50vw, 320px'
							/>
						)
					})}
				</div>
			)}

			{state.error && (
				<Banner
					closeButton={false}
					title={dictionary.errorTitle}
					appearance='danger'
				>
					{dictionary.errorText}
				</Banner>
			)}

			{!state.error && page < initialData.total_pages && (
				<Button
					className='mt-5 text-200 md:text-[1.125rem] max-w-[300px] md:max-w-[25rem] w-full justify-center self-center'
					isLoading={state.status === 'loading'}
					onClick={clickHandler}
				>
					{dictionary.loadMoreButton}
				</Button>
			)}
		</div>
	);
};