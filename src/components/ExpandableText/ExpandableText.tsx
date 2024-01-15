'use client';
import { MouseEventHandler, useLayoutEffect, useRef, useState } from 'react';
import Button from '@/components/Button/Button';
import { useTranslation } from '@/i18n/client';
import { useParams } from 'next/navigation';
import { Locales, fallbackLng } from '@/i18n/settings';
import { GeneralProps } from '@/types/shared';

type Props = {
	defaultExpanded?: boolean,
	children: string | string[],
	visibleRowsCount?: 1 | 2 | 3 | 4 | 5 | 6,
} & GeneralProps;

const lineClamps = {
	1: 'line-clamp-1',
	2: 'line-clamp-2',
	3: 'line-clamp-3',
	4: 'line-clamp-4',
	5: 'line-clamp-5',
	6: 'line-clamp-6',
} as const;

export default function ExpandableText({
	className,
	children,
	testId,
	defaultExpanded,
	visibleRowsCount = 2,
	...props
}: Props) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);
	const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded ?? false);

	const textRef = useRef<HTMLParagraphElement | null>(null);
	const [shouldShowButton, setShouldShowButton] = useState<boolean>(false);

	const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
		setIsExpanded((state) => !state);
	};

	useLayoutEffect(() => {
		if (textRef.current) {
			const height = textRef.current.scrollHeight;
			const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight);
			const numberOfRows = height / lineHeight;

			setShouldShowButton(numberOfRows > visibleRowsCount);
		}
	}, [visibleRowsCount]);

	const textClasses = [
		'text-neutral-1000 dark:text-dark-neutral-1000',
		!isExpanded ? lineClamps[visibleRowsCount] : '',
	].join(' ');

	return (
		<div
			className={className}
			data-testid={testId}
			{...props}
		>
			{typeof children === 'string' ?
				(
					<p
						ref={textRef}
						className={textClasses}
					>
						{children}
					</p>
				)
				:
				(
					<div
						ref={textRef}
						className={textClasses}
					>
						{children.map((paragraphText, index) => (
							<p key={index} className='mb-2 last:mb-0'>{paragraphText}</p>
						))}
					</div>
				)
			}
			{shouldShowButton && (
				<Button
					appearance='ghost'
					className='mt-1 py-2 [&]:px-0'
					onClick={clickHandler}
				>
					{isExpanded ?
						t('expandableText.collapseButton') :
						t('expandableText.expandButton')
					}
				</Button>
			)}
		</div>
	);
}