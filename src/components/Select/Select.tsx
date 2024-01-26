'use client';
import { FocusEventHandler, KeyboardEventHandler, MouseEventHandler, useCallback, useEffect, useId, useRef, useState } from 'react';
import InlineMessage from '@/components/InlineMessage/InlineMessage';
import SelectOption from '@/components/Select/SelectOption/SelectOption';
import { GeneralProps } from '@/types/shared';

export type SelectOption = {
	label: string,
	value: string,
}

type Props = {
	options: SelectOption[],
	label: string,
	id: string,
	name: string,
	value: string | null,
	placeholder?: string,
	onChange: (optionValue: string) => void,
	onFocus?: FocusEventHandler<HTMLButtonElement>,
	onBlur?: FocusEventHandler<HTMLButtonElement>,
	labelHidden?: boolean,
	isRequired?: boolean,
	isDisabled?: boolean,
	isInvalid?: boolean,
	error?: string,
	closeMenuOnSelect?: boolean,
	closeMenuOnScroll?: boolean,
	openMenuOnFocus?: boolean,
	onKeyDown?: KeyboardEventHandler<HTMLButtonElement | HTMLLIElement>,
	onMenuOpen?: () => void,
	onMenuClose?: () => void,
	maxMenuHeight?: number,
	minMenuHeight?: number,
} & GeneralProps;

export default function Select({
	id,
	error,
	label,
	labelHidden,
	className,
	isDisabled,
	options,
	closeMenuOnSelect,
	placeholder = 'Select an option',
	openMenuOnFocus,
	isInvalid,
	isRequired,
	closeMenuOnScroll,
	value,
	onChange,
	onMenuOpen,
	onMenuClose,
	onFocus,
	onBlur,
	onKeyDown,
	maxMenuHeight = 300,
	minMenuHeight = 130,
	testId,
	...props
}: Props) {
	const uniqueId = useId();
	const listRef = useRef<HTMLUListElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [focusedOption, setFocusedOption] = useState<SelectOption>();

	const focusOption = (option: Element | null | undefined): void => {
		if (!(option instanceof HTMLLIElement)) return;
		option.focus();
	}

	const optionClickHandler: MouseEventHandler<HTMLLIElement> = (e) => {
		const { value, label } = e.currentTarget.dataset;
		if (value === undefined || label === undefined) return;

		if (closeMenuOnSelect) closeSelect();
		onChange(value);
	};

	const optionKeyDownHandler: KeyboardEventHandler<HTMLLIElement> = (e) => {
		const selectionKeys = ['Space', 'Enter', 'Tab'];
		const option = e.currentTarget;
		const { value, label } = option.dataset;
		if (value === undefined || label === undefined) {
			return;
		};

		if (selectionKeys.includes(e.code)) {
			onChange(value);
			if (closeMenuOnSelect) closeSelect();
		}

		if (e.code === 'Escape') closeSelect();

		const focusActions: Record<'Home' | 'End' | 'ArrowUp' | 'ArrowDown', () => void> = {
			Home: () => {
				focusOption(listRef.current?.children[0]);
				setFocusedOption(options[0]);
			},
			End: () => {
				focusOption(listRef.current?.children[options.length - 1]);
				setFocusedOption(options[options.length - 1]);
			},
			ArrowUp: () => optionArrowKeysHandler('ArrowUp'),
			ArrowDown: () => optionArrowKeysHandler('ArrowDown'),
		}

		const focusAction = focusActions[e.code as keyof typeof focusActions];
		if (focusAction) focusAction();

		if (onKeyDown) onKeyDown(e);

		function optionArrowKeysHandler(key: 'ArrowUp' | 'ArrowDown'): void {
			const siblingType = key === 'ArrowUp' ? 'previousElementSibling' : 'nextElementSibling';
			const sibling = e.currentTarget[siblingType] as HTMLLIElement;
			if (!sibling) return;

			const { label, value } = sibling.dataset;
			if (label !== undefined && value !== undefined) {
				focusOption(sibling);
				setFocusedOption({ label, value });
			}
		};
	};

	const mouseDownHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		return isOpen ? closeSelect() : openSelect();
	};

	const openSelect = (): void => {
		if (!isOpen && onMenuOpen) onMenuOpen();
		setIsOpen(true);
	}

	const closeSelect = useCallback<() => void>(() => {
		if (isOpen && onMenuClose) onMenuClose();
		setIsOpen(false);
	}, [isOpen, onMenuClose]);

	const buttonFocusHandler: FocusEventHandler<HTMLButtonElement> = (e) => {
		if (openMenuOnFocus) openSelect();
		const optionElement = listRef.current?.children[0] as HTMLLIElement;
		setTimeout(() => optionElement.focus(), 0);
		if (onFocus) onFocus(e);
	};

	const buttonKeyDownHandler: KeyboardEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		const openingKeys = ['ArrowDown', 'ArrowUp', 'Enter', 'Space'];
		if (openingKeys.includes(e.code)) {
			openSelect();
		} else if (e.code === 'Escape') {
			closeSelect();
		}

		if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
			const currentIndex = findCurrentIndex(e.code, focusedOption);
			if (options[currentIndex] === undefined) return;

			setFocusedOption({
				value: options[currentIndex].value,
				label: options[currentIndex].label,
			});
			setTimeout(() => {
				focusOption(listRef.current?.children[currentIndex]);
			}, 0);
		}

		if (onKeyDown) onKeyDown(e);

		function findCurrentIndex(key: 'ArrowUp' | 'ArrowDown', option?: SelectOption): number {
			if (!option) return key === 'ArrowUp' ? options.length - 1 : 0;
			const index = options.findIndex(o => o.value === option?.value);
			return key === 'ArrowUp' ? index - 1 : index + 1;
		}
	}

	const listMouseMoveHandler: MouseEventHandler<HTMLUListElement> = (e) => {
		const target = e.target as HTMLElement;
		if (target.tagName !== 'LI') return;

		const { value, label } = target.dataset;
		if (value === undefined || label === undefined) return;

		setFocusedOption((prevState) => {
			if (focusedOption?.value === value) return prevState;
			return { value, label };
		});
	};

	useEffect(() => {
		const closeOnScrollHandler: EventListener = () => closeSelect();
		if (isOpen && closeMenuOnScroll) {
			window.addEventListener('scroll', closeOnScrollHandler);
		}

		return () => {
			window.removeEventListener('scroll', closeOnScrollHandler);
		}

	}, [isOpen, closeMenuOnScroll, closeSelect]);

	const optionIndex = options.findIndex(o => o.value === value);

	const selectWrapperClasses = [
		'w-full',
		className,
		isDisabled ? 'opacity-disabled cursor-not-allowed' : '',
	].join(' ');

	const labelClasses = [
		'block mb-1',
		labelHidden ? 'sr-only' : '',
	].join(' ');

	const selectListClasses = [
		'w-full absolute z-300 mt-2 rounded-1 border-2 border-neutral-300 dark:border-dark-neutral-350 shadow-md bg-neutral-0 dark:bg-dark-neutral-250 overflow-y-auto transition-colors duration-150',
		isOpen ? 'block' : 'hidden',
	].join(' ');

	const selectButtonClasses = [
		'w-full text-left rounded-1 border-2  px-[0.375rem] py-[0.125rem] min-h-[2.5rem] text-100 text-neutral-700 dark:text-dark-neutral-700 bg-neutral-0 dark:bg-dark-neutral-200 enabled:hover:bg-neutral-100 dark:enabled:hover:bg-dark-neutral-250 focus:border-blue-500 dark:focus:border-blue-300 transition-colors duration-150 leading-2 truncate',
		isInvalid ? 'border-red-600 dark:border-red-500' : ' border-neutral-300 dark:border-dark-neutral-350 enabled:hover:border-neutral-400 dark:enabled:hover:border-dark-neutral-500',
		isDisabled ? 'cursor-not-allowed' : '',
	].join(' ');

	return (
		<div
			id={id}
			className={selectWrapperClasses}
			data-testid={testId}
			{...props}
		>
			<label
				id={`${uniqueId}label`}
				className={labelClasses}
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
				aria-required={isRequired}
			>
				<button
					className={selectButtonClasses}
					disabled={isDisabled}
					onFocus={buttonFocusHandler}
					onBlur={onBlur}
					onMouseDown={mouseDownHandler}
					onKeyDown={buttonKeyDownHandler}
					role='combobox'
					aria-expanded={isOpen}
					aria-labelledby={`${uniqueId}label`}
					aria-controls={`${uniqueId}listbox`}
					aria-haspopup='listbox'
					aria-activedescendant={focusedOption ? `${uniqueId}list-option-${focusedOption?.label}` : undefined}
					aria-invalid={isInvalid}
				>
					{optionIndex === -1 ? placeholder : options[optionIndex].label}
				</button>

				<ul
					className={selectListClasses}
					role='listbox'
					id={`${uniqueId}listbox`}
					aria-labelledby={`${uniqueId}label`}
					ref={listRef}
					onMouseMove={listMouseMoveHandler}
					style={{
						maxHeight: `${maxMenuHeight}px`,
						minHeight: `${minMenuHeight}px`,
					}}
				>
					{options.map((option) => (
						<SelectOption
							key={option.label}
							id={`${uniqueId}list-option-${option.label}`}
							onKeyDown={optionKeyDownHandler}
							onClick={optionClickHandler}
							value={option.value}
							label={option.label}
							isSelected={value === option.value}
							isFocused={focusedOption?.value === option.value}
						/>
					))}
				</ul>
			</div>

			{error && (
				<InlineMessage
					className='mt-1'
					appearance='error'
					message={error}
					fieldId={`${id}-error-message`}
				/>
			)}
		</div>
	);
};