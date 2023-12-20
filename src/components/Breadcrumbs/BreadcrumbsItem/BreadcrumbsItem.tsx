'use client';
import { AnchorHTMLAttributes, AriaAttributes, MouseEventHandler, ReactNode } from 'react';
import Link from '@/components/Link/Link';

type Props = {
	children: ReactNode,
	className?: string,
	href?: string,
	onClick?: MouseEventHandler<HTMLAnchorElement>,
	truncationWidth?: number,
	target?: AnchorHTMLAttributes<HTMLButtonElement>['target'],
	testId?: string,
} & AriaAttributes;

export default function BreadcrumbsItem({
	children,
	className,
	href = '',
	onClick,
	truncationWidth,
	target,
	testId,
}: Props) {

	return (
		<Link
			style={truncationWidth ? { 'maxWidth': `${truncationWidth}px` } : undefined}
			className={`inline-flex ${className}`}
			href={href}
			onClick={onClick}
			target={target}
			testId={testId}
		>
			<span className={truncationWidth ? 'truncate' : ''}>
				{children}
			</span>
		</Link>
	);
};