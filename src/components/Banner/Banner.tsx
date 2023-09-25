'use client';
import { ReactNode } from 'react';
import Warning from '../../assets/icons/warning.svg?url';
import Error from '../../assets/icons/error.svg?url';
import Confirmation from '../../assets/icons/confirmation.svg?url';
import Info from '../../assets/icons/info.svg?url';
import Question from '../../assets/icons/question.svg?url';
import Cancel from '../../assets/icons/cancel.svg?url';
import Button from '../Button/Button';

type Props = {
	className?: string,
	title?: string,
	hideIcon?: boolean,
	children: ReactNode,
	appearance?: 'success' | 'info' | 'warning' | 'danger' | 'discovery',
	onClose?: () => void,
	closeButton?: boolean,
	titleLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
	actions?: ReactNode[],
	testId?: string,
};

const appearances = {
	success: 'bg-green-100 dark:bg-green-1000',
	info: 'bg-blue-100 dark:bg-blue-1000',
	warning: 'bg-yellow-100 dark:bg-yellow-1000',
	danger: 'bg-red-100 dark:bg-red-1000',
	discovery: 'bg-purple-100 dark:bg-purple-1000',
} as const;

const apperanceIcons = {
	discovery: (
		<svg className='fill-purple-700 dark:fill-purple-400 ' viewBox='0 0 20 20'>
			<use href={`${Question.src}#question`}></use>
		</svg>
	),
	success: (
		<svg className='fill-green-800 dark:fill-green-400' viewBox='0 0 20 20'>
			<use href={`${Confirmation.src}#confirmation`}></use>
		</svg>
	),
	info: (
		<svg className='fill-blue-700 dark:fill-blue-400' viewBox='0 0 20 20'>
			<use href={`${Info.src}#info`}></use>
		</svg>
	),
	warning: (
		<svg className='fill-yellow-600 dark:fill-yellow-500' viewBox='0 0 20 20'>
			<use href={`${Warning.src}#warning`}></use>
		</svg>
	),
	danger: (
		<svg className='fill-red-700 dark:fill-red-400' viewBox='0 0 20 20'>
			<use href={`${Error.src}#error`}></use>
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
	titleLevel,
	testId,
}: Props) {
	const classes = [
		'py-4 pl-4 rounded-[0.1875rem] flex relative',
		appearances[appearance],
		closeButton ? 'pr-12' : 'pr-4',
		className
	].join(' ');
	const Heading = titleLevel;

	return (
		<div
			className={`${classes}`}
			data-testid={testId}
		>
			{!hideIcon && (
				<span
					className='w-6 h-6 mr-4'
				>
					{apperanceIcons[appearance]}
				</span>
			)}
			<div>
				{title && (
					<Heading
						className='mb-2 text-200 font-bold text-neutral-1000 dark:text-dark-neutral-900'
					>
						{title}
					</Heading>
				)}
				<p
					className={'text-100 text-neutral-1000 dark:text-dark-neutral-900'}
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
					className='text-[0rem] p-2 w-10 h-10 absolute top-2 right-0'
					iconButton
					onClick={onClose}
				>
					close
					<svg className='fill-current w-6 h-6' viewBox='0 0 20 20' aria-hidden>
						<use href={`${Cancel.src}#cancel`}></use>
					</svg>
				</Button>
			)}
		</div>
	)
};
