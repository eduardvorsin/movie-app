import React from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type Props = {
	children: React.ReactNode,
	level: HeadingLevel,
	as?: Headings,
	className?: string,
	testId?: string,
}

const levelTypes = {
	1: 'text-700 leading-6 font-bold',
	2: 'text-600 leading-5 font-semibold',
	3: 'text-500 leading-4 font-semibold',
	4: 'text-400 leading-3 font-semibold',
	5: 'text-300 leading-2 font-semibold',
	6: 'text-200 leading-1 font-semibold',
} as const;

export default function Title({
	level,
	children,
	className,
	as = 'h6',
}: Props) {
	const classes = [
		'text-200 text-dark-neutral-0 dark:text-neutral-0 -tracking-[0.01em]',
		levelTypes[level],
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