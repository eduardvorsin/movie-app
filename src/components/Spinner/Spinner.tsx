type Props = {
	className?: string,
	size?: 'small' | 'medium' | 'large' | 'xlarge' | 'custom',
	testId?: string,
};

const sizesTypes = {
	small: 'w-4, h-4',
	medium: 'w-6 h-6',
	large: 'w-12 h-12',
	xlarge: 'w-24 h-24',
	custom: '',
} as const;

export default function Spinner({
	className,
	size = 'medium',
	testId,
}: Props) {
	const classes = [
		'inline-flex align-middle',
		sizesTypes[size],
		className,
	].join(' ');

	return (
		<span
			className={classes}
			data-testid={testId}
		>
			<svg
				className='animate-spin'
				viewBox='0 0 16 16'
			>
				<circle
					className='stroke-[0.75] fill-none dark:stroke-blue-300 stroke-blue-800'
					cx='8'
					cy='8'
					r='7'
					strokeDasharray={60}
					strokeDashoffset={50}
					strokeLinecap='round'
				>
				</circle>
			</svg>
		</span>
	);
};