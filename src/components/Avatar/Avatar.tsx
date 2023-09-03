'use client';

import Image from 'next/image';
import { MouseEventHandler } from 'react';

export type Props = {
	className?: string,
	appearance?: 'circle' | 'square',
	isDisabled?: boolean,
	name: string,
	onClick?: MouseEventHandler<HTMLElement>,
	size?: 'small' | 'xsmall' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'custom',
	initials?: string,
	src?: string,
	testId?: string,
	presence?: 'offline' | 'online',
	status?: 'approved' | 'declined' | 'locked',
};

const statusIcons = {
	approved: (
		<svg
			className='fill-green-400 dark:fill-green-300'
			viewBox="0 0 20 20"
		>
			<path
				fillRule="evenodd"
				d="M15.78 5.97a.75.75 0 0 1 0 1.06l-6.5 6.5a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 1 1 1.06-1.06l2.72 2.72 5.97-5.97a.75.75 0 0 1 1.06 0Z"
			/>
		</svg>
	),
	declined: (
		<svg
			className='fill-red-400 dark:fill-red-500'
			viewBox='0 0 20 20'
		>
			<path d='M13.97 15.03a.75.75 0 1 0 1.06-1.06l-3.97-3.97 3.97-3.97a.75.75 0 0 0-1.06-1.06l-3.97 3.97-3.97-3.97a.75.75 0 0 0-1.06 1.06l3.97 3.97-3.97 3.97a.75.75 0 1 0 1.06 1.06l3.97-3.97 3.97 3.97Z' />
		</svg>
	),
	locked: (
		<svg
			className='fill-neutral-0 dark:fill-dark-neutral-0'
			viewBox='0 0 20 20'
		>
			<path
				fillRule='evenodd'
				d='M6.25 6.75v.345a3.001 3.001 0 0 0-2.25 2.905v4a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-4a3.001 3.001 0 0 0-2.25-2.905v-.345a3.75 3.75 0 1 0-7.5 0Zm3.75-2.25a2.25 2.25 0 0 0-2.25 2.25v.25h4.5v-.25a2.25 2.25 0 0 0-2.25-2.25Zm1.5 7.25a1.5 1.5 0 0 1-.75 1.3v.45a.75.75 0 0 1-1.5 0v-.45a1.5 1.5 0 1 1 2.25-1.3Z'
			/>
		</svg>
	),
} as const;

const presencePositions = {
	square: {
		xsmall: 'after:-bottom-[10%] after:-right-[10%]',
		small: 'after:-bottom-[11%] after:-right-[11%]',
		medium: 'after:-bottom-[9%] after:-right-[9%]',
		large: 'after:-bottom-[10%] after:-right-[10%]',
		xlarge: 'after:-bottom-[4%] after:-right-[4%]',
		xxlarge: 'after:-bottom-[2%] after:-right-[2%]',
		custom: '',
	},
	circle: {
		xsmall: 'after:-bottom-[12%] after:-right-[12%]',
		small: 'after:-bottom-[10%] after:-right-[10%]',
		medium: 'after:-bottom-[8%] after:-right-[8%]',
		large: 'after:-bottom-[4%] after:-right-[4%]',
		xlarge: 'after:bottom-[2%] after:right-[2%]',
		xxlarge: 'after:bottom-[4%] after:right-[4%]',
		custom: '',
	}
} as const;

const statusPositions = {
	square: {
		xsmall: '',
		small: '',
		medium: '-top-[4%] -right-[4%]',
		large: '-top-[6%] -right-[6%]',
		xlarge: '-top-[2%] -right-[2%]',
		xxlarge: '-top-[1%] -right-[1%]',
		custom: '',
	},
	circle: {
		xsmall: '',
		small: '',
		medium: '-top-[6%] -right-[6%]',
		large: '-top-[4%] -right-[4%]',
		xlarge: 'top-[4%] right-[4%]',
		xxlarge: 'top-[6%] right-[6%]',
		custom: '',
	}
} as const;

const sizeTypes = {
	xsmall: 'w-4 h-4 text-[0.5rem] border-[0.0625rem] after:w-[0.375rem] after:h-[0.375rem] after:border-[0.0625rem]',
	small: 'w-6 h-6 text-75 border-[0.09375rem] after:w-[0.625rem] after:h-[0.625rem] after:border-[0.09375rem]',
	medium: 'w-8 h-8 text-200 border-[0.09375rem] after:w-[0.75rem] after:h-[0.75rem] after:border-2',
	large: 'w-10 h-10 text-300 border-2 after:w-[0.9375rem] after:h-[0.9375rem] after:border-2',
	xlarge: 'w-24 h-24 text-[3rem] border-2 after:w-[1.125rem] after:h-[1.125rem] after:border-2',
	xxlarge: 'w-32 h-32 text-[4rem] border-2 after:w-[1.25rem] after:h-[1.25rem] after:border-2',
	custom: '',
} as const;

const statusSizesTypes = {
	xsmall: 'w-0 h-0',
	small: 'w-0 h-0',
	medium: 'w-[0.75rem] h-[0.75rem]',
	large: 'w-[0.9375rem] h-[0.9375rem]',
	xlarge: 'w-[1.125rem] h-[1.125rem]',
	xxlarge: 'w-[1.25rem] h-[1.25rem]',
	custom: '',
} as const;

const borderRadiusTypes = {
	xsmall: 'rounded-0.5',
	small: 'rounded-0.5',
	medium: 'rounded-[0.1875rem]',
	large: 'rounded-[0.1875rem]',
	xlarge: 'rounded-[0.375rem]',
	xxlarge: 'rounded-3',
	custom: '',
} as const;

export default function Avatar({
	className,
	appearance = 'circle',
	isDisabled,
	name,
	onClick,
	presence,
	size = 'medium',
	initials,
	src,
	status,
	testId,
}: Props) {
	const classes = [
		'flex items-center font-regular justify-center relative text-neutral-0 after:absolute after:border-light-100 dark:text-dark-neutral-0 dark:after:border-dark-neutral-250 dark:border-dark-neutral-250 after:rounded-full',
		appearance === 'circle' ? 'rounded-full' : borderRadiusTypes[size],
		sizeTypes[size],
		presencePositions[appearance][size],
		isDisabled ? 'opacity-disabled cursor-not-allowed' : '',
		!src ? 'bg-neutral-700 dark:bg-dark-neutral-700 border-neutral-700' : 'bg-transparent border-transparent',
		!presence ? 'after:hidden' : '',
		presence === 'online' ? 'after:bg-green-600 dark:after:bg-green-500' : 'after:bg-red-600 dark:after:bg-red-500',
		className,
	].join(' ');

	const imageClasses = [
		appearance === 'circle' ? 'rounded-full' : borderRadiusTypes[size],
	].join(' ');

	const statusWrapperClasses = [
		'w-5 h-5 absolute z-100',
		appearance === 'circle' ? 'bg-neutral-700 dark:bg-dark-neutral-700 rounded-full' : '',
		statusPositions[appearance][size],
		statusSizesTypes[size],
	].join(' ');

	const IconOrInitials = !initials ?
		(<svg
			className='w-full h-full fill-current select-none'
			viewBox='0 0 40 40'
			aria-hidden
		>
			<path d='M8.28 27.5A14.95 14.95 0 0120 21.8c4.76 0 8.97 2.24 11.72 5.7a14.02 14.02 0 01-8.25 5.91 14.82 14.82 0 01-6.94 0 14.02 14.02 0 01-8.25-5.9zM13.99 12.78a6.02 6.02 0 1112.03 0 6.02 6.02 0 01-12.03 0z'></path>
		</svg>)
		:
		initials;

	const labelText = !src ? `${name} ${status ?? presence ?? ''}` : undefined;
	const altText = `${name} ${status ?? presence ?? ''}`;

	return (
		<span
			className={classes}
			role={!src ? 'img' : undefined}
			aria-label={labelText}
			onClick={onClick}
			data-testid={testId}
		>
			{(size !== 'xsmall' && size !== 'small' && status) && (
				<span
					className={statusWrapperClasses}
				>
					{statusIcons[status]}
				</span>
			)}
			{!src ?
				IconOrInitials
				:
				(
					<Image
						className={imageClasses}
						src={src}
						alt={altText}
						fill
					/>
				)
			}
		</span>
	);
};