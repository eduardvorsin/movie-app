'use client';

import Title from '../Title/Title';
import Link from 'next/link';
import { HeadingElement, HeadingLevel } from '@/types/shared';
import ThemedImage from '../ThemedImage/ThemedImage';
import { getGenreById } from '@/helpers/getGenreById/getGenreById';
import { isArrayOfNumbers } from '@/helpers/isArrayOfNumbers/isArrayOfNumbers';
import { Locales, fallbackLng } from '@/i18n/settings';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/i18n/client';

type Props = {
	movieId: number,
	className?: string,
	src: string,
	alt: string,
	releaseDate?: string,
	runtime?: string,
	country?: string,
	title?: string,
	showRating?: boolean,
	rating?: number,
	genres?: string | number | string[] | number[],
	titleElement?: HeadingElement,
	titleLevel?: HeadingLevel,
	testId?: string,
};

export default function MovieCard({
	movieId,
	className,
	src,
	alt,
	releaseDate,
	runtime,
	country,
	title,
	showRating,
	rating,
	genres,
	titleElement = 'h6',
	titleLevel = 6,
	testId,
}: Props) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);

	let allGenres: string[] | string = [];
	if (typeof genres === 'number') {
		allGenres = [getGenreById(genres) ?? ''];
	} else if (typeof genres === 'string') {
		allGenres = [genres];
	} else if (Array.isArray(genres) && isArrayOfNumbers(genres)) {
		allGenres = genres.map((genreId) => getGenreById(genreId) ?? '');
	} else if (genres === undefined) {
		allGenres = [];
	} else {
		allGenres = [...genres];
	}
	allGenres = allGenres.filter((genre) => genre.length > 0);

	if (allGenres.length !== 0) {
		allGenres = allGenres
			.map((genre) => t(`genres.${genre}`).toLowerCase())
			.join(', ');
	}

	return (
		<div
			className={`flex flex-col relative max-w-[342px] min-w-[280px] ${className} `}
			data-testid={testId}
		>
			<Link
				href={`/movies/${movieId}`}
				className='block relative'
				title={title}
			>
				<ThemedImage
					className='rounded-3 w-full'
					alt={alt}
					width={300}
					height={169}
					src={{
						light: src,
						dark: src,
					}}
					fallback={{
						light: '/assets/images/movie-card-placeholder-l-h.svg',
						dark: '/assets/images/movie-card-placeholder-d-h.svg'
					}}
				/>
				{showRating && rating !== undefined && (
					<span className='absolute top-0 left-0 w-10 h-10 overflow-hidden flex items-center justify-center rounded-1 border-2 border-blue-700 dark:border-blue-400 bg-neutral-200 dark:bg-dark-neutral-300 text-blue-700 dark:text-blue-300 font-bold'>
						<span className='sr-only'>{t('movieCard.popularity')}: </span>
						{Math.trunc(rating)}
					</span>
				)}
			</Link>

			<div className='absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-neutral-100/95 to-neutral-100/40 dark:from-dark-neutral-100/95 dark:to-dark-neutral-100/40'>
				{title && (
					<Title
						className='mb-1'
						level={titleLevel}
						as={titleElement}
					>
						<Link
							className='break-words line-clamp-1 text-neutral-1000 dark:text-dark-neutral-1100 hover:text-neutral-800 active:text-neutral-700 dark:hover:text-dark-neutral-900 dark:active:text-dark-neutral-800 transition-colors duration-150'
							href={`/movies/${movieId}`}
							title={title}
						>
							{title}
						</Link>
					</Title>
				)}
				{allGenres.length > 0 && (
					<p
						className='text-100 text-neutral-1000 dark:text-dark-neutral-1000 font-medium truncate'
					>
						{t('movieCard.genres')}:
						<span
							className='ml-1 text-neutral-900 dark:text-dark-neutral-900 font-regular'
						>
							{allGenres}
						</span>
					</p>
				)}
				{releaseDate && (
					<p
						className='text-100 text-neutral-1000 dark:text-dark-neutral-1000 font-medium truncate'
					>
						{t('movieCard.releaseDate')}:
						<span
							className='ml-1 text-neutral-900 dark:text-dark-neutral-900 font-regular'
						>
							{releaseDate}
						</span>
					</p>
				)}
				{country && (
					<p
						className='text-100 text-neutral-1000 dark:text-dark-neutral-1000 font-medium truncate'
					>
						{t('movieCard.productionCountry')}:
						<span
							className='ml-1 text-neutral-900 dark:text-dark-neutral-900 font-regular'
						>
						</span>
						{country}
					</p>
				)}
				{runtime && (
					<p
						className='text-100 text-neutral-1000 dark:text-dark-neutral-1000 font-medium truncate'
					>
						{t('movieCard.duration')}:
						<span
							className='ml-1 text-neutral-900 dark:text-dark-neutral-900 font-regular'
						>
						</span>
						{runtime}
					</p>
				)}
			</div>
		</div>
	);
};