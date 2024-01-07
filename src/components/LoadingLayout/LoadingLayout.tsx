import Spinner from '@/components/Spinner/Spinner';
import { GeneralProps } from '@/types/shared';

export default function LoadingLayout({
	className,
	testId,
	...props
}: GeneralProps) {
	return (
		<div
			className={`w-full min-h-[100vh] relative ${className}`}
			data-testid={testId}
			{...props}
		>
			<Spinner
				className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
				size='xlarge'
			/>
		</div>
	);
}