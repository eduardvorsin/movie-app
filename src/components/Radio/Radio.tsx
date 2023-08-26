'use client';
import { ChangeEventHandler, FocusEventHandler } from 'react';

type Props = {
	className?: string,
	id?: string,
	value?: string,
	testId?: string,
	name?: string,
	label?: string,
	isChecked?: boolean,
	isDisabled?: boolean,
	isRequired?: boolean,
	isInvalid?: boolean,
	onChange?: ChangeEventHandler<HTMLInputElement>,
	onFocus?: FocusEventHandler<HTMLInputElement>,
	onBlur?: FocusEventHandler<HTMLInputElement>,
};

export default function Radio({
	className,
	id,
	value,
	name,
	label,
	testId,
	isDisabled,
	isChecked,
	isRequired,
	isInvalid,
	onChange,
	onFocus,
	onBlur,
}: Props) {
	const labelClasses = [
		'inline-flex py-1 pl-5 items-center',
		isDisabled ? 'opacity-disabled cursor-not-allowed' : 'cursor-pointer',
		className,
	].join(' ');

	return (
		<label
			className={labelClasses}
			data-testid={testId}
		>
			<input
				className='appearance-none absolute peer'
				type='radio'
				id={id}
				name={name}
				disabled={isDisabled}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				value={value}
				checked={isChecked}
				required={isRequired}
				data-invalid={isInvalid}
			/>
			<span
				className='relative w-5 h-5 -ml-5 rounded-full border-2 border-neutral-500 peer-checked:border-blue-500 peer-focus:border-blue-500 peer-data-[invalid]:border-red-600 transition-colors duration-100 ease-linear dark:peer-data-[invalid]:border-red-500  dark:peer-focus:border-blue-300 dark:peer-checked:border-blue-300 dark:border-dark-neutral-800 after:w-2 after:h-2 after:rounded-full after:absolute peer-checked:after:bg-blue-700 dark:peer-checked:after:bg-blue-400 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2'
			/>
			<span
				className='ml-2 text-100 text-dark-neutral-0 dark:text-neutral-0'
			>
				{label}
			</span>
		</label>
	);
};