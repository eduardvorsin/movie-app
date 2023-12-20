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
} & GeneralProps;

export default function BreadcrumbsItem({
	children,
	className,
	href = '',
	onClick,
	truncationWidth,
	target,
	testId,
	...props
}: Props) {

	return (
		<Link
			style={truncationWidth ? { 'maxWidth': `${truncationWidth}px` } : undefined}
			className={`inline-flex text-200 ${className}`}
			href={href}
			onClick={onClick}
			target={target}
			testId={testId}
			{...props}
		>
			<span className={truncationWidth ? 'truncate' : ''}>
				{children}
			</span>
		</Link>
	);
};