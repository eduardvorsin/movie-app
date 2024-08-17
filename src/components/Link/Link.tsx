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

const appearanceTypes = {
	default: {
		primary: 'text-blue-800 hover:text-blue-900 active:text-blue-1000 dark:text-blue-400 dark:hover:text-blue-300 dark:active:text-blue-200 hover:underline',
		secondary: 'text-neutral-800 hover:text-neutral-900 active:text-neutral-1000 dark:text-dark-neutral-1000 dark:hover:text-dark-neutral-900 dark:active:text-dark-neutral-800 hover:underline',
	},
	empty: {
		primary: 'pointer-events-none cursor-default text-blue-1000 hover:text-blue-1000 active:text-blue-1000 dark:text-blue-200 dark:hover:text-blue-200 dark:active:text-blue-200',
		secondary: 'pointer-events-none cursor-default text-neutral-1000 hover:text-neutral-1000 active:text-neutral-1000 dark:text-dark-neutral-800 dark:hover:text-dark-neutral-800 dark:active:text-dark-neutral-800',
	}
} as const;

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
	const linkType = href === '' ? 'empty' : 'default';

	const linkClasses = [
		'no-underline transition-colors duration-150',
		appearanceTypes[linkType][appearance],
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
				role={href === '' ? 'link' : undefined}
				aria-disabled={href === ''}
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
			className={linkClasses}
			href={href}
			rel='noopener noreferrer'
			onClick={onClick}
			aria-disabled={href === ''}
			target={target}
			role={href === '' ? 'link' : undefined}
			data-testid={testId}
			style={style}
			{...props}
		>
			{children}
		</a>
	);
};
