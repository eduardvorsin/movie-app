'use client';
import { GeneralProps } from '@/types/shared';
import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react';

export type Props = {
	id: string,
	label: string,
	name: string,
	value: string,
	isChecked: boolean,
	onChange: ChangeEventHandler<HTMLInputElement>,
	appearance?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success',
	size?: 'regular' | 'large',
	uncheckedIcon?: ReactNode,
	checkedIcon?: ReactNode,
	onBlur?: FocusEventHandler<HTMLInputElement>,
	onFocus?: FocusEventHandler<HTMLInputElement>,
	labelHidden?: boolean,
	isDisabled?: boolean,
	defaultChecked?: boolean,
} & GeneralProps;

const appearances = {
	primary: 'bg-blue-700 dark:bg-blue-300',
	secondary: 'bg-neutral-800 dark:bg-dark-neutral-800',
	success: 'bg-green-700 dark:bg-green-300',
	danger: 'bg-red-700 dark:bg-red-300',
	warning: 'bg-yellow-700 dark:bg-yellow-300',
} as const;

export default function Toggle({
	id,
	label,
	name,
	value,
	size,
	uncheckedIcon,
	checkedIcon,
	appearance = 'primary',
	onChange,
	onBlur,
	onFocus,
	isChecked,
	labelHidden,
	isDisabled,
	defaultChecked,
	className,
	testId,
	...props
}: Props) {
	const inputWrapperClasses = [
		'text-neutral-100 dark:text-dark-neutral-100  relative transition-colors duration-150',
		appearances[appearance],
		size === 'large' ? 'w-[4.375rem] h-[2.1875rem] rounded-[2.1875rem]' : 'w-[3.75rem] h-[1.875rem] rounded-[1.875rem]',
		isDisabled ? 'opacity-disabled cursor-not-allowed' : '',
	].join(' ');

	const inputClasses = [
		'w-full h-full appearance-none cursor-pointer inline-flex p-1 relative disabled:cursor-not-allowed before:bg-neutral-100 dark:before:bg-dark-neutral-100 before:absolute before:rounded-[50%] before:z-100 before:transition-transform before:transition-colors before:duration-150 before:translate-x-0',
		size === 'large' ? 'rounded-[2.1875rem] before:w-[1.6875rem] before:h-[1.6875rem] checked:before:translate-x-[2.1875rem]' : 'rounded-[1.875rem] before:w-[1.375rem] before:h-[1.375rem] checked:before:translate-x-[1.875rem]',
	].join(' ');

	const labelClasses = [
		'text-neutral-800 dark:text-dark-neutral-800 mr-2 transition-colors duration-150',
		isDisabled ? 'opacity-disabled cursor-not-allowed' : '',
		labelHidden ? 'sr-only' : '',
	].join(' ');

	const iconWrapperClasses = [
		'pointer-events-none absolute top-1/2 -translate-y-1/2 z-0 fill-current',
		size === 'large' ? 'w-[calc(1.6875rem-2px)] h-[calc(1.6875rem-2px)]' : 'w-[calc(1.375rem-2px)] h-[calc(1.375rem-2px)]',
	].join(' ');

	return (
		<div
			className={`flex items-center ${className}`}
			data-testid={testId}
			{...props}
		>
			<label
				className={labelClasses}
				htmlFor={`${id}-switch-1`}
			>
				{label}
			</label>
			<div className={inputWrapperClasses}>
				<input
					className={inputClasses}
					role='switch'
					type='checkbox'
					onBlur={onBlur}
					onFocus={onFocus}
					onChange={onChange}
					defaultChecked={defaultChecked}
					checked={isChecked}
					disabled={isDisabled}
					name={name}
					value={value}
					id={`${id}-switch-1`}
				/>
				{uncheckedIcon && (
					<span
						className={`${iconWrapperClasses} left-[0.3125rem]`}
					>
						{uncheckedIcon}
					</span>
				)}
				{checkedIcon && (
					<span
						className={`${iconWrapperClasses} right-[0.3125rem]`}
					>
						{checkedIcon}
					</span>
				)}
			</div>
		</div>
	);
};