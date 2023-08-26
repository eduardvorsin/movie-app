'use client';
import { ChangeEventHandler } from 'react';
import Radio from '../Radio/Radio';

type Choice = {
	value: string,
	label: string,
	id?: string,
	disabled?: boolean,
}

type Props = {
	className?: string,
	titleHidden?: boolean,
	isDisabled?: boolean,
	error?: string,
	choices: Choice[],
	onChange?: ChangeEventHandler<HTMLInputElement>,
	testId?: string,
	name?: string,
	value: string,
	title?: string,
	isRequired?: boolean,
	isInvalid?: boolean,
};

export default function RadioGroup({
	className,
	titleHidden,
	isDisabled,
	error,
	choices,
	onChange,
	testId,
	name,
	value,
	title,
	isRequired,
	isInvalid,
}: Props) {
	const groupClasses = [
		'',
		isDisabled ? 'opacity-disabled cursor-not-allowed' : 'cursor-pointer',
		className,
	].join(' ');
	const titleClasses = [
		'mb-2 text-dark-neutral-0 dark:text-neutral-0',
		titleHidden ? 'sr-only' : '',
	].join(' ');

	return (
		<fieldset
			className={groupClasses}
			data-testid={testId}
		>
			<legend
				className={titleClasses}
			>
				{title}
				{isRequired && (
					<span
						className='pl-0.5 text-red-800 dark:text-red-300'
						aria-hidden='true'
					>
						*
					</span>
				)}
			</legend>

			<ul>
				{choices.map((choice) => (
					<li
						className='mb-1'
						key={value}
					>
						<Radio
							id={choice.id}
							name={name}
							label={choice.label}
							value={choice.value}
							isRequired={isRequired}
							isDisabled={choice.disabled || isDisabled}
							isInvalid={isInvalid}
							isChecked={choice.value === value}
							onChange={onChange}
						/>
					</li>
				))}
			</ul>

			{error && (
				<p className='mt-1 text-red-800 dark:text-red-300 flex items-center text-75'>
					<svg
						className='fill-current w-4 h-4 mr-0.5'
						viewBox="0 0 20 20">
						<path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z" />
						<path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
						<path fillRule="evenodd" d="M11.237 3.177a1.75 1.75 0 0 0-2.474 0l-5.586 5.585a1.75 1.75 0 0 0 0 2.475l5.586 5.586a1.75 1.75 0 0 0 2.474 0l5.586-5.586a1.75 1.75 0 0 0 0-2.475l-5.586-5.585Zm-1.414 1.06a.25.25 0 0 1 .354 0l5.586 5.586a.25.25 0 0 1 0 .354l-5.586 5.585a.25.25 0 0 1-.354 0l-5.586-5.585a.25.25 0 0 1 0-.354l5.586-5.586Z" />
					</svg>
					{error}
				</p>
			)}
		</fieldset>
	);
};

