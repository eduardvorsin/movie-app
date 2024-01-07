import Spinner from '@/components/Spinner/Spinner';

export default function LoadingLayout() {
	return (
		<div className='w-full min-h-[100vh] relative'>
			<Spinner
				className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
				size='xlarge'
			/>
		</div>
	);
}