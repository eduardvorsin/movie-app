'use client';
import { ChangeEventHandler, FocusEventHandler, FormEventHandler } from 'react';
import Button from '../Button/Button';
import InlineMessage from '../InlineMessage/InlineMessage';
import Loupe from '../../assets/icons/loupe.svg?url';

type Props = {
	value: string,
	id: string,
	label: string,
	onChange: ChangeEventHandler<HTMLInputElement>,
	onSubmit: FormEventHandler<HTMLFormElement>,
	onFocus?: FocusEventHandler<HTMLInputElement>,
	onBlur?: FocusEventHandler<HTMLInputElement>,
	labelHidden?: boolean,
	className?: string,
	testId?: string,
	isDisabled?: boolean,
	isReadOnly?: boolean,
	isInvalid?: boolean,
	placeholder?: string,
	error?: string,
};

export default function Search({
	id,
	className,
	testId,
	isDisabled,
	isReadOnly,
	isInvalid,
	placeholder,
	label,
	labelHidden,
	error,
	value,
	onChange,
	onFocus,
	onBlur,
	onSubmit,
}: Props) {
	const labelClasses = [
		'block text-100 mb-1 text-neutral-1000 dark:text-dark-neutral-1000',
		labelHidden ? 'sr-only' : '',
	].join('');

	const inputClasses = [
		'outline-none w-full h-[2.25rem] py-2 pl-[0.375rem] pr-8 bg-neutral-0 dark:bg-dark-neutral-200 border-neutral-300 dark:border-dark-neutral-350 text-neutral-1000 dark:text-dark-neutral-900 rounded rounded-[0.1875rem] border-2 text-100 enabled:hover:bg-neutral-100 enabled:hover:border-neutral-400 dark:enabled:hover:bg-dark-neutral-250 dark:enabled:hover:border-dark-neutral-350 focus:border-blue-500 dark:focus:border-blue-300 transition-colors duration-150 ',
		isInvalid ? 'border-red-600 dark:border-red-300' : 'border-neutral-300 dark:border-dark-neutral-350',
	].join('');

	return (
		<div
			className={className}
			data-testid={testId}
		>
			<form
				onSubmit={onSubmit}
			>
				<div
					role='search'
				>
					<label
						className={labelClasses}
						htmlFor={id}
					>
						{label}
					</label>
					<div
						className='relative'
					>
						<input
							className={inputClasses}
							id={id}
							type='text'
							placeholder={placeholder}
							disabled={isDisabled}
							readOnly={isReadOnly}
							onChange={onChange}
							value={value}
							onFocus={onFocus}
							onBlur={onBlur}
						/>
						<Button
							appearance='ghost'
							className='absolute top-1/2 right-[0.375rem] -translate-y-1/2'
							isDisabled={isDisabled}
							iconButton
						>
							<svg
								className='w-6 h-6 p-0.5 fill-current'
								viewBox='0 0 32 32'
							>
								<use href={`${Loupe.src}#loupe`}></use>
							</svg>
							Search
						</Button>
					</div>
				</div>
			</form>
			{error && (
				<InlineMessage
					className='mt-1'
					message={error}
					fieldId={`${id}-error-message`}
					appearance='error'
				/>
			)}
		</div>

	);
}