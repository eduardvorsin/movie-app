'use client';
import Link from 'next/link';
import { FocusEventHandler, MouseEventHandler, ReactNode } from 'react';

type Props = {
	children: ReactNode,
	type: 'author' | 'time',
	className?: string,
	href?: string,
	onClick?: MouseEventHandler<HTMLSpanElement>,
	onFocus?: FocusEventHandler<HTMLSpanElement>,
	testId?: string,
}

export default function CommentInfoItem({
	type,
	className,
	children,
	onClick,
	onFocus,
	href,
	testId,
}: Props) {
	const classes = [
		'text-neutral-800 dark:text-dark-neutral-800 enabled:hover:text-neutral-700 dark:enabled:hover:text-dark-neutral-900 enabled:active:text-neutral-600 dark:enabled:active:text-dark-neutral-1000',
		type === 'author' ? 'font-medium' : '',
		className
	].join(' ');

	if (href) {
		return (
			<Link
				className={classes}
				onClick={onClick}
				onFocus={onFocus}
				href={href}
				data-testid={testId}
				prefetch
			>
				{children}
			</Link>
		);
	}

	return (
		<span
			className={classes}
			onClick={onClick}
			data-testid={testId}
		>
			{children}
		</span>
	);
};
