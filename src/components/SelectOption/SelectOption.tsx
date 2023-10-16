'use client';
import { KeyboardEventHandler, MouseEventHandler } from 'react';

type Props = {
	id: string,
	label: string,
	value: string,
	isFocused: boolean,
	isSelected: boolean,
	onKeyDown: KeyboardEventHandler<HTMLLIElement>,
	onClick: MouseEventHandler<HTMLLIElement>,
	className?: string,
};

export default function SelectOption({
	id,
	label,
	value,
	isFocused,
	isSelected,
	onKeyDown,
	onClick,
	className,
}: Props) {
	const classes = [
		'outline-none break-words px-[0.625rem] py-[0.375rem] text-100 leading-2 transition-colors duration-150 select-none relative before:w-[0.125rem] before:h-full before:absolute before:left-0 before:top-0 before:bg-transparent before:transition-colors before:duration-150',
		(!isFocused && isSelected) || (isFocused && isSelected) ? 'bg-blue-100 text-blue-800 dark:text-blue-300 dark:bg-blue-900' : '',
		isFocused && !isSelected ? 'bg-neutral-200 dark:bg-dark-neutral-350 before:bg-blue-700 dark:before:bg-blue-400' : '',
		!isFocused && !isSelected ? 'bg-neutral-0 dark:bg-dark-neutral-250 text-neutral-700 dark:text-dark-neutral-700' : '',
		className,
	].join(' ');

	return (
		<li
			id={id}
			className={classes}
			onKeyDown={onKeyDown}
			onClick={onClick}
			role='option'
			tabIndex={-1}
			aria-selected={isSelected}
			data-value={value}
			data-label={label}
		>
			{label}
		</li>
	);
};