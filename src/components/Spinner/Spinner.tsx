import { GeneralProps } from "@/types/shared";

export type Props = {
	size?: 'small' | 'medium' | 'large' | 'xlarge' | 'custom',
} & GeneralProps;

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
	...props
}: Props) {
	const classes = [
		'inline-flex align-middle dark:text-blue-300 text-blue-800',
		sizesTypes[size],
		className,
	].join(' ');

	return (
		<span
			className={classes}
			data-testid={testId}
			{...props}
		>
			<svg
				className='animate-spin stroke-[0.75] fill-none stroke-current'
				viewBox='0 0 16 16'
			>
				<circle
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