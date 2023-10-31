'use client';
import Link from 'next/link';
import { Adventure, Romance, Fantastic, History, Music, Military, Thriller, Animation, Crime, Documentary, Drama, Family, Fantasy, Horror, Mystery, TVMovie, Western, Action, Comedy } from './GenreIcons';
import { MouseEventHandler } from 'react';
import Title from '@/components/Title/Title';

export type Genres = 'adventure' | 'romance' | 'fantastic' | 'history' | 'music' | 'war' | 'thriller' | 'animation' | 'crime' | 'documentary' | 'drama' | 'family' | 'fantasy' | 'horror' | 'mystery' | 'tv movie' | 'western' | 'action' | 'comedy';

export type Props = {
	href: string,
	genre: Genres,
	title: string,
	titleElement: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
	onClick?: MouseEventHandler<HTMLAnchorElement>,
	className?: string,
	testId?: string,
};

const iconsByGenre = {
	adventure: {
		name: 'adventure',
		src: Adventure.src,
	},
	romance: {
		name: 'hearts',
		src: Romance.src,
	},
	fantastic: {
		name: 'ufo',
		src: Fantastic.src,
	},
	history: {
		name: 'history',
		src: History.src,
	},
	music: {
		name: 'music',
		src: Music.src,
	},
	war: {
		name: 'military',
		src: Military.src,
	},
	thriller: {
		name: 'thriller',
		src: Thriller.src,
	},
	animation: {
		name: 'kid',
		src: Animation.src,
	},
	crime: {
		name: 'crime',
		src: Crime.src,
	},
	documentary: {
		name: 'documentary',
		src: Documentary.src,
	},
	drama: {
		name: 'drama',
		src: Drama.src,
	},
	family: {
		name: 'family',
		src: Family.src,
	},
	fantasy: {
		name: 'fantasy',
		src: Fantasy.src,
	},
	horror: {
		name: 'horror',
		src: Horror.src,
	},
	mystery: {
		name: 'mystery',
		src: Mystery.src,
	},
	'tv movie': {
		name: 'tv',
		src: TVMovie.src,
	},
	western: {
		name: 'western',
		src: Western.src,
	},
	action: {
		name: 'action',
		src: Action.src,
	},
	comedy: {
		name: 'comedy',
		src: Comedy.src,
	},
} as const;

export default function GenreCard({
	href,
	className,
	genre,
	title,
	titleElement,
	onClick,
	testId,
}: Props) {
	const classes = [
		'px-2 py-6 rounded-2 h-[6.75rem] w-[9.75rem] bg-neutral-200 dark:bg-dark-neutral-300 text-neutral-1000 dark:text-dark-neutral-900 flex flex-col items-center relative after:absolute after:top-0 after:left-0 after:z-100 after:w-full after:h-full transition-colors duration-150 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-dark-neutral-400 dark:active:bg-dark-neutral-500 ',
		className,
	].join(' ');

	return (
		<Link
			className={classes}
			href={href}
			onClick={onClick}
			data-testid={testId}
		>
			<svg className='w-8 h-8 mb-2 fill-current' viewBox='0 0 32 32'>
				<use href={`${iconsByGenre[genre].src}#${iconsByGenre[genre].name}`}></use>
			</svg>
			<Title
				level={6}
				weight={700}
				as={titleElement}
				className='leading-2 text-center w-full truncate'
			>
				{title}
			</Title>
		</Link>
	);
};