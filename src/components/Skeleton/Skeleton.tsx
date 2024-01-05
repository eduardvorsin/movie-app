type SkeletonImageProps = {
	width?: number | string;
	height?: number | string;
	fill?: boolean,
	isRounded?: boolean,
	className?: string,
	testId?: string,
};

export const SkeletonImage = ({
	className,
	width,
	height,
	isRounded,
	testId,
}: SkeletonImageProps) => {
	const classes = [
		'bg-neutral-400 dark:bg-dark-neutral-300 max-w-full',
		isRounded ? 'rounded-full' : '',
		className
	].join(' ');

	return (
		<>
			<div
				className={`${classes} relative overflow-hidden isolate before:absolute before:inset-0 before:-translate-x-full before:animate-skeleton before:bg-gradient-to-r before:from-transparent before:via-neutral-0/50 dark:before:via-neutral-0/25 before:to-transparent`}
				style={{ width, height }}
				aria-hidden
				data-testid={testId}
			/>
		</>
	)
};
