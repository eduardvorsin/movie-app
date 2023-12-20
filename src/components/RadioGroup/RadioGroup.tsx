'use client';
import { ChangeEventHandler, useId } from 'react';
import Radio from '@/components/Radio/Radio';
import InlineMessage from '@/components/InlineMessage/InlineMessage';
import { GeneralProps } from '@/types/shared';

export type Choice = {
	value: string,
	label: string,
	id: string,
	disabled?: boolean,
}

export type Props = {
	id: string,
	titleHidden?: boolean,
	isDisabled?: boolean,
	error?: string,
	choices: Choice[],
	onChange: ChangeEventHandler<HTMLInputElement>,
	name: string,
	value: string,
	title?: string,
	isRequired?: boolean,
	isInvalid?: boolean,
} & GeneralProps;

export default function RadioGroup({
	id,
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
	...props
}: Props) {
	const groupClasses = [
		'',
		isDisabled ? 'opacity-disabled cursor-not-allowed' : '',
		className,
	].join(' ');
	const titleClasses = [
		'mb-2 text-dark-neutral-0 dark:text-neutral-0',
		titleHidden ? 'sr-only' : '',
	].join(' ');

	const uniqueId = useId();

	return (
		<fieldset
			className={groupClasses}
			data-testid={testId}
			{...props}
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

			<ul
				aria-labelledby={`${id}-error-message`}
			>
				{choices.map((choice) => (
					<li
						className='mb-1'
						key={choice.id}
					>
						<Radio
							id={`${choice.id}-${uniqueId}`}
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
				<InlineMessage
					className='mt-1'
					appearance='error'
					message={error}
					fieldId={`${id}-error-message`}
				/>
			)}
		</fieldset>
	);
};