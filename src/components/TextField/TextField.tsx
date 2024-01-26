'use client';
import { ChangeEventHandler, FocusEventHandler } from 'react';
import InlineMessage from '@/components/InlineMessage/InlineMessage';
import { GeneralProps } from '@/types/shared';
import { useParams } from 'next/navigation';
import { Locales, fallbackLng } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';

export type Props = {
	isDisabled?: boolean,
	isInvalid?: boolean,
	isReadOnly?: boolean,
	isRequired?: boolean,
	name: string,
	placeholder?: string,
	onChange: ChangeEventHandler<HTMLInputElement>,
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
} & GeneralProps;

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
	...props
}: Props) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);

	const labelClasses = [
		'block mb-1 text-100 font-regular text-dark-neutral-0 dark:text-neutral-400 cursor-[inherit] transition-colors duration-150',
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
			{...props}
		>
			<label
				className={labelClasses}
				id={`label-${id}`}
				htmlFor={id}
			>
				{label}
				{isRequired && (
					<span
						className='pl-0.5 text-red-800 dark:text-red-300 transition-colors duration-150'
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
					aria-labelledby={error ? `${id}-error-message` : undefined}
					aria-invalid={isInvalid}
				/>
				{clearButton && (
					<button
						className='text-dark-neutral-0 dark:text-neutral-400 w-5 h-5 absolute top-1/2 right-[0.5rem] -translate-y-1/2 text-0 transition-colors duration-150'
						onClick={onClear}
					>
						{t('textField.button')}
						<svg className='fill-current' viewBox='0 0 20 20'>
							<use href={'/assets/icons/cancel.svg#cancel'}></use>
						</svg>
					</button>
				)}
			</div>
			{error && (
				<InlineMessage
					className='mt-1'
					message={error}
					fieldId={`${id}-error-message`}
				/>
			)}
		</div>
	);
};