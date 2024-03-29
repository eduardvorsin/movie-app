'use client';

import Title from '../Title/Title';
import Link from 'next/link';
import { GeneralProps, HeadingElement, HeadingLevel } from '@/types/shared';
import ThemedImage from '../ThemedImage/ThemedImage';
import { getGenreById } from '@/helpers/getGenreById/getGenreById';
import { isArrayOfNumbers } from '@/helpers/isArrayOfNumbers/isArrayOfNumbers';
import { Locales, fallbackLng } from '@/i18n/settings';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/i18n/client';
import { routes } from '@/constants';
import { MouseEventHandler } from 'react';

export type Props = {
	movieId: number,
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
	variant?: 'vertical' | 'horizontal',
	mediaType: 'movie' | 'tv',
	appearance?: 'primary' | 'secondary',
	loading?: 'eager' | 'lazy',
	sizes?: string,
	onClick?: MouseEventHandler<HTMLAnchorElement>,
} & GeneralProps;

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
	variant = 'horizontal',
	testId,
	mediaType,
	appearance = 'primary',
	loading,
	sizes,
	onClick,
	...props
}: Props) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);

	let allGenres: string[] | string = [];
	if (typeof genres === 'number') {
		allGenres = [getGenreById(genres)];
	} else if (typeof genres === 'string') {
		allGenres = [genres];
	} else if (Array.isArray(genres) && isArrayOfNumbers(genres)) {
		allGenres = genres.map((genreId) => getGenreById(genreId));
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

	const details = [
		{ name: 'genres', value: allGenres },
		{ name: 'releaseDate', value: releaseDate, },
		{ name: 'duration', value: runtime, },
		{ name: 'country', value: country },
	].filter((detail) => detail.value !== undefined && detail.value.length > 0);

	const url = `${mediaType === 'movie' ? routes.movies : routes.tv}${movieId}`;

	const cardClasses = [
		'flex flex-col relative',
		appearance === 'secondary' ? '' : 'overflow-hidden',
		className
	].join(' ');

	const contentClasses = [
		'absolute left-0 w-full flex flex-col p-2 bg-gradient-to-t z-100 duration-150',
		appearance === 'secondary' ? 'sr-only' : '',
		variant === 'horizontal' ? 'bottom-0 from-neutral-100/95 to-neutral-100/50 dark:from-dark-neutral-100/95 dark:to-dark-neutral-100/40' : 'invisible opacity-0 fine-pointer:group-hover:visible fine-pointer:group-hover:opacity-100 top-0 pt-[3.125rem] justify-end h-full bg-neutral-100/80 dark:bg-dark-neutral-100/80 transition-[visibility,opacity]'
	].join(' ');

	const titleClasses = [
		'[&]:text-200 leading-[1.25]',
		variant === 'vertical' ? 'mt-2' : 'mb-1 sm:text-[1.125rem]',
	].join(' ');

	const imageClasses = [
		'h-full overflow-hidden bg-neutral-200 dark:bg-dark-neutral-300 object-cover rounded-3 transition-colors duration-150',
	].join(' ');

	const ratingClasses = [
		'absolute z-200 top-0 left-0 w-10 h-10 overflow-hidden flex items-center justify-center rounded-1 border-2 border-blue-700 dark:border-blue-400 bg-neutral-200 dark:bg-dark-neutral-300 text-blue-700 dark:text-blue-300 font-bold transition-colors duration-150 transition-colors duration-150'
	].join(' ');

	const CardTitle = (
		<Title
			className={titleClasses}
			level={titleLevel}
			as={titleElement}
		>
			<Link
				onClick={onClick}
				className={`break-all [&]:text-neutral-1000 dark:[&]:text-dark-neutral-1100 hover:[&]:text-neutral-800 active:[&]:text-neutral-700 dark:hover:[&]:text-dark-neutral-900 dark:active:[&]:text-dark-neutral-800 transition-colors duration-150 ${(variant === 'horizontal' && appearance === 'primary') ? 'line-clamp-1' : 'line-clamp-2'}`}
				href={url}
				title={title}
			>
				{title}
			</Link>
		</Title>
	);

	const CardContent = (
		<div className={contentClasses}>
			{title && variant === 'horizontal' && (CardTitle)}

			{details.map((detail) => (
				<p
					key={detail.name}
					className={`text-100 leading-[1.25] text-neutral-1000 dark:text-dark-neutral-1000 font-medium break-words transition-colors duration-150 ${variant === 'vertical' ? 'line-clamp-2 mb-1 last:mb-0' : 'truncate'}`}
				>
					{t(`movieCard.${detail.name}`)}:
					<span
						className={'ml-1 text-neutral-900 dark:text-dark-neutral-900 font-regular transition-colors duration-150'}
					>
						{detail.value}
					</span>
				</p>
			))}
		</div>
	);

	const CardImage = (
		<ThemedImage
			showSkeleton
			className={imageClasses}
			alt={alt}
			quality={75}
			src={src}
			fallback={{
				light: `/assets/images/movie-card-placeholder-l-${variant === 'horizontal' ? 'h' : 'v'}.svg`,
				dark: `/assets/images/movie-card-placeholder-d-${variant === 'horizontal' ? 'h' : 'v'}.svg`
			}}
			loading={loading}
			sizes={sizes}
			style={{ objectFit: 'cover' }}
		/>
	);

	if (appearance === 'primary') {
		return (
			<div
				className={cardClasses}
				data-testid={testId}
				{...props}
			>
				<Link
					onClick={onClick}
					href={url}
					className={`block relative group ${variant === 'vertical' ? 'aspect-[5/7]' : 'aspect-[16/9]'}`}
					title={title}
				>
					{CardImage}

					{showRating && rating !== undefined && (
						<span
							className={ratingClasses}
							aria-label={t('movieCard.rating')}
						>
							{Math.trunc(rating)}
						</span>
					)}

					{variant === 'vertical' && (CardContent)}
				</Link>

				{title && variant === 'vertical' && (CardTitle)}

				{variant === 'horizontal' && (CardContent)}
			</div>
		);
	} else {
		return (
			<div
				className={cardClasses}
				data-testid={testId}
				{...props}
			>
				<Link
					onClick={onClick}
					href={url}
					className={`block relative group ${variant === 'vertical' ? 'aspect-[5/7]' : 'aspect-[16/9]'} mb-2 transition-transform duration-150 scale-100 hover:scale-[1.025]`}
					title={title}
				>
					{CardImage}

					{showRating && rating !== undefined && (
						<span
							className={ratingClasses}
							aria-label={t('movieCard.rating')}
						>
							{Math.trunc(rating)}
						</span>
					)}
				</Link>

				{title && (CardTitle)}
			</div>
		);
	}
};