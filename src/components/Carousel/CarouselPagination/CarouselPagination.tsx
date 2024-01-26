'use client';
import { GeneralProps } from '@/types/shared';
import { MouseEventHandler, useRef } from 'react';

type Props = {
	activeIndex: number,
	totalCount: number,
	onDotClick: (index: number) => void,
	paginationType: 'dots' | 'progress' | 'fraction',
} & GeneralProps;

export default function CarouselPagination({
	className,
	testId,
	onDotClick,
	paginationType,
	activeIndex,
	totalCount,
	...props
}: Props) {

	const dotsContainerRef = useRef<HTMLDivElement>(null);

	const clickHandler: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (e) => {
		const target = e.target as HTMLButtonElement | HTMLDivElement;
		const dotsContainerNode = dotsContainerRef.current;
		if (!onDotClick || !dotsContainerNode || target.tagName !== 'BUTTON') {
			return;
		}

		const index = Array.from(dotsContainerNode.children).findIndex((dotElement) => dotElement === target);
		onDotClick(index);
	};

	const classes = [
		'w-full flex justify-center items-center text-center text-200 text-neutral-1000 dark:text-dark-neutral-1000 transition-colors duration-150',
		paginationType === 'progress' ? 'h-1 bg-neutral-300 dark:bg-dark-neutral-300' : '',
		className,
	].join(' ');

	let Pagination: JSX.Element;

	if (paginationType === 'fraction') {
		Pagination = (
			<>
				<span>{activeIndex + 1}</span>
				<span className='mx-1'>/</span>
				<span>{totalCount < 1 ? 1 : totalCount}</span>
			</>
		);
	} else if (paginationType === 'dots') {
		const dots = new Array(totalCount).fill(null);
		const activeDotClasses = 'border-blue-600 hover:border-blue-700 active:border-blue-800 dark:border-blue-300 dark:hover:border-blue-400 dark:active:border-blue-500 bg-transparent';
		const nonActiveDotClasses = 'bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500 border-neutral-300 hover:border-neutral-400 active:border-neutral-500 dark:bg-dark-neutral-350 dark:hover:bg-dark-neutral-400 dark:active:bg-dark-neutral-500 dark:border-dark-neutral-350 dark:hover:border-dark-neutral-400 dark:active:border-dark-neutral-500';

		Pagination = (
			//event bubbling 
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
			<div
				className='flex py-1 gap-2 overflow-x-auto'
				ref={dotsContainerRef}
				onClick={clickHandler}
				role='group'
				aria-label='carousel pagination'
			>
				{dots.map((_, index) => (
					<button
						key={index}
						className={`w-[0.9375rem] h-[0.9375rem] sm:w-[0.625rem] sm:h-[0.625rem] shrink-0 border-2 rounded-full transition-colors duration-150 ${index === activeIndex ? activeDotClasses : nonActiveDotClasses} `}
						aria-disabled={index === activeIndex}
					/>
				))}
			</div>
		);
	} else {
		Pagination = (
			<span
				className='bg-blue-700 dark:bg-blue-300 w-full h-full scale-y-100 origin-top-left transition-[transform,background-color] duration-150'
				style={{
					transform: `scaleX(${(activeIndex + 1) / totalCount})`
				}}
			/>
		);
	}

	return (
		<div
			className={classes}
			data-testid={testId}
			{...props}
		>
			{Pagination}
		</div>
	);
}
