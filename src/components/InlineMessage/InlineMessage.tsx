import { GeneralProps } from '@/types/shared';

export type Props = {
	appearance?: 'connectivity' | 'confirmation' | 'info' | 'warning' | 'error',
	iconPosition?: 'left' | 'right',
	message: string,
	fieldId: string,
} & GeneralProps;

const appearanceTypes = {
	connectivity: 'text-blue-700 dark:text-blue-400',
	confirmation: 'text-green-800 dark:text-green-400',
	info: 'text-purple-700 dark:text-purple-400',
	warning: 'text-orange-800 dark:text-yellow-300',
	error: 'text-red-700 dark:text-red-400',
} as const;

const apperanceIcons = {
	connectivity: (
		<svg className='fill-current transition-colors duration-150' viewBox='0 0 20 20'>
			<use href={'/assets/icons/connectivity.svg#connectivity'}></use>
		</svg>
	),
	confirmation: (
		<svg className='fill-current transition-colors duration-150' viewBox='0 0 20 20'>
			<use href={'/assets/icons/confirmation.svg#confirmation'}></use>
		</svg>
	),
	info: (
		<svg className='fill-current transition-colors duration-150' viewBox='0 0 20 20'>
			<use href={'/assets/icons/info.svg#info'}></use>
		</svg>
	),
	warning: (
		<svg className='fill-current transition-colors duration-150' viewBox='0 0 20 20'>
			<use href={'/assets/icons/warning.svg#warning'}></use>
		</svg>
	),
	error: (
		<svg className='fill-current transition-colors duration-150' viewBox='0 0 20 20'>
			<use href={'/assets/icons/error.svg#error'}></use>
		</svg>
	),
} as const;

export default function InlineMessage({
	className,
	appearance = 'connectivity',
	message,
	iconPosition = 'left',
	fieldId,
	testId,
	...props
}: Props) {
	const classes = [
		'flex items-center text-75 transition-colors duration-150',
		appearanceTypes[appearance],
		className,
	].join(' ');

	const Icon: JSX.Element = (
		<span className='mr-1 w-6 h-6 transition-colors duration-150' aria-hidden>{apperanceIcons[appearance]}</span>
	);

	const children: JSX.Element = (
		<>
			{iconPosition === 'left' && Icon}
			{message}
			{iconPosition === 'right' && Icon}
		</>
	);

	return (
		<p
			role='alert'
			id={fieldId}
			className={classes}
			data-testid={testId}
			{...props}
		>
			{children}
		</p>
	);
}
