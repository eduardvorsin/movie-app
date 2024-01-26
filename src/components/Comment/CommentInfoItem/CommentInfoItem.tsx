'use client';
import { GeneralProps } from '@/types/shared';
import Link from 'next/link';
import { FocusEventHandler, MouseEventHandler, ReactNode } from 'react';

type Props = {
	children: ReactNode,
	type: 'author' | 'time',
	href?: string,
	onClick?: MouseEventHandler<HTMLSpanElement>,
	onFocus?: FocusEventHandler<HTMLSpanElement>,
} & GeneralProps;

export default function CommentInfoItem({
	type,
	className,
	children,
	onClick,
	onFocus,
	href,
	testId,
	...props
}: Props) {
	const classes = [
		'[&]:text-neutral-800 dark:[&]:text-dark-neutral-800 enabled:hover:[&]:text-neutral-700 dark:enabled:hover:[&]:text-dark-neutral-900 enabled:active:[&]:text-neutral-600 dark:enabled:active:[&]:text-dark-neutral-1000 transition-colors duration-150',
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
				{...props}
			>
				{children}
			</Link>
		);
	}

	return (
		<button
			className={classes}
			onClick={onClick}
			onFocus={onFocus}
			data-testid={testId}
			{...props}
		>
			{children}
		</button>
	);
};
