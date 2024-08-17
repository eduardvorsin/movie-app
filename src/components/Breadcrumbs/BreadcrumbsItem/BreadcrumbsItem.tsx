'use client';
import { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import Link from '@/components/Link/Link';
import { GeneralProps } from '@/types/shared';

type Props = {
	children: ReactNode,
	href?: string,
	onClick?: MouseEventHandler<HTMLAnchorElement>,
	truncationWidth?: number,
	target?: AnchorHTMLAttributes<HTMLButtonElement>['target'],
	isLastItem: boolean,
} & GeneralProps;

export default function BreadcrumbsItem({
	children,
	className,
	href = '',
	onClick,
	truncationWidth,
	isLastItem,
	target,
	testId,
	...props
}: Props) {

	const classes = [
		'inline-flex text-200',
		isLastItem ? 'pointer-events-none' : '',
		className,
	].join(' ');

	const clickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
		if (onClick && !isLastItem) onClick(e);
	};

	return (
		<Link
			style={truncationWidth ? { 'maxWidth': `${truncationWidth}px` } : undefined}
			className={classes}
			href={!isLastItem ? href : ''}
			onClick={clickHandler}
			target={target}
			aria-current={isLastItem ? 'page' : undefined}
			testId={testId}
			{...props}
		>
			<span className={truncationWidth ? 'truncate' : ''}>
				{children}
			</span>
		</Link >
	);
};