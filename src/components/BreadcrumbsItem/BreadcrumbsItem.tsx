'use client';
import { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import Link from '../Link/Link';

type Props = {
	text: string,
	className?: string,
	href?: string,
	iconBefore?: ReactNode,
	iconAfter?: ReactNode,
	onClick?: MouseEventHandler<HTMLAnchorElement>,
	truncationWidth?: number,
	target?: AnchorHTMLAttributes<HTMLButtonElement>['target'],
	testId?: string,
};

export default function BreadcrumbsItem({
	text,
	className,
	href = '',
	iconBefore,
	iconAfter,
	onClick,
	truncationWidth,
	target,
	testId,
}: Props) {

	const classes = [
		truncationWidth ? 'truncate' : '',
		className,
	].join(' ');

	const Children: JSX.Element =
		(
			<>
				{iconBefore && (
					<span className='w-6 h-6 mr-1'>
						{iconBefore}
					</span>
				)}

				<span>
					{text}
				</span>

				{iconAfter && (
					<span className='w-6 h-6 ml-1'>
						{iconAfter}
					</span>
				)}
			</>
		);

	return (
		<Link
			style={truncationWidth ? { 'maxWidth': `${truncationWidth}px` } : undefined}
			className={classes}
			href={href}
			onClick={onClick}
			target={target}
			data-testid={testId}
		>
			{Children}
		</Link>
	);
};

