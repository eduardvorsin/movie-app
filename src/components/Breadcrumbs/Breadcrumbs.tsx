'use client';
import { useTranslation } from '@/i18n/client';
import { Locales, fallbackLng, locales } from '@/i18n/settings';
import { useParams, usePathname } from 'next/navigation';
import { AnchorHTMLAttributes, MouseEventHandler, useState } from 'react';
import BreadcrumbsItem from './BreadcrumbsItem/BreadcrumbsItem';
import { navigationRoutes } from 'src/constants';
import { toCapitalizeCase } from '@/helpers/toCapitalizeCase/toCapitalizeCase';
import { GeneralProps } from '@/types/shared';

type Props = {
	label: string,
	isNavigation?: boolean,
	maxItems?: number,
	separator?: string,
	truncationWidth?: number,
	target?: AnchorHTMLAttributes<HTMLButtonElement>['target'],
	lastItemLabel?: string,
} & GeneralProps;

export default function Breadcrumbs({
	label,
	className,
	isNavigation = true,
	maxItems = +Infinity,
	testId,
	separator = '/',
	truncationWidth,
	target,
	lastItemLabel,
	...props
}: Props) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const parts = usePathname().split('/').slice(1);
	const segments = parts
		.map((segment, index) => {
			let localizedSegment = segment;
			if (locales.includes(segment as Locales)) {
				localizedSegment = t('breadcrumbs.home');
			}
			if ((Object.keys(navigationRoutes)).includes(segment)) {
				localizedSegment = t(`breadcrumbs.${segment}`);
			}

			return {
				label: toCapitalizeCase(localizedSegment),
				value: `/${parts.slice(0, index + 1).join('/')}`,
			};
		});

	if (lastItemLabel) {
		segments[segments.length - 1].label = lastItemLabel;
	}

	const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
		setIsExpanded(true);
	}

	const Wrapper = isNavigation ? 'nav' : 'div';
	const totalItems = segments.map((segment, index) => (
		<BreadcrumbsItem
			key={segment.label}
			className={index === segments.length - 1 ? 'pointer-events-none' : ''}
			href={index === segments.length - 1 ? '' : segment.value}
			truncationWidth={truncationWidth}
			target={target}
			aria-current={index === segments.length - 1 ? 'page' : undefined}
		>
			{segment.label}
		</BreadcrumbsItem >
	));

	let visibleItems;
	if (maxItems >= totalItems.length || totalItems.length < 3 || isExpanded) {
		visibleItems = totalItems;
	} else {
		const elipsisButton: JSX.Element = (
			<button
				className='no-underline text-blue-500 hover:text-blue-600 hover:underline active:text-blue-700 transition-colors duration-150'
				onClick={clickHandler}
			>
				<span>...</span>
				<span className='sr-only'>{t('elipsisLabel')}</span>
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
			className={className}
			data-testid={testId}
			aria-label={label}
			{...props}
		>
			<ol className='flex items-center flex-wrap gap-y-1'>
				{visibleItems.map((child, index) => (
					<li
						key={index}
						className='text-100 after:content-[attr(data-separator)] last:after:content-none after:mx-2 after:text-center after:text-100 dark:after:text-dark-neutral-1000 after:text-neutral-1000 transition-colors duration-150 after:transition-colors after:duration-150'
						data-separator={separator}
					>
						{child}
					</li>
				))}
			</ol>
		</Wrapper>
	);
};