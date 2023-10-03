import React from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type Props = {
	children: React.ReactNode,
	level: HeadingLevel,
	as?: Headings,
	className?: string,
	weight?: 400 | 500 | 600 | 700,
	testId?: string,
}

const levelTypes = {
	1: 'text-400 sm:text-500 md:text-600 lg:text-700 leading-6',
	2: 'text-400 sm:text-500 md:text-600 leading-5',
	3: 'text-400 sm:text-500 leading-4',
	4: 'text-400 leading-3',
	5: 'text-300 leading-2',
	6: 'text-200 leading-1',
} as const;

const fontWeights = {
	400: 'font-regular',
	500: 'font-medium',
	600: 'font-semibold',
	700: 'font-bold',
} as const;

export default function Title({
	level,
	children,
	className,
	weight = 700,
	as = 'h6',
}: Props) {
	const classes = [
		'-tracking-[0.01em]',
		levelTypes[level],
		fontWeights[weight],
		className,
	].join(' ');

	const Heading: Headings = as;

	return (
		<Heading
			className={classes}
		>
			{children}
		</Heading>
	);
}