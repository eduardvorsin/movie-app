'use client';
import { FocusEventHandler, MouseEventHandler, ReactNode } from 'react';
import Spinner from '@/components/Spinner/Spinner';
import Link from 'next/link';

export type Props = {
	appearance?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'discovery' | 'ghost',
	className?: string,
	iconAfter?: ReactNode,
	iconBefore?: ReactNode,
	isDisabled?: boolean,
	isLoading?: boolean,
	fullWidth?: boolean,
	onBlur?: FocusEventHandler<HTMLElement>,
	onClick?: MouseEventHandler<HTMLElement>,
	onFocus?: FocusEventHandler<HTMLElement>,
	size?: 'micro' | 'slim' | 'medium' | 'large' | 'custom',
	children: ReactNode,
	testId?: string,
	href?: string,
	iconButton?: boolean,
};

const appearanceTypes = {
	primary: 'bg-blue-700 text-neutral-0 dark:text-dark-neutral-0 enabled:hover:bg-blue-800 enabled:active:bg-blue-900 dark:bg-blue-400 dark:enabled:hover:bg-blue-300 dark:enabled:active:bg-blue-200',
	secondary: 'bg-neutral-300 text-dark-neutral-0 enabled:hover:bg-neutral-400 enabled:active:bg-neutral-500 dark:enabled:hover:bg-neutral-200 dark:enabled:active:bg-neutral-100',
	success: 'bg-green-700 text-neutral-0 dark:text-dark-neutral-0 enabled:hover:bg-green-800 enabled:active:bg-green-900 dark:bg-green-400 dark:enabled:hover:bg-green-300 dark:enabled:active:bg-green-200',
	discovery: 'bg-purple-700 text-neutral-0 dark:text-dark-neutral-0 enabled:hover:bg-purple-800 enabled:active:bg-purple-900 dark:bg-purple-400 dark:enabled:hover:bg-purple-300 dark:enabled:active:bg-purple-200',
	danger: 'bg-red-700 text-neutral-0 dark:text-dark-neutral-0 enabled:hover:bg-red-800 enabled:active:bg-red-900 dark:bg-red-400 dark:enabled:hover:bg-red-300 dark:enabled:active:bg-red-200',
	warning: 'bg-yellow-500 text-neutral-1000 enabled:hover:bg-yellow-600 enabled:active:bg-yellow-700 dark:enabled:hover:bg-yellow-300 dark:enabled:active:bg-yellow-200',
	ghost: 'text-dark-neutral-0 enabled:hover:text-dark-neutral-400 enabled:active:text-dark-neutral-600 dark:text-neutral-200 dark:enabled:hover:text-neutral-400 dark:enabled:active:text-neutral-600',
} as const;

const iconButtonAppearances = {
	primary: 'text-blue-700 enabled:hover:text-blue-800 enabled:active:text-blue-900 dark:text-blue-400 dark:enabled:hover:text-blue-300 dark:enabled:active:text-blue-200',
	secondary: 'text-neutral-300 enabled:hover:text-neutral-400 enabled:active:text-neutral-500 dark:enabled:hover:text-neutral-200 dark:enabled:active:text-neutral-100',
	success: 'text-green-700 enabled:hover:text-green-800 enabled:active:text-green-900 dark:text-green-400 dark:enabled:hover:text-green-300 dark:enabled:active:text-green-200',
	discovery: 'text-purple-700 enabled:hover:text-purple-800 enabled:active:text-purple-900 dark:text-purple-400 dark:enabled:hover:text-purple-300 dark:enabled:active:text-purple-200',
	danger: 'text-red-700 enabled:hover:text-red-800 enabled:active:text-red-900 dark:text-red-400 dark:enabled:hover:text-red-300 dark:enabled:active:text-red-200',
	warning: 'text-yellow-500 enabled:hover:text-yellow-600 enabled:active:text-yellow-700 dark:enabled:hover:text-yellow-300 dark:enabled:active:text-yellow-300',
	ghost: 'text-dark-neutral-0 enabled:hover:text-dark-neutral-400 enabled:active:text-dark-neutral-600 dark:text-neutral-0 dark:enabled:hover:text-neutral-400 dark:enabled:active:text-neutral-600',
} as const;

const sizeTypes = {
	micro: 'py-0.5 px-2',
	slim: 'py-1 px-3',
	medium: 'py-2 px-4',
	large: 'py-3 px-6',
	custom: '',
} as const;

const iconSizes = {
	micro: 'w-3 h-3',
	slim: 'w-4 h-4',
	medium: 'w-5 h-5',
	large: 'w-5 h-5',
	custom: '',
} as const;

export default function Button({
	className,
	appearance = 'primary',
	iconAfter,
	iconBefore,
	isLoading,
	isDisabled,
	fullWidth,
	onBlur,
	onClick,
	onFocus,
	size = 'medium',
	children,
	href,
	iconButton,
	testId,
}: Props) {
	const currentFontSize = size === 'large' ? 'text-200' : 'text-100';
	const classes = [
		'items-center font-medium rounded-1 text-center cursor-pointer min-w[2.25rem] leading-2 inline-flex transition-colors duration-150',
		iconButton ? 'text-0' : currentFontSize,
		isDisabled ? 'opacity-disabled cursor-not-allowed' : '',
		iconButton ? iconButtonAppearances[appearance] : appearanceTypes[appearance],
		iconButton ? '' : `${sizeTypes[size]} relative`,
		fullWidth ? 'w-full justify-center' : '',
		isLoading ? 'pointer-events-none text-transparent dark:text-transparent select-none' : '',
		className,
	].join(' ');

	const Children =
		(
			<>
				{!iconButton && isLoading && (
					<Spinner
						className='w-auto h-[80%] stroke-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
						size='custom'
						color={appearance === 'secondary' ? 'stroke-dark-neutral-0' : 'stroke-neutral-0'}
						testId='spinner'
					/>
				)}

				{!iconButton && iconBefore && (
					<span className={`${iconSizes[size]} ${size === 'micro' ? 'mr-1' : 'mr-2'}`}>
						{iconBefore}
					</span>
				)}

				<span
					className={iconButton ? 'inline-flex' : undefined}
				>
					{children}
				</span>

				{!iconButton && iconAfter && (
					<span className={`${iconSizes[size]} ${size === 'micro' ? 'ml-1' : 'ml-2'}`}>
						{iconAfter}
					</span>
				)}
			</>
		);

	if (href) {
		return (
			<Link
				className={classes}
				href={href}
				onClick={onClick}
				onBlur={onBlur}
				onFocus={onFocus}
				data-testid={testId}
			>
				{Children}
			</Link>
		);
	}

	return (
		<button
			className={classes}
			onClick={onClick}
			onBlur={onBlur}
			onFocus={onFocus}
			disabled={isDisabled}
			data-testid={testId}
		>
			{Children}
		</button>
	);
};