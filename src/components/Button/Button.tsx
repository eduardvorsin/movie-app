'use client';
import { FocusEventHandler, MouseEventHandler, ReactNode } from 'react';
import Spinner from '../Spinner/Spinner';

export type Props = {
	appearance?: 'primary' | 'secondary' | 'warning' | 'danger',
	className?: string,
	iconAfter?: ReactNode,
	iconBefore?: ReactNode,
	isDisabled?: boolean,
	isLoading?: boolean,
	fullWidth?: boolean,
	onBlur?: FocusEventHandler<HTMLButtonElement>,
	onClick?: MouseEventHandler<HTMLButtonElement>,
	onFocus?: FocusEventHandler<HTMLButtonElement>,
	size?: 'micro' | 'slim' | 'medium' | 'large',
	children: ReactNode,
	testId?: string,
};

const appearanceTypes = {
	primary: 'bg-blue-700 text-neutral-0 dark:text-dark-neutral-0 enabled:hover:bg-blue-800 enabled:active:bg-blue-900 dark:bg-blue-400 dark:enabled:hover:bg-blue-300 dark:enabled:active:bg-blue-200',
	secondary: 'bg-neutral-300 enabled:hover:bg-neutral-400 enabled:active:bg-neutral-500 dark:enabled:hover:bg-neutral-200 dark:enabled:active:bg-neutral-100',
	danger: 'bg-red-700 text-neutral-0 dark:text-dark-neutral-0 enabled:hover:bg-red-800 enabled:active:bg-red-900 dark:bg-red-400 dark:enabled:hover:bg-red-300 dark:enabled:active:bg-red-200',
	warning: 'bg-yellow-400 text-neutral-1000 enabled:hover:bg-yellow-500 enabled:active:bg-yellow-600 dark:enabled:hover:bg-yellow-300 dark:enabled:active:bg-yellow-200',
} as const;

const sizeTypes = {
	micro: 'py-0.5 px-2',
	slim: 'py-1 px-3',
	medium: 'py-2 px-4',
	large: 'py-3 px-6 text-200',
}

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
	testId,
}: Props) {
	const classes = [
		'font-medium rounded-1 text-center cursor-pointer min-w[2.25rem] text-100 leading-2 inline-flex relative transition-colors duration-150 disabled:opacity-disabled disabled:cursor-not-allowed',
		appearanceTypes[appearance],
		sizeTypes[size],
		fullWidth ? 'w-full' : '',
		isLoading ? 'pointer-events-none text-transparent select-none' : '',
		className,
	].join(' ');

	const Children =
		<>
			{iconAfter}
			{children}
			{iconBefore}
		</>

	return (
		<button
			className={classes}
			onClick={onClick}
			onBlur={onBlur}
			onFocus={onFocus}
			disabled={isDisabled}
			data-testid={testId}
		>
			{isLoading && (
				<Spinner
					className='w-auto h-[80%] stroke-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
					size='custom'
				/>
			)}
			{Children}
		</button>
	);
};

