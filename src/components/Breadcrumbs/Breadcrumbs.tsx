'use client';
import { ReactNode } from 'react';

type Props = {
	label: string,
	children: ReactNode,
	className?: string,
	isExpanded?: boolean,
	isNavigation?: boolean,
	maxItems?: number,
	onExpand?: () => void,
	testId?: string,
	ellipsisLabel?: string,
	separator?: string,
};

export default function Breadcrumbs({
	label = 'Breadcrumbs',
	children,
	className,
	isExpanded,
	isNavigation = true,
	maxItems = +Infinity,
	onExpand,
	testId,
	ellipsisLabel = 'expand all links',
	separator = '/',
}: Props) {
	const classes = [
		className,
	].join(' ');

	const Wrapper = isNavigation ? 'nav' : 'div';
	const totalItems: ReactNode[] = Array.isArray(children) ? children : [children];

	let visibleItems;
	if (maxItems >= totalItems.length || totalItems.length < 3 || isExpanded) {
		visibleItems = totalItems;
	} else {
		const elipsisButton: JSX.Element = (
			<button
				className='underline text-blue-500 hover:text-blue-600 hover:no-underline active:text-blue-700'
				onClick={onExpand}
			>
				<span>...</span>
				<span className='sr-only'>{ellipsisLabel}</span>
			</button>
		);

		visibleItems = [
			totalItems[0],
			elipsisButton,
			totalItems[totalItems.length - 1],
		];
	}

	return (
		<Wrapper
			className={classes}
			data-testid={testId}
			aria-label={label}
		>
			<ol className='flex items-center flex-wrap'>
				{visibleItems.map((child, index) => (
					<li
						key={index}
						className='text-100 after:content-[attr(data-separator)] last:after:content-none after:w-2 after:px-2 after:text-center after:text-100'
						data-separator={separator}
					>
						{child}
					</li>
				))}
			</ol>
		</Wrapper>
	);
};