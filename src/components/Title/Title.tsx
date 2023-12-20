import { GeneralProps, HeadingElement, HeadingLevel } from '@/types/shared';
import React from 'react';
import { twMerge } from '../../../tailwind.config';

export type Props = {
	children: React.ReactNode,
	level: HeadingLevel,
	as?: HeadingElement,
	weight?: 400 | 500 | 600 | 700,
	testId?: string,
} & GeneralProps;

const levelTypes = {
	1: 'text-400 sm:text-500 md:text-600 lg:text-700',
	2: 'text-400 sm:text-500 md:text-600',
	3: 'text-400 sm:text-500',
	4: 'text-300 sm:text-400',
	5: 'text-300',
	6: 'text-200',
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
	testId,
	weight = 700,
	as = 'h6',
	...props
}: Props) {
	const classes = twMerge(
		'leading-[1.25] -tracking-[0.01em]',
		levelTypes[level],
		fontWeights[weight],
		className,
	);

	const Heading: HeadingElement = as;

	return (
		<Heading
			data-testid={testId}
			className={classes}
			{...props}
		>
			{children}
		</Heading>
	);
}