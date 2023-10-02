import { ReactNode } from 'react';
import CommentInfoItem from '../CommentInfoItem/CommentInfoItem';
import InlineMessage from '../InlineMessage/InlineMessage';
import Locked from '../../assets/icons/locked.svg?url';
import Title from '../Title/Title';

type Props = {
	id: string,
	author: string,
	avatar: ReactNode,
	content: string,
	type: string,
	titleElement: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
	className?: string,
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
	testId?: string,
};

export default function Comment({
	className,
	id,
	avatar,
	content,
	author,
	time,
	isEdited,
	restrictedTo,
	actions,
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
}: Props) {
	const classes = [
		'grid grid-cols-[auto_1fr] gap-x-2 gap-y-4 p-2 relative',
		className
	].join(' ');
	const actionItemClasses = 'before:content-["·"] before:ml-1 before:mr-1 first:before:hidden';

	return (
		<div
			className={classes}
			id={id}
			data-testid={testId}
			aria-describedby={`${id}-error-message`}
		>
			{avatar}
			<div className='text-100'>
				<Title
					level={6}
					as={titleElement}
					className='flex items-center flex-wrap text-neutral-800 dark:text-dark-neutral-800'
				>
					<CommentInfoItem
						className='mr-2 last:mr-0 mb-1 text-100'
						type='author'
					>
						{author}
					</CommentInfoItem>
					<span
						className='px-1 text-75 uppercase bg-neutral-300 dark:bg-dark-neutral-300 max-w-[200px] inline-block rounded-[0.1875rem] font-bold align-middle truncate mr-2 last:mr-0 mb-1'
					>
						{type}
					</span>
					{isSaving && (
						<span
							className='mr-2 last:mr-0 mb-1 text-100 font-regular max-w-[120px] truncate'
						>
							{savingText ?? 'Sending...'}
						</span>
					)}
					{!isError && !isSaving && time ?
						(
							<CommentInfoItem
								className='mr-2 last:mr-0 mb-1 text-100 font-regular'
								type='time'
							>
								{time}
							</CommentInfoItem>
						) : null
					}
					{isEdited && (
						<span
							className='text-neutral-700 dark:text-dark-neutral-700 mr-2 last:mr-0 mb-1 font-regular text-100'
						>
							Edited
						</span>
					)}
					{restrictedTo && (
						<span
							className='mr-2 last:mr-0 mb-1 text-100 font-medium inline-flex items-center text-neutral-700 dark:text-dark-neutral-700'
						>
							<svg className='w-4 h-4 mr-1 fill-current' viewBox='0 0 20 20'>
								<use href={`${Locked.src}#locked`}></use>
							</svg>
							<span className='max-w-[200px] truncate'>
								{restrictedTo}
							</span>
						</span>
					)}
				</Title>
				<p
					className={`mb-2 ${isError ? 'text-neutral-400' : 'text-neutral-1000 dark:text-dark-neutral-900'}`}
				>
					{content}
				</p>
				{(isError && !isSaving) && (
					<>
						<InlineMessage
							className='mb-1 text-100 -ml-1'
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
				)}
				{(!isError && !isSaving) && (
					<div>
						{actions?.map((action) => (
							<span
								className={actionItemClasses}
							>
								{action}
							</span>
						))}
					</div>
				)}
				{afterContent}
			</div>
			{children && (
				<div
					className={shouldRenderNestedCommentsInline ? 'col-span-full' : 'col-start-2 col-end-3'}
				>
					{children}
				</div>
			)}
			{highlighted && (
				<div
					className='absolute -top-2 -left-2 w-[calc(100%+16px)] h-[calc(100%+16px)] bg-neutral-100 dark:bg-dark-neutral-200 -z-100 pointer-events-none col-span-full row-start-1 row-end-1'
					aria-hidden
				/>
			)}
		</div>
	);
};

