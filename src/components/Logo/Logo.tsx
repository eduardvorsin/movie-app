'use client';

import Link from 'next/link';
import ThemedImage from '../ThemedImage/ThemedImage';
import { useTranslation } from '@/i18n/client';
import { useParams } from 'next/navigation';
import { Locales, fallbackLng } from '@/i18n/settings';
import { MouseEventHandler } from 'react';
import { routes } from 'src/constants';
import { GeneralProps } from '@/types/shared';

const sizes = {
	small: {
		width: 47,
		height: 24,
	},
	medium: {
		width: 62,
		height: 32,
	},
	large: {
		width: 110,
		height: 56,
	},
} as const;

export type Props = {
	onClick?: MouseEventHandler<HTMLAnchorElement>,
	size: 'small' | 'medium' | 'large',
} & GeneralProps;

export default function Logo({
	size = 'medium',
	className,
	testId,
	onClick,
	...props
}: Props) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);

	return (
		<Link
			className={`inline-flex ${className}`}
			href={routes.home}
			data-testid={testId}
			onClick={onClick}
			{...props}
		>
			<ThemedImage
				width={sizes[size].width}
				height={sizes[size].height}
				alt='movie wander logo'
				src={{
					light: '/assets/images/logo.svg',
					dark: '/assets/images/logo.svg',
				}}
			/>
			<span className='sr-only'>
				{t('logoLink')}
			</span>
		</Link>
	);
};