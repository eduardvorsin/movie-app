'use client';
import { FocusEventHandler, MouseEventHandler, ReactNode } from 'react';

type Props = {
	className?: string,
	children: ReactNode,
	isDisabled?: boolean,
	onClick: MouseEventHandler<HTMLButtonElement>,
	onFocus?: FocusEventHandler<HTMLButtonElement>,
	testId?: string,
};

export default function CommentAction({
	children,
	className,
	testId,
	isDisabled,
	onClick,
	onFocus,
}: Props) {
	const classes = [
		'disabled:opacity-disabled disabled:cursor-not-allowed',
		className,
	].join(' ');
	return (
		<button
			className={`${classes} inline-flex font-medium text-100 text-neutral-800 dark:text-dark-neutral-800 hover:text-neutral-700 dark:hover:text-dark-neutral-900 hover:underline active:text-neutral-600 dark:active:text-dark-neutral-1000`}
			disabled={isDisabled}
			data-testid={testId}
			onClick={onClick}
			onFocus={onFocus}
		>
			<span className='max-w-[80px] truncate'>
				{children}
			</span>
		</button>
	);
}