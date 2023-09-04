'use client';
import { ChangeEventHandler, FocusEventHandler } from 'react';

export type Props = {
	className?: string,
	isDisabled?: boolean,
	isInvalid?: boolean,
	isReadOnly?: boolean,
	isRequired?: boolean,
	name: string,
	placeholder?: string,
	onChange: ChangeEventHandler<HTMLInputElement>,
	testId?: string,
	value: string,
	label: string,
	labelHidden?: boolean,
	clearButton?: boolean,
	error?: string,
	id: string,
	autoComplete?: string,
	pattern?: string,
	maxLength?: number,
	minLength?: number,
	onClear?: () => void,
	onFocus?: FocusEventHandler<HTMLInputElement>,
	onBlur?: FocusEventHandler<HTMLInputElement>,
	inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
	type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
};

export default function TextField({
	className,
	isDisabled,
	isInvalid,
	isReadOnly,
	isRequired,
	name,
	placeholder,
	onChange,
	testId,
	value,
	label,
	labelHidden,
	clearButton,
	error,
	id,
	autoComplete,
	pattern,
	maxLength,
	minLength,
	onClear,
	onFocus,
	onBlur,
	inputMode,
	type,
}: Props) {

	const labelClasses = [
		'block mb-1 text-100 font-regular text-dark-neutral-0 dark:text-neutral-400 cursor-[inherit]',
		labelHidden ? 'sr-only' : ''
	].join(' ');
	const inputClasses = [
		'cursor-[inherit] py-1 text-100 leading-2 font-regular block w-full min-h-[2.25rem] border-2 text-dark-neutral-0 placeholder-dark-neutral-700 rounded-1 transition-colors ease-ease-in-out duration-150 enabled:hover:bg-neutral-100 focus:outline-none enabled:focus:border-blue-500 dark:bg-dark-neutral-200 dark:enabled:hover:bg-dark-neutral-250 dark:text-neutral-400 dark:placeholder-neutral-600 dark:enabled:focus:border-blue-300',
		isInvalid ? 'border-red-600 dark:border-red-300' : 'border-neutral-300 dark:border-dark-neutral-350',
		clearButton ? 'pl-3 pr-8' : 'px-3',
		className
	].join(' ');

	return (
		<div
			className={isDisabled ? 'opacity-disabled cursor-not-allowed' : ''}
			data-testid={testId}
		>
			<label
				className={labelClasses}
				id={`label-${id}`}
				htmlFor={id}
			>
				{label}
				{isRequired && (
					<span
						className='pl-0.5 text-red-800 dark:text-red-300'
						aria-hidden='true'
					>
						*
					</span>
				)}
			</label>
			<div
				className='relative'
			>
				<input
					className={inputClasses}
					value={value}
					id={id}
					name={name}
					role={type === 'search' ? 'searchbox' : undefined}
					disabled={isDisabled}
					required={isRequired}
					type={type === 'search' ? 'text' : type}
					inputMode={inputMode}
					minLength={minLength}
					maxLength={maxLength}
					pattern={pattern}
					autoComplete={autoComplete}
					placeholder={placeholder}
					readOnly={isReadOnly}
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					aria-invalid={isInvalid}
				/>
				{clearButton && (
					<button
						className='text-dark-neutral-0 dark:text-neutral-400 w-5 h-5 absolute top-1/2 right-[0.5rem] -translate-y-1/2 text-[0rem]'
						onClick={onClear}
					>
						clear
						<svg
							className='fill-current'
							viewBox="0 0 20 20"
						>
							<path fillRule="evenodd" d="M10 15.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm3.03-10.03a.75.75 0 0 1 0 1.06l-1.97 1.97 1.97 1.97a.75.75 0 1 1-1.06 1.06l-1.97-1.97-1.97 1.97a.75.75 0 0 1-1.06-1.06l1.97-1.97-1.97-1.97a.75.75 0 0 1 1.06-1.06l1.97 1.97 1.97-1.97a.75.75 0 0 1 1.06 0Z" />
						</svg>
					</button>
				)}
			</div>
			{error && (
				<p
					className='mt-1 text-red-800 dark:text-red-300 flex items-center text-75'
				>
					<svg
						className='fill-current w-4 h-4 mr-0.5'
						viewBox='0 0 20 20'
					>
						<path d='M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z' />
						<path d='M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' />
						<path fillRule='evenodd' d='M11.237 3.177a1.75 1.75 0 0 0-2.474 0l-5.586 5.585a1.75 1.75 0 0 0 0 2.475l5.586 5.586a1.75 1.75 0 0 0 2.474 0l5.586-5.586a1.75 1.75 0 0 0 0-2.475l-5.586-5.585Zm-1.414 1.06a.25.25 0 0 1 .354 0l5.586 5.586a.25.25 0 0 1 0 .354l-5.586 5.585a.25.25 0 0 1-.354 0l-5.586-5.585a.25.25 0 0 1 0-.354l5.586-5.586Z' />
					</svg>
					{error}
				</p>
			)}
		</div>
	);
};