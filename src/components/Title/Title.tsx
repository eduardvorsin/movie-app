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
	1: 'text-700 leading-6 text-dark-neutral-0 dark:text-neutral-0 font-bold',
	2: 'text-600 leading-5 text-dark-neutral-0 dark:text-neutral-0 font-semibold',
	3: 'text-500 leading-4 text-dark-neutral-0 dark:text-neutral-0 font-semibold',
	4: 'text-400 leading-3 text-dark-neutral-0 dark:text-neutral-0 font-semibold',
	5: 'text-300 leading-2 text-dark-neutral-0 dark:text-neutral-0 font-semibold',
	6: 'text-200 leading-1 text-dark-neutral-0 dark:text-neutral-0 font-semibold',
} as const;

export default function Title({
	level,
	children,
	className,
	as = 'h6',
}: Props) {
	const classes = [
		'text-200 -tracking-[0.01em]',
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