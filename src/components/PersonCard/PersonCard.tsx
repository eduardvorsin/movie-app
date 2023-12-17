'use client';
import { MouseEventHandler, ReactNode } from 'react';
import Title from '@/components/Title/Title';
import Link from 'next/link';
import { HeadingElement, HeadingLevel } from '@/types/shared';
import { useParams } from 'next/navigation';
import { Locales, fallbackLng } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';
import ThemedImage from '../ThemedImage/ThemedImage';
import { routes } from 'src/constants';

type Props = {
	personId: number,
	className?: string,
	testId?: string,
	title?: string,
	titleElement?: HeadingElement,
	titleLevel?: HeadingLevel,
	src: string,
	alt: string,
	showRating?: boolean,
	rating?: number,
	children?: ReactNode,
	onClick?: MouseEventHandler<HTMLAnchorElement>,
};

export default function PersonCard({
	personId,
	className,
	testId,
	title,
	titleElement = 'h6',
	titleLevel = 4,
	src,
	alt,
	showRating,
	rating,
	children,
	onClick,
}: Props) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);

	return (
		<Link
			className={`flex flex-col max-w-[10.625rem] group/card ${className}`}
			href={`${routes.persons}${personId}`}
			onClick={onClick}
			title={title}
			data-testid={testId}
		>
			<div className='w-[9.625rem] h-[9.625rem] relative self-center mb-3'>
				<ThemedImage
					className='rounded-[50%] object-cover w-full h-full'
					width={154}
					height={154}
					alt={alt}
					src={{
						light: src,
						dark: src,
					}}
					fallback={{
						light: '/assets/images/person-card-placeholder-l.svg',
						dark: '/assets/images/person-card-placeholder-d.svg'
					}}
				/>
				{showRating && (
					<span className='absolute bottom-0 left-0 w-10 h-10 overflow-hidden flex items-center justify-center rounded-[50%] border-2 border-blue-700 dark:border-blue-400 bg-neutral-200 dark:bg-dark-neutral-300 text-blue-700 dark:text-blue-300 font-bold'>
						<span className='sr-only'>{t('personCard.rating')}</span>
						{Math.trunc(rating ?? 0)}
					</span>
				)}
			</div>
			{title && (
				<Title
					className='mb-1 line-clamp-2 text-neutral-1000 dark:text-dark-neutral-900 group-hover/card:text-neutral-800 group-active/card:text-neutral-700 dark:group-hover/card:text-dark-neutral-700 dark:group-active/card:text-dark-neutral-600 transition-colors duration-150'
					as={titleElement}
					level={titleLevel}
				>
					{title}
				</Title>
			)}
			{children && (
				<p
					className='text-100 text-neutral-900 dark:text-dark-neutral-800 line-clamp-3'
				>
					{children}
				</p>
			)}
		</Link>
	);
}