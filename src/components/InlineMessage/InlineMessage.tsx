'use client'

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
	confirmation: 'text-green-600 dark:text-green-500',
	info: 'text-purple-600 dark:text-purple-500',
	warning: 'text-orange-600 dark:text-yellow-500',
	error: 'text-red-600 dark:text-red-500',
} as const;

const apperanceIcons = {
	connectivity: (
		<svg
			className='fill-current'
			viewBox="0 0 20 20"
		>
			<path d="M10 6.75a.75.75 0 0 1 .75.75v3.5a.75.75 0 1 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z" />
			<path d="M11 13.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
			<path fillRule="evenodd" d="M10 3.5c-1.045 0-1.784.702-2.152 1.447a449.26 449.26 0 0 1-2.005 3.847l-.028.052a403.426 403.426 0 0 0-2.008 3.856c-.372.752-.478 1.75.093 2.614.57.863 1.542 1.184 2.464 1.184h7.272c.922 0 1.895-.32 2.464-1.184.57-.864.465-1.862.093-2.614-.21-.424-1.113-2.147-2.004-3.847l-.032-.061a429.497 429.497 0 0 1-2.005-3.847c-.368-.745-1.107-1.447-2.152-1.447Zm-.808 2.112c.404-.816 1.212-.816 1.616 0 .202.409 1.112 2.145 2.022 3.88a418.904 418.904 0 0 1 2.018 3.875c.404.817 0 1.633-1.212 1.633h-7.272c-1.212 0-1.617-.816-1.212-1.633.202-.408 1.113-2.147 2.023-3.883a421.932 421.932 0 0 0 2.017-3.872Z" />
		</svg>
	),
	confirmation: (
		<svg
			className='fill-current'
			viewBox="0 0 20 20"
		>
			<path d="M13.28 9.03a.75.75 0 0 0-1.06-1.06l-2.97 2.97-1.22-1.22a.75.75 0 0 0-1.06 1.06l1.75 1.75a.75.75 0 0 0 1.06 0l3.5-3.5Z" />
			<path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
		</svg>
	),
	info: (
		<svg
			className='fill-current'
			viewBox="0 0 20 20"
		>
			<path d="M11 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
			<path d="M10.75 9.25a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5Z" />
			<path fillRule="evenodd" d="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-1.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
		</svg>
	),
	warning: (
		<svg
			className='fill-current'
			viewBox="0 0 20 20"
		>
			<path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z" />
			<path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
			<path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
		</svg>
	),
	error: (
		<svg
			className='fill-current'
			viewBox="0 0 20 20"
		>
			<path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z" />
			<path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
			<path fillRule="evenodd" d="M11.237 3.177a1.75 1.75 0 0 0-2.474 0l-5.586 5.585a1.75 1.75 0 0 0 0 2.475l5.586 5.586a1.75 1.75 0 0 0 2.474 0l5.586-5.586a1.75 1.75 0 0 0 0-2.475l-5.586-5.585Zm-1.414 1.06a.25.25 0 0 1 .354 0l5.586 5.586a.25.25 0 0 1 0 .354l-5.586 5.585a.25.25 0 0 1-.354 0l-5.586-5.585a.25.25 0 0 1 0-.354l5.586-5.586Z" />
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
