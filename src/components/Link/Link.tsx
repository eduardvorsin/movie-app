import { AnchorHTMLAttributes, FocusEventHandler, MouseEventHandler, ReactNode } from 'react';
import NextLink from 'next/link';
import { GeneralProps } from '@/types/shared';

export type Props = {
	appearance?: 'primary' | 'secondary',
	children: ReactNode,
	href: string,
	id?: string,
	onClick?: MouseEventHandler<HTMLAnchorElement>,
	onFocus?: FocusEventHandler<HTMLAnchorElement>,
	onBlur?: FocusEventHandler<HTMLAnchorElement>,
	isDisabled?: boolean,
	target?: AnchorHTMLAttributes<HTMLButtonElement>['target'],
	isExternal?: boolean,
} & GeneralProps;

export default function Link({
	id,
	href,
	className,
	children,
	onClick,
	onFocus,
	onBlur,
	isExternal = false,
	testId,
	isDisabled = false,
	style,
	target,
	appearance = 'primary',
	...props
}: Props) {
	const linkClasses = [
		'no-underline  hover:underline transition-colors duration-150',
		appearance === 'primary' ? 'text-blue-800 hover:text-blue-900 active:text-blue-1000 dark:text-blue-400 dark:hover:text-blue-300 dark:active:text-blue-200' : 'text-neutral-800 hover:text-neutral-900 active:text-neutral-1000 dark:text-dark-neutral-1000 dark:hover:text-dark-neutral-900 dark:active:text-dark-neutral-800',
		isDisabled ? 'opacity-disabled cursor-not-allowed' : '',
		className,
	].join(' ');

	if (!isExternal) {
		return (
			<NextLink
				id={id}
				className={linkClasses}
				href={href}
				onClick={onClick}
				onFocus={onFocus}
				onBlur={onBlur}
				role={!href ? 'link' : undefined}
				aria-disabled={!href}
				data-testid={testId}
				style={style}
				{...props}
			>
				{children}
			</NextLink>
		);
	}

	return (
		<a
			id={id}
			className={`${linkClasses}`}
			href={href}
			rel='noopener noreferrer'
			onClick={onClick}
			aria-disabled={!href}
			target={target}
			role={!href ? 'link' : undefined}
			data-testid={testId}
			style={style}
			{...props}
		>
			{children}
		</a>
	);
};
