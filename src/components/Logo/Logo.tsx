'use client';

import Link from 'next/link';
import ThemedImage from '../ThemedImage/ThemedImage';
import { MouseEventHandler } from 'react';
import { routes } from 'src/constants';
import { GeneralProps } from '@/types/shared';

const sizes = {
	small: {
		width: 47,
		height: 24,
	},
	medium: {
		width: 62,
		height: 32,
	},
	large: {
		width: 110,
		height: 56,
	},
} as const;

export type Props = {
	onClick?: MouseEventHandler<HTMLAnchorElement>,
	size: 'small' | 'medium' | 'large',
	dictionary: Record<'altText' | 'linkText', string>,
} & GeneralProps;

export default function Logo({
	size = 'medium',
	className,
	testId,
	onClick,
	dictionary,
	...props
}: Props) {
	return (
		<Link
			className={`inline-flex ${className}`}
			href={routes.home}
			data-testid={testId}
			onClick={onClick}
			{...props}
		>
			<ThemedImage
				width={sizes[size].width}
				height={sizes[size].height}
				alt={dictionary.altText}
				src={'/assets/images/logo.svg'}
			/>
			<span className='sr-only'>
				{dictionary.linkText}
			</span>
		</Link>
	);
};