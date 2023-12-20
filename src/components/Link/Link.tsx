import { AnchorHTMLAttributes, CSSProperties, FocusEventHandler, MouseEventHandler, ReactNode } from 'react';
import NextLink from 'next/link';
import { twMerge } from 'tailwind.config';

type Props = {
	children: ReactNode,
	href: string,
	id?: string,
	className?: string,
	onClick?: MouseEventHandler<HTMLAnchorElement>,
	onFocus?: FocusEventHandler<HTMLAnchorElement>,
	onBlur?: FocusEventHandler<HTMLAnchorElement>,
	isDisabled?: boolean,
	target?: AnchorHTMLAttributes<HTMLButtonElement>['target'],
	isExternal?: boolean,
	testId?: string,
	style?: CSSProperties,
};

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
}: Props) {
	const linkClasses = twMerge(
		'no-underline text-blue-700 hover:text-blue-800 active:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 dark:active:text-blue-200 hover:underline transition-colors duration-150',
		isDisabled ? 'opacity-disabled cursor-not-allowed' : '',
		className,
	);

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
		>
			{children}
		</a>
	);
};
