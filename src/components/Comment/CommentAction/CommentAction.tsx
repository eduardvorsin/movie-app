import { GeneralProps } from '@/types/shared';
import { FocusEventHandler, MouseEventHandler, ReactNode } from 'react';

type Props = {
	children: ReactNode,
	isDisabled?: boolean,
	onClick: MouseEventHandler<HTMLButtonElement>,
	onFocus?: FocusEventHandler<HTMLButtonElement>,
} & GeneralProps;

export default function CommentAction({
	children,
	className,
	testId,
	isDisabled,
	onClick,
	onFocus,
	...props
}: Props) {
	const classes = [
		'inline-flex font-medium text-100 text-neutral-800 dark:text-dark-neutral-800 enabled:hover:text-neutral-700 dark:enabled:hover:text-dark-neutral-900 enabled:hover:underline enabled:active:text-neutral-600 dark:enabled:active:text-dark-neutral-1000 disabled:opacity-disabled disabled:cursor-not-allowed transition-colors duration-150',
		className,
	].join(' ');
	return (
		<button
			className={classes}
			disabled={isDisabled}
			data-testid={testId}
			onClick={onClick}
			onFocus={onFocus}
			{...props}
		>
			<span className='max-w-[80px] truncate'>
				{children}
			</span>
		</button>
	);
}