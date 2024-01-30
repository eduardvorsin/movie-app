import { MouseEventHandler, ReactNode } from 'react';
import Title from '@/components/Title/Title';
import Link from 'next/link';
import { GeneralProps, HeadingElement, HeadingLevel } from '@/types/shared';
import ThemedImage from '../ThemedImage/ThemedImage';
import { routes } from '@/constants';

type Props = {
	personId: number,
	appearance?: 'primary' | 'secondary',
	title?: string,
	titleElement?: HeadingElement,
	titleLevel?: HeadingLevel,
	src: string,
	alt: string,
	showRating?: boolean,
	rating?: number,
	children?: ReactNode,
	onClick?: MouseEventHandler<HTMLAnchorElement>,
	loading?: 'eager' | 'lazy',
	dictionary: {
		rating: string,
	},
} & GeneralProps;

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
	loading,
	appearance = 'primary',
	dictionary,
	...props
}: Props) {
	const cardClasses = [
		'flex flex-col group/card w-full',
		appearance === 'primary' ? 'max-w-[9.625rem] min-w-[7.5rem]' : 'max-w-[11.4375rem] min-w-[8.125rem]',
		className,
	].join(' ');

	const imageClasses = [
		'h-full overflow-hidden bg-neutral-300 dark:bg-dark-neutral-250 transition-colors duration-150',
		appearance === 'primary' ? 'rounded-[50%] ' : '',
	].join(' ');

	const ratingClasses = [
		'z-200 absolute bottom-0 left-0 w-10 h-10 overflow-hidden flex items-center justify-center border-2 border-blue-700 dark:border-blue-400 bg-neutral-200 dark:bg-dark-neutral-300 text-blue-700 dark:text-blue-300 font-bold transition-colors duration-150',
		appearance === 'primary' ? 'rounded-[50%]' : '',
	].join(' ');

	const contentClasses = [
		'break-word text-100 text-neutral-900 dark:text-dark-neutral-800 transition-colors duration-150',
		appearance === 'primary' ? 'truncate' : 'line-clamp-2'
	].join(' ');

	return (
		<Link
			className={cardClasses}
			href={`${routes.persons}${personId}`}
			onClick={onClick}
			title={title}
			data-testid={testId}
			{...props}
		>
			<div className='w-full aspect-square relative self-center mb-3'>
				<ThemedImage
					className={imageClasses}
					showSkeleton
					quality={85}
					sizes='154px'
					alt={alt}
					src={src}
					fallback={{
						light: '/assets/images/person-placeholder-l.svg',
						dark: '/assets/images/person-placeholder-d.svg'
					}}
					loading={loading}
					style={{ objectFit: 'cover' }}
				/>

				{showRating && (
					<span className={ratingClasses}>
						<span className='sr-only'>{dictionary.rating}</span>
						{Math.trunc(rating ?? 0)}
					</span>
				)}
			</div>

			{title && (
				<Title
					className='mb-1 line-clamp-2 text-neutral-1000 dark:text-dark-neutral-900 group-hover/card:text-neutral-800 group-active/card:text-neutral-700 dark:group-hover/card:text-dark-neutral-700 dark:group-active/card:text-dark-neutral-600'
					as={titleElement}
					level={titleLevel}
				>
					{title}
				</Title>
			)}

			{children && (<p className={contentClasses}>{children}</p>)}
		</Link>
	);
}