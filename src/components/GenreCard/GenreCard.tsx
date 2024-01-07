'use client';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import Title from '@/components/Title/Title';
import { GeneralProps, Genres, HeadingElement } from '@/types/shared';

const iconsPathsByGenre = {
	adventure: 'adventure.svg#adventure',
	romance: 'romance.svg#romance',
	history: 'history.svg#history',
	music: 'music.svg#music',
	war: 'war.svg#war',
	thriller: 'thriller.svg#thriller',
	animation: 'animation.svg#animation',
	crime: 'crime.svg#crime',
	documentary: 'documentary.svg#documentary',
	drama: 'drama.svg#drama',
	family: 'family.svg#family',
	fantasy: 'fantasy.svg#fantasy',
	horror: 'horror.svg#horror',
	mystery: 'mystery.svg#mystery',
	'tv movie': 'tv.svg#tv',
	western: 'western.svg#western',
	action: 'action.svg#action',
	comedy: 'comedy.svg#comedy',
	'war & politics': 'politics.svg#politics',
	talk: 'talk.svg#talk',
	soap: 'series.svg#series',
	news: 'news.svg#news',
	reality: 'reality.svg#reality',
	kids: 'kids.svg#kids',
	'science fiction': 'science_fiction.svg#science_fiction',
	'action & adventure': 'action_adventure.svg#action_adventure',
	'sci-fi & fantasy': 'sci-fi_fantasy.svg#sci-fi_fantasy',
} as const;

export type Props = {
	href: string,
	genre: Genres,
	title: string,
	titleElement: HeadingElement,
	onClick?: MouseEventHandler<HTMLAnchorElement>,
} & GeneralProps;

export default function GenreCard({
	href,
	className,
	genre,
	title,
	titleElement,
	onClick,
	testId,
	...props
}: Props) {
	const classes = [
		'px-2 py-4 rounded-2 h-[6.75rem] w-[9.75rem] bg-neutral-300 dark:bg-dark-neutral-300 [&]:text-neutral-1000 dark:[&]:text-dark-neutral-900 flex flex-col items-center justify-center relative after:absolute after:top-0 after:left-0 after:z-100 after:w-full after:h-full transition-colors duration-150 hover:bg-neutral-400 active:bg-neutral-500 dark:hover:bg-dark-neutral-400 dark:active:bg-dark-neutral-500',
		className,
	].join(' ');

	return (
		<Link
			className={classes}
			href={href}
			onClick={onClick}
			data-testid={testId}
			{...props}
		>
			<svg className='w-8 h-8 mb-2 fill-current' viewBox='0 0 32 32'>
				<use href={`/assets/icons/${iconsPathsByGenre[genre]}`}></use>
			</svg>
			<Title
				level={6}
				weight={700}
				as={titleElement}
				className='leading-2 text-center w-full line-clamp-2'
			>
				{title}
			</Title>
		</Link>
	);
};
