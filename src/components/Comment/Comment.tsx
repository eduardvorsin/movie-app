import { ReactNode } from 'react';
import CommentInfoItem from './CommentInfoItem/CommentInfoItem';
import InlineMessage from '@/components/InlineMessage/InlineMessage';
import Title from '@/components/Title/Title';
import { GeneralProps, HeadingElement } from '@/types/shared';
import ExpandableText from '../ExpandableText/ExpandableText';
import { useParams } from 'next/navigation';
import { Locales, fallbackLng } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';

type Props = {
	id: string,
	author: string,
	avatar: ReactNode,
	content: string,
	type: string,
	titleElement: HeadingElement,
	actions?: ReactNode[],
	errorActions?: ReactNode[],
	error?: string,
	isError?: boolean,
	afterContent?: ReactNode,
	children?: ReactNode,
	isEdited?: boolean,
	restrictedTo?: string,
	savingText?: string,
	time?: string,
	isSaving?: boolean,
	highlighted?: boolean,
	shouldRenderNestedCommentsInline?: boolean,
	rating?: number,
} & GeneralProps;

export default function Comment({
	className,
	id,
	avatar,
	content,
	author,
	time,
	isEdited,
	restrictedTo,
	actions = [],
	type,
	afterContent,
	isError,
	error,
	highlighted,
	isSaving,
	savingText,
	testId,
	children,
	errorActions,
	shouldRenderNestedCommentsInline,
	titleElement,
	rating,
	...props
}: Props) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);

	const classes = [
		'grid grid-cols-1 xs:grid-cols-[auto_1fr] grid-rows-[auto_1fr] xs:grid-rows-1 gap-x-2 gap-y-2 md:gap-y-4 p-2 relative',
		highlighted ? 'gap-y-4' : 'gap-y-2 md:gap-y-4',
		className
	].join(' ');
	const actionItemClasses = 'before:content-["·"] before:ml-1 before:mr-1 first:before:hidden';

	return (
		<div
			className={classes}
			id={id}
			data-testid={testId}
			aria-describedby={`${id}-error-message`}
			{...props}
		>
			<div
				className='mx-auto xs:mx-0'
			>
				{avatar}
			</div>
			<div className='text-100'>
				<Title
					level={6}
					as={titleElement}
					className='flex items-center flex-wrap text-neutral-800 dark:text-dark-neutral-800 gap-x-2 gap-y-1'>
					<CommentInfoItem
						className='text-100 max-w-[130px] truncate'
						type='author'
					>
						{author}
					</CommentInfoItem>
					<span
						className='px-1 text-75 uppercase bg-neutral-300 dark:bg-dark-neutral-300 max-w-[200px] inline-block rounded-[0.1875rem] font-bold align-middle truncate transition-colors duration-150'
					>
						{type}
					</span>
					{isSaving && (
						<span
							className=' text-100 font-regular max-w-[120px] truncate'
						>
							{savingText ?? t('comment.savingText')}
						</span>
					)}
					{!isError && !isSaving && time ?
						(
							<CommentInfoItem
								className=' text-100 font-regular'
								type='time'
							>
								{time}
							</CommentInfoItem>
						) : null
					}
					{isEdited && (
						<span
							className='text-neutral-700 dark:text-dark-neutral-700  font-regular text-100 transition-colors duration-150'
						>
							{t('comment.edited')}
						</span>
					)}
					{restrictedTo && (
						<span
							className=' text-100 font-medium inline-flex items-center text-neutral-700 dark:text-dark-neutral-700 transition-colors duration-150'
						>
							<svg className='w-4 h-4 mr-1 fill-current' viewBox='0 0 20 20'>
								<use href={'/assets/icons/locked.svg#locked'}></use>
							</svg>
							<span className='max-w-[200px] truncate'>
								{restrictedTo}
							</span>
						</span>
					)}
				</Title>

				{
					rating && (
						<span className='flex items-end mb-1'>
							<svg
								className='w-4 h-4 text-neutral-700 dark:text-dark-neutral-700 mr-2 transition-colors duration-150'
								viewBox='0 0 20 20'
							>
								<use href={'/assets/icons/star.svg#star'}></use>
							</svg>

							<span
								className='text-neutral-800 dark:text-dark-neutral-800 font-bold leading-none transition-colors duration-150'
								aria-label={t('comment.ratingLabel')}
							>
								{rating}
							</span>
						</span>
					)
				}

				<ExpandableText
					visibleRowsCount={6}
					className='break-all text-neutral-1000 dark:text-dark-neutral-900 transition-colors duration-150'
				>
					{content}
				</ExpandableText>

				{
					(isError && !isSaving) && (
						<>
							<InlineMessage
								className='mt-1 text-100 -ml-1'
								appearance='warning'
								message={error ?? 'unexpected error'}
								fieldId={`${id}-error-message`}
							/>

							<div>
								{errorActions?.map((action, index) => (
									<span
										key={index}
										className={actionItemClasses}
									>
										{action}
									</span>
								))}
							</div>
						</>
					)
				}
				{
					(!isError && !isSaving && actions.length > 0) && (
						<div className='mt-1'>
							{actions?.map((action, index) => (
								<span
									key={index}
									className={actionItemClasses}
								>
									{action}
								</span>
							))}
						</div>
					)
				}
				{afterContent}
			</div >
			{children && (
				<div
					className={shouldRenderNestedCommentsInline ? 'col-span-full' : 'xs:col-start-2 xs:col-end-3'}
				>
					{children}
				</div>
			)
			}
			{
				highlighted && (
					<div
						className='absolute -top-2 -left-2 w-[calc(100%+16px)] h-[calc(100%+16px)] bg-neutral-100 dark:bg-dark-neutral-200 -z-100 pointer-events-none col-span-full row-start-1 row-end-3 xs:row-end-1 transition-colors duration-150'
						data-testid={testId ? 'highlighting' : undefined}
						aria-hidden
					/>
				)
			}
		</div >
	);
};