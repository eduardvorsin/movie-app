'use client';
import { ReactNode } from 'react';
import Button from '../Button/Button';
import Title from '../Title/Title';
import { GeneralProps, HeadingElement } from '@/types/shared';
import { useParams } from 'next/navigation';
import { Locales, fallbackLng } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';

export type Props = {
	title?: string,
	hideIcon?: boolean,
	children: ReactNode,
	appearance?: 'success' | 'info' | 'warning' | 'danger' | 'discovery',
	onClose?: () => void,
	closeButton?: boolean,
	titleElement?: HeadingElement,
	actions?: ReactNode[],
} & GeneralProps;

const appearances = {
	success: 'bg-green-100 dark:bg-green-1000',
	info: 'bg-blue-100 dark:bg-blue-1000',
	warning: 'bg-yellow-100 dark:bg-yellow-1000',
	danger: 'bg-red-100 dark:bg-red-1000',
	discovery: 'bg-purple-100 dark:bg-purple-1000',
} as const;

const apperanceIcons = {
	discovery: (
		<svg className='fill-purple-700 dark:fill-purple-400 transition-colors duration-150' viewBox='0 0 20 20'>
			<use href={'/assets/icons/question.svg#question'}></use>
		</svg>
	),
	success: (
		<svg className='fill-green-800 dark:fill-green-400 transition-colors duration-150' viewBox='0 0 20 20'>
			<use href={'/assets/icons/confirmation.svg#confirmation'}></use>
		</svg>
	),
	info: (
		<svg className='fill-blue-700 dark:fill-blue-400 transition-colors duration-150' viewBox='0 0 20 20'>
			<use href={'/assets/icons/info.svg#info'}></use>
		</svg>
	),
	warning: (
		<svg className='fill-yellow-600 dark:fill-yellow-500 transition-colors duration-150' viewBox='0 0 20 20'>
			<use href={'/assets/icons/warning.svg#warning'}></use>
		</svg>
	),
	danger: (
		<svg className='fill-red-700 dark:fill-red-400 transition-colors duration-150' viewBox='0 0 20 20'>
			<use href={'/assets/icons/error.svg#error'}></use>
		</svg>
	),
} as const;

export default function Banner({
	appearance = 'info',
	className,
	title,
	hideIcon,
	children,
	actions,
	onClose,
	closeButton,
	titleElement,
	testId,
	...props
}: Props) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);

	const classes = [
		'py-4 pl-4 rounded-[0.1875rem] flex relative',
		appearances[appearance],
		closeButton ? 'pr-12' : 'pr-4',
		className
	].join(' ');

	return (
		<div
			className={`${classes}`}
			data-testid={testId}
			{...props}
		>
			{!hideIcon && (
				<span
					role="presentation"
					className='w-6 h-6 mr-4'
				>
					{apperanceIcons[appearance]}
				</span>
			)}
			<div>
				{title && (
					<Title
						as={titleElement}
						level={6}
						className='mb-2 font-bold text-neutral-1000 dark:text-dark-neutral-900'
					>
						{title}
					</Title>
				)}
				<p
					className={'text-100 text-neutral-1000 dark:text-dark-neutral-900 transition-colors duration-150'}
				>
					{children}
				</p>
				{actions && (
					<div
						className={'flex mt-3'}
					>
						{actions.map((action, index) => (
							<div key={index} className='mr-2 last:mr-0'>{action}</div>
						))}
					</div>
				)}
			</div>
			{closeButton && (
				<Button
					appearance={appearance === 'info' ? 'primary' : appearance}
					className='text-0 p-2 w-10 h-10 absolute top-2 right-0'
					iconButton
					onClick={onClose}
				>
					{t('banner.button')}
					<svg className='fill-current w-6 h-6' viewBox='0 0 20 20' aria-hidden>
						<use href={'/assets/icons/cancel.svg#cancel'}></use>
					</svg>
				</Button>
			)}
		</div>
	)
};
