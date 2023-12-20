import { GeneralProps } from '@/types/shared';
import { KeyboardEventHandler, MouseEventHandler } from 'react';

type Props = {
	id: string,
	label: string,
	isActive: boolean,
	ariaControls: string,
	onClick: MouseEventHandler<HTMLButtonElement>,
	onKeyDown: KeyboardEventHandler<HTMLButtonElement>,
	index: number,
	isDisabled?: boolean,
} & GeneralProps;

export default function TabButton({
	className,
	testId,
	id,
	isActive,
	label,
	index,
	isDisabled,
	ariaControls,
	onClick,
	onKeyDown,
	...props
}: Props) {
	const classes = [
		'text-100 font-medium p-1 rounded-[0.1875rem] text-center text-neutral-100 dark:text-dark-neutral-100 transition-colors duration-150',
		isActive ? 'bg-blue-700 dark:bg-blue-300 enabled:hover:bg-blue-800 enabled:active:bg-blue-900 dark:enabled:hover:bg-blue-200 dark:enabled:active:bg-blue-100' : 'bg-neutral-700 dark:bg-dark-neutral-700 enabled:hover:bg-neutral-800 enabled:active:bg-neutral-900 dark:enabled:hover:bg-dark-neutral-800 dark:enabled:active:bg-dark-neutral-900',
		isDisabled ? 'opacity-disabled cursor-not-allowed' : '',
		className,
	].join(' ');

	return (
		<button
			role='tab'
			id={id}
			className={classes}
			onClick={onClick}
			onKeyDown={onKeyDown}
			tabIndex={isActive ? 0 : -1}
			aria-selected={isActive}
			aria-controls={ariaControls}
			data-testid={testId}
			data-index={index}
			disabled={isDisabled}
			{...props}
		>
			{label}
		</button>
	);
}