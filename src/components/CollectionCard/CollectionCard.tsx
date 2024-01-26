import { GeneralProps } from '@/types/shared';
import ThemedImage from '../ThemedImage/ThemedImage';
import Title from '../Title/Title';
import Link from 'next/link';

type Props = {
	title: string,
	src: string,
	alt: string,
	href: string,
	sizes?: string,
	priority?: boolean,
} & GeneralProps;

export default function CollectionCard({
	className,
	title,
	src,
	href,
	sizes,
	testId,
	priority,
	alt,
}: Props) {
	const classes = [
		'rounded-3 overflow-hidden p-5 min-h-[108px] min-w-[192px] aspect-video flex flex-col justify-end relative after:absolute after:top-0 after:left-0 after:z-0 after:w-full after:h-full after:bg-neutral-300/60 dark:after:bg-dark-neutral-250/40 after:transition-colors after:duration-150',
		className
	].join(' ');

	return (
		<div
			className={classes}
			data-testid={testId}
		>
			<ThemedImage
				className='[&]:absolute top-0 left-0 w-full h-full -z-100 bg-neutral-200 dark:bg-dark-neutral-300 transition-colors duration-150'
				alt={alt}
				showSkeleton
				priority={priority}
				sizes={sizes}
				src={src}
			/>

			<Title
				className='text-neutral-1100 dark:text-dark-neutral-1000 z-100 leading-2 w-full [&]:text-400 xs:[&]:text-300'
				level={4}
				weight={500}
				as='h3'
			>
				<Link
					className='break-all line-clamp-2 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-100'
					href={href}
				>
					{title}
				</Link>
			</Title>
		</div>
	);
}