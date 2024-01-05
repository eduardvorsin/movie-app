import ThemedImage from "@/components/ThemedImage/ThemedImage";
import Title from "@/components/Title/Title";
import { GeneralProps } from "@/types/shared";
import Link from "next/link";
import { ReactNode } from "react";
import { routes } from "src/constants";

type Props = {
	id: number,
	title: string,
	src: string,
	children: ReactNode,
	element: 'div' | 'li',
	isOrdered?: boolean,
	loading?: 'eager' | 'lazy',
} & GeneralProps;

export default function RatingItem({
	id,
	title,
	src,
	children,
	testId,
	className,
	element,
	isOrdered = true,
	loading,
	...props
}: Props) {
	const classes = [
		'flex items-center gap-4 relative py-2 lg:p-3 [&:nth-child(-n+9)]:border-b-1 [&:nth-child(-n+9)]:border-neutral-300 dark:[&:nth-child(-n+9)]:border-dark-neutral-350 sm:[&:nth-last-child(2)]:border-none transition-colors duration-150 hover:bg-neutral-100 active:bg-neutral-0 dark:hover:bg-dark-neutral-200 dark:active:bg-dark-neutral-250',
		isOrdered ? 'md:[counter-increment:list-item_1] before:hidden md:before:inline-block before:content-[counter(list-item,decimal-leading-zero)] before:text-500 lg:before:text-700 before:font-bold before:text-neutral-1000 dark:before:text-dark-neutral-900 before:leading-none' : '',
		className
	].join(' ');

	const Component = element;

	return (
		<Component
			key={id}
			className={classes}
			data-testid={testId}
			{...props}
		>
			<Link
				className='grow flex items-center gap-3 before:absolute before:w-full before:h-full before:top-0 before:left-0'
				href={`${routes.movies}${id}`}
				title={title}
			>
				<ThemedImage
					className='w-[50px] h-[75px] lg:w-[60px] lg:h-[90px] aspect-[2/3]'
					width={60}
					height={90}
					alt={title}
					src={{
						light: src,
						dark: src,
					}}
					fallback={{
						light: '/assets/images/movie-placeholder-l-v.svg',
						dark: '/assets/images/movie-placeholder-d-v.svg',
					}}
					sizes='60px'
					loading={loading}
				/>

				<Title
					className='text-neutral-1000 dark:text-dark-neutral-900 grow [&]:text-200 md:[&]:text-[1.125rem] line-clamp-3'
					level={5}
					as='h3'
				>
					{title}
				</Title>

				{children}
			</Link>
		</Component>
	);
}