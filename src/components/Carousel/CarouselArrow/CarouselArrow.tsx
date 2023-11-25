import { AriaAttributes, MouseEventHandler } from 'react';

type Props = {
	className?: string,
	testId?: string,
	direction: 'left' | 'right',
	isDisabled?: boolean,
	onClick: MouseEventHandler<HTMLButtonElement>,
} & AriaAttributes;

export default function CarouselArrow({
	className,
	testId,
	isDisabled,
	direction,
	onClick,
	...props
}: Props) {
	const classes = [
		'p-1 absolute top-1/2 -translate-y-1/2 bg-neutral-300/80 enabled:hover:bg-neutral-300/[0.85] enabled:active:bg-neutral-300/90 dark:bg-dark-neutral-300/80 dark:enabled:hover:bg-dark-neutral-300/[0.85] dark:enabled:active:bg-dark-neutral-300/90 text-blue-700 enabled:hover:text-blue-800 enabled:active:text-blue-900 dark:text-blue-300 dark:enabled:hover:text-blue-400 dark:enabled:active:text-blue-500 transition-colors transition-opacity duration-150 disabled:opacity-disabled disabled:cursor-not-allowed',
		direction === 'left' ? 'left-[0.625rem]' : 'right-[0.625rem]',
		className
	].join(' ');

	const iconFilename = direction === 'left' ? 'back-arrow.svg#back-arrow' : 'forward-arrow.svg#forward-arrow';

	return (
		<button
			className={classes}
			onClick={onClick}
			disabled={isDisabled}
			data-testid={testId}
			{...props}
		>
			<svg className='w-10 h-10' viewBox='0 0 32 32'>
				<use href={`/assets/icons/${iconFilename}`}></use>
			</svg>
			<span className='sr-only'>{direction.toUpperCase()} carousel control</span>
		</button>
	);
};