'use client';
import { ChangeEventHandler, FocusEventHandler } from 'react';
import InlineMessage from '@/components/InlineMessage/InlineMessage';
import Accept from '../../assets/icons/accept.svg?url';
import { GeneralProps } from '@/types/shared';

export type Props = {
	id: string,
	value: string,
	name: string,
	label: string,
	isChecked: boolean,
	onChange: ChangeEventHandler<HTMLInputElement>,
	size?: 'small' | 'medium' | 'large' | 'xlarge',
	error?: string,
	isDisabled?: boolean,
	isRequired?: boolean,
	isInvalid?: boolean,
	onFocus?: FocusEventHandler<HTMLInputElement>,
	onBlur?: FocusEventHandler<HTMLInputElement>,
} & GeneralProps;

const sizeTypes = {
	small: 'w-3 h-3',
	medium: 'w-4 h-4',
	large: 'w-5 h-5',
	xlarge: 'w-6 h-6',
}

export default function Checkbox({
	className,
	id,
	value,
	size = 'medium',
	name,
	label,
	testId,
	error,
	isDisabled,
	isChecked,
	isRequired,
	isInvalid,
	onChange,
	onFocus,
	onBlur,
	...props
}: Props) {
	const labelClasses = [
		'inline-flex py-1 pl-5 items-center',
		isDisabled ? 'opacity-disabled cursor-not-allowed' : 'cursor-pointer',
	].join(' ');

	return (
		<div
			className={className}
			{...props}
		>
			<label
				className={labelClasses}
				data-testid={testId}
			>
				<input
					className='appearance-none absolute peer'
					type='checkbox'
					id={id}
					name={name}
					disabled={isDisabled}
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					value={value}
					checked={isChecked}
					required={isRequired}
					aria-invalid={isInvalid}
					aria-describedby={error ? `${id}-error-message` : undefined}
					data-invalid={isInvalid}
				/>
				<svg
					className={`${sizeTypes[size]} -ml-5 shrink-0 rounded-1 border-2 border-neutral-500 fill-none peer-checked:bg-blue-700 peer-checked:fill-neutral-0 peer-checked:border-blue-500 peer-focus:border-blue-500 peer-data-[invalid]:border-red-600 transition-colors duration-100 ease-linear dark:peer-data-[invalid]:border-red-500 dark:peer-checked:bg-blue-400 dark:peer-focus:border-blue-300 dark:peer-checked:fill-dark-neutral-0 dark:peer-checked:border-blue-300 dark:border-dark-neutral-800`} viewBox='0 0 20 20'>
					<use href={`${Accept.src}#accept`}></use>
				</svg>
				<span
					className='ml-2 text-100 text-dark-neutral-0 dark:text-neutral-0'
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
				</span>
			</label>
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
};

