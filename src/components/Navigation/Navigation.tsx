'use client';

import { NavigationRoutes, navigationRoutes } from 'src/constants';
import Link from '@/components/Link/Link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { MouseEventHandler } from 'react';
import { GeneralProps } from '@/types/shared';

export type Props = {
	onClick: MouseEventHandler<HTMLAnchorElement>,
	dictionary: Record<'movies' | 'persons' | 'tv' | 'new' | 'collections', string>,
} & GeneralProps;

export default function Navigation({
	className,
	testId,
	onClick,
	dictionary,
	...props
}: Props) {
	const routes = Object.keys(navigationRoutes);
	const activeSegment = useSelectedLayoutSegments().find((segment) => routes.includes(segment));

	return (
		<div
			className={`fixed inset-0 bg-neutral-100/90 dark:bg-dark-neutral-100/90 z-0 md:static md:inset-auto md:bg-transparent dark:md:bg-transparent mt-[3.75rem] md:mt-0 transition-colors duration-150 ${className}`}
			{...props}
		>
			<nav
				className='z-100 w-full p-6 pt-3 md:p-0 bg-neutral-200 dark:bg-dark-neutral-250 md:bg-transparent dark:md:bg-transparent flex flex-col md:flex-row transition-colors duration-150'
				data-testid={testId}
			>
				<ul className='flex md:flex-wrap md:gap-2 flex-col md:flex-row'>
					{(Object.keys(navigationRoutes) as Array<keyof NavigationRoutes>).map((route) => (
						<li key={route}>
							<Link
								className={`inline-flex text-200 font-medium py-3 px-1 uppercase md:lowercase w-full md:w-auto md:p-0 relative before:pointer-events-none before:absolute before:bg-current before:rounded-0.5 before:top-1/2 before:-translate-y-1/2 before:h-1/2 before:w-0.5 before:-left-2 md:before:-bottom-1 md:before:left-0 md:before:w-full md:before:top-auto md:before:translate-y-0 md:before:h-0.5 before:transition-opacity before:duration-150 ${activeSegment === route ? 'before:opacity-100' : 'before:opacity-0'}`}
								href={navigationRoutes[route]}
								onClick={onClick}
							>
								{dictionary[route]}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}