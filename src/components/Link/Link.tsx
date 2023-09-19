import { AnchorHTMLAttributes, CSSProperties, FocusEventHandler, MouseEventHandler, ReactNode } from 'react';
import NextLink from 'next/link';

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
	const linkClasses = [
		'underline text-blue-500 hover:text-blue-600 hover:no-underline active:text-blue-700',
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
