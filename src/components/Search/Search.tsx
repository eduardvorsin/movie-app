import { ChangeEventHandler, FocusEventHandler, FormEventHandler, KeyboardEventHandler } from 'react';
import Button from '@/components/Button/Button';
import InlineMessage from '@/components/InlineMessage/InlineMessage';
import { GeneralProps } from '@/types/shared';

type ConditionalProps = {
	clearButton: true,
	dictionary: Record<'button' | 'clearButton', string>,
} | {
	clearButton: false,
	dictionary: Record<'button', string>,
};

export type Props = {
	value: string,
	id: string,
	label: string,
	name: string,
	onChange: ChangeEventHandler<HTMLInputElement>,
	onSubmit: FormEventHandler<HTMLFormElement>,
	onFocus?: FocusEventHandler<HTMLInputElement>,
	onBlur?: FocusEventHandler<HTMLInputElement>,
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>,
	onClear?: () => void,
	labelHidden?: boolean,
	isDisabled?: boolean,
	isReadOnly?: boolean,
	isInvalid?: boolean,
	placeholder?: string,
	error?: string,
} & ConditionalProps & GeneralProps;

export default function Search({
	id,
	className,
	name,
	testId,
	isDisabled,
	isReadOnly,
	isInvalid,
	placeholder,
	label,
	labelHidden,
	error,
	value,
	clearButton,
	onChange,
	onFocus,
	onBlur,
	onSubmit,
	onKeyDown,
	onClear,
	dictionary,
	...props
}: Props) {
	const labelTextClasses = [
		'block text-100 mb-1 text-neutral-1000 dark:text-dark-neutral-1000 transition-colors duration-150',
		labelHidden ? 'sr-only' : '',
	].join(' ');

	const inputClasses = [
		'outline-none w-full h-[2.25rem] py-2 bg-neutral-0 dark:bg-dark-neutral-200 border-neutral-300 dark:border-dark-neutral-350 text-neutral-1000 dark:text-dark-neutral-900 rounded rounded-[0.1875rem] border-2 text-100 enabled:hover:bg-neutral-100 enabled:hover:border-neutral-400 dark:enabled:hover:bg-dark-neutral-250 dark:enabled:hover:border-dark-neutral-350 focus:border-blue-500 dark:focus:border-blue-300 transition-colors duration-150 ',
		isDisabled ? 'opacity-disabled cursor-not-allowed' : '',
		isInvalid ? 'border-red-600 dark:border-red-300' : 'border-neutral-300 dark:border-dark-neutral-350',
		clearButton ? 'px-8' : 'pl-2 pr-8',
	].join(' ');

	return (
		<div
			className={className}
			data-testid={testId}
			{...props}
		>
			<form
				role='search'
				onSubmit={onSubmit}
				autoComplete='off'
			>
				<label>
					<span className={labelTextClasses}>{label}</span>
					<div className='relative'>
						<input
							className={inputClasses}
							id={id}
							type='text'
							name={name}
							placeholder={placeholder}
							disabled={isDisabled}
							readOnly={isReadOnly}
							onChange={onChange}
							value={value}
							onFocus={onFocus}
							onBlur={onBlur}
							onKeyDown={onKeyDown}
							aria-invalid={isInvalid}
							inputMode='search'
						/>

						{clearButton && (
							<Button
								className='[&]:text-neutral-400 enabled:hover:[&]:text-neutral-300 enabled:active:[&]:text-neutral-200 dark:[&]:text-dark-neutral-600 dark:enabled:hover:text-dark-neutral-700 dark:enabled:active:text-dark-neutral-800 absolute left-[0.375rem] top-1/2 -translate-y-1/2'
								appearance='secondary'
								type='button'
								iconButton
								onClick={onClear}
							>
								<svg className='w-6 h-6 fill-current' viewBox='0 0 32 32'>
									<use href={'/assets/icons/cancel.svg#cancel'}></use>
								</svg>
								{dictionary.clearButton}
							</Button>
						)}

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
								<use href={'/assets/icons/loupe.svg#loupe'}></use>
							</svg>
							{dictionary.button}
						</Button>
					</div>
				</label>
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