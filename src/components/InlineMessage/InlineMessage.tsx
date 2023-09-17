import Warning from '../../assets/icons/warning.svg?url';
import Error from '../../assets/icons/error.svg?url';
import Confirmation from '../../assets/icons/confirmation.svg?url';
import Info from '../../assets/icons/info.svg?url';
import Connectivity from '../../assets/icons/connectivity.svg?url';

export type Props = {
	className?: string,
	appearance?: 'connectivity' | 'confirmation' | 'info' | 'warning' | 'error',
	iconPosition?: 'left' | 'right',
	message: string,
	fieldId: string,
	testId?: string,
};

const appearanceTypes = {
	connectivity: 'text-blue-700 dark:text-blue-400',
	confirmation: 'text-green-800 dark:text-green-400',
	info: 'text-purple-700 dark:text-purple-400',
	warning: 'text-orange-800 dark:text-yellow-300',
	error: 'text-red-700 dark:text-red-400',
} as const;

const apperanceIcons = {
	connectivity: (
		<svg className='fill-current' viewBox='0 0 20 20'>
			<use href={`${Connectivity.src}#connectivity`}></use>
		</svg>
	),
	confirmation: (
		<svg className='fill-current' viewBox='0 0 20 20'>
			<use href={`${Confirmation.src}#confirmation`}></use>
		</svg>
	),
	info: (
		<svg className='fill-current' viewBox='0 0 20 20'>
			<use href={`${Info.src}#info`}></use>
		</svg>
	),
	warning: (
		<svg className='fill-current' viewBox='0 0 20 20'>
			<use href={`${Warning.src}#warning`}></use>
		</svg>
	),
	error: (
		<svg className='fill-current' viewBox='0 0 20 20'>
			<use href={`${Error.src}#error`}></use>
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
}: Props) {
	const classes = [
		'flex items-center text-75',
		appearanceTypes[appearance],
		className,
	].join(' ');

	const Icon: JSX.Element = (
		<span className='mr-1 w-6 h-6' aria-hidden>{apperanceIcons[appearance]}</span>
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
		>
			{children}
		</p>
	);
}
