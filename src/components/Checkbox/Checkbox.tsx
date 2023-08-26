'use client';
import { ChangeEventHandler, FocusEventHandler } from 'react';

type Props = {
	className?: string,
	id?: string,
	value?: string,
	testId?: string,
	size?: 'small' | 'medium' | 'large' | 'xlarge',
	name?: string,
	label?: string,
	error?: string,
	isChecked?: boolean,
	defaultChecked?: boolean,
	isDisabled?: boolean,
	isRequired?: boolean,
	isInvalid?: boolean,
	onChange?: ChangeEventHandler<HTMLInputElement>,
	onFocus?: FocusEventHandler<HTMLInputElement>,
	onBlur?: FocusEventHandler<HTMLInputElement>,
};

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
	defaultChecked,
	onChange,
	onFocus,
	onBlur,
}: Props) {
	const labelClasses = [
		'inline-flex py-1 pl-5 items-center',
		sizeTypes[size],
		isDisabled ? 'opacity-disabled cursor-not-allowed' : 'cursor-pointer',
	].join(' ');

	return (
		<div
			className={className}
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
					defaultChecked={defaultChecked}
					required={isRequired}
					aria-invalid={isInvalid}
					data-invalid={isInvalid}
				/>
				<svg
					className='-ml-5 w-5 h-5 rounded-1 border-2 border-neutral-500 fill-none peer-checked:bg-blue-700 peer-checked:fill-neutral-0 peer-checked:border-blue-500 peer-focus:border-blue-500 peer-data-[invalid]:border-red-600 transition-colors duration-100 ease-linear dark:peer-data-[invalid]:border-red-500 dark:peer-checked:bg-blue-400 dark:peer-focus:border-blue-300 dark:peer-checked:fill-dark-neutral-0 dark:peer-checked:border-blue-300 dark:border-dark-neutral-800'
					viewBox='0 0 20 20'
				>
					<path
						fillRule='evenodd'
						d='M15.78 5.97a.75.75 0 0 1 0 1.06l-6.5 6.5a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 1 1 1.06-1.06l2.72 2.72 5.97-5.97a.75.75 0 0 1 1.06 0Z'
					/>
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
				<p className='mt-1 text-red-800 dark:text-red-300 flex items-center text-75'>
					<svg
						className='fill-current w-4 h-4 mr-0.5'
						viewBox="0 0 20 20">
						<path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z" />
						<path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
						<path fill-rule="evenodd" d="M11.237 3.177a1.75 1.75 0 0 0-2.474 0l-5.586 5.585a1.75 1.75 0 0 0 0 2.475l5.586 5.586a1.75 1.75 0 0 0 2.474 0l5.586-5.586a1.75 1.75 0 0 0 0-2.475l-5.586-5.585Zm-1.414 1.06a.25.25 0 0 1 .354 0l5.586 5.586a.25.25 0 0 1 0 .354l-5.586 5.585a.25.25 0 0 1-.354 0l-5.586-5.585a.25.25 0 0 1 0-.354l5.586-5.586Z" />
					</svg>
					{error}
				</p>
			)}
		</div>
	);
};
