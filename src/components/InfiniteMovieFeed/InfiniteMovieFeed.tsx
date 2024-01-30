'use client';

import { CSSProperties, useState } from 'react';
import { MovieGenres, TVSeriesGenres } from '@/types/shared';
import Button from '../Button/Button';
import { useParams } from 'next/navigation';
import { Locales, fallbackLng } from '@/i18n/settings';
import { Collections, imgPath } from 'src/constants';
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

type Props<
	M extends 'movie' | 'tv',
	I = M extends 'movie' ? MovieResponse : TVSeriesResponse
> = {
	className?: string,
	testId?: string,
	style?: CSSProperties,
	mediaType: M,
	initialData: ListsResponse<I>,
	searchOptions?: {
		country?: Countries,
		timePeriod?: string,
		sortBy?: CatalogSortOptions,
	},
	dictionary: {
		errorTitle: string,
		errorText: string,
		loadMoreButton: string,
		movieCard: {
			rating: string,
		},
	},
} & (
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

export default function InfiniteMovieFeed<
	M extends 'movie' | 'tv',
	I extends MovieResponse | TVSeriesResponse = M extends 'movie' ? MovieResponse : TVSeriesResponse,
>({
	className,
	mediaType,
	initialData,
	testId,
	style,
	contentType,
	searchOptions,
	dictionary,
	...props
}: Props<M, I>) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const [page, setPage] = useState<number>(1);
	const [items, setItems] = useState<I[]>(initialData.results);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const loadMore = async (page: number) => {
		const id = contentType === 'collection' ? props.collectionName : props.genreName;
		const baseURL = `/api/${apiRoutes[mediaType][contentType]}/${id}`;
		const searchParams = new URLSearchParams();
		searchParams.set('page', page.toString());
		searchParams.set('lang', lang);
		searchParams.set('country', searchOptions?.country ?? '');
		searchParams.set('timePeriod', searchOptions?.timePeriod ?? '');
		searchParams.set('sortBy', searchOptions?.sortBy ?? '');

		const url = `${baseURL}?${searchParams.toString()}`;

		const res = await fetch(url);
		const data = (await res.json()) as ListsResponse<I> | null;
		if (data?.results) {
			setItems(prevItems => [...prevItems, ...data.results]);
		} else {
			setError(true);
		}

		setLoading(false);
	}

	const clickHandler = () => {
		setLoading(true);
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
		loading ? 'opacity-50 pointer-events-none' : 'opacity-100'
	].join(' ');

	return (
		<div
			className={classes}
			data-testid={testId}
			style={style}
		>
			{!error && (
				<div className={containerClasses}>
					{items.map((item) => {
						if (isMovieItem(item, mediaType)) {
							return (
								<MovieCard
									key={item.id}
									mediaType='movie'
									movieId={item.id}
									variant={contentType === 'collection' ? 'horizontal' : 'vertical'}
									src={
										item.backdrop_path ? `${imgPathByContentType[contentType]}${contentType === 'collection' ? item.backdrop_path : item.poster_path}` : ''
									}
									alt={item.title}
									title={item.title}
									titleElement='h4'
									appearance={contentType === 'collection' ? 'secondary' : 'primary'}
									genres={item.genre_ids}
									showRating
									rating={item.vote_average * 10}
									releaseDate={getLocalizedDate(item.release_date, lang)}
									titleLevel={5}
									sizes='(min-width: 1230px) 286px, (min-width: 1024px) 25vw, (min-width: 650px) 33.3vw, (min-width: 480px) 50vw, 320px'
								/>
							)
						} else {
							return (
								<MovieCard
									key={item.id}
									mediaType='tv'
									movieId={item.id}
									variant={contentType === 'collection' ? 'horizontal' : 'vertical'}
									src={
										item.backdrop_path ? `${imgPathByContentType[contentType]}${contentType === 'collection' ? item.backdrop_path : item.poster_path}` : ''
									}
									alt={item.name}
									title={item.name}
									titleElement='h4'
									appearance={contentType === 'collection' ? 'secondary' : 'primary'}
									genres={item.genre_ids}
									showRating
									rating={item.vote_average * 10}
									releaseDate={getLocalizedDate(item.first_air_date, lang)}
									titleLevel={5}
									sizes='(min-width: 1230px) 286px, (min-width: 1024px) 25vw, (min-width: 650px) 33.3vw, (min-width: 480px) 50vw, 320px'
								/>
							);
						}
					})}
				</div>
			)}

			{error && (
				<Banner
					closeButton={false}
					title={dictionary.errorTitle}
					appearance='danger'
				>
					{dictionary.errorText}
				</Banner>
			)}

			{!error && page < initialData.total_pages && (
				<Button
					className='mt-5 text-200 md:text-[1.125rem] max-w-[300px] md:max-w-[25rem] w-full justify-center self-center'
					isLoading={loading}
					onClick={clickHandler}
				>
					{dictionary.loadMoreButton}
				</Button>
			)}
		</div>
	);
};