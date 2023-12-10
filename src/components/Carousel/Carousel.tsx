'use client';

import { throttle } from '@/helpers/throttle/throttle';
import { MouseEventHandler, ReactNode, forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import CarouselPagination from './CarouselPagination/CarouselPagination';
import CarouselArrow from './CarouselArrow/CarouselArrow';

type Props = {
	children: ReactNode,
	label: string,
	slidesPerView?: number,
	slidesPerGroup?: number,
	onSlideChange?: (activeIndex: number) => void,
	spaceBetween?: number,
	className?: string,
	testId?: string,
	pauseOnHover?: boolean,
	autoplay?: boolean,
	autoplayInterval?: number,
	showPagination?: boolean,
	showArrows?: boolean,
	noSwiping?: boolean,
	mousewheel?: boolean,
	paginationType?: 'dots' | 'progress' | 'fraction',
};

export default forwardRef<HTMLDivElement, Props>(function Carousel({
	children,
	label,
	slidesPerView = 1,
	slidesPerGroup = 1,
	onSlideChange,
	spaceBetween = 0,
	className,
	testId,
	pauseOnHover,
	autoplay,
	autoplayInterval = 1000,
	showPagination,
	showArrows,
	noSwiping,
	mousewheel,
	paginationType = 'fraction',
}, ref) {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [isSliderHovered, setIsSliderHovered] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const id = useId();

	const slides: ReactNode[] = useMemo(() => {
		return Array.isArray(children) ? children : [children];
	}, [children]);
	const lastIndex = Math.ceil((slides.length - slidesPerView) / slidesPerGroup);

	const moveSlide = useCallback((newActiveIndex: number): void => {
		const containerNode = containerRef.current;
		if (!containerNode) return;

		const { width } = containerNode.getBoundingClientRect();

		const leftOffset = width * newActiveIndex * (slidesPerGroup / slidesPerView) + spaceBetween * newActiveIndex;

		containerNode.scrollTo({
			left: leftOffset,
			behavior: 'smooth',
		})
	}, [slidesPerGroup, slidesPerView, spaceBetween]);

	const slideNext = useCallback((): void => {
		const currentActiveIndex = Math.min(activeIndex + 1, slides.length - 1);
		moveSlide(currentActiveIndex);
	}, [activeIndex, slides.length, moveSlide]);

	const slidePrev = () => {
		const currentActiveIndex = Math.max(0, activeIndex - 1);
		moveSlide(currentActiveIndex);
	};

	const dotClickHandler = (index: number): void => moveSlide(index);

	const wheelHandler = throttle((e: React.WheelEvent<HTMLDivElement>) => {
		if (!mousewheel) return;

		if (e.deltaY > 0) {
			slideNext();
		} else {
			slidePrev();
		}
	}, 300);

	const keyDownHandler = throttle((e: React.KeyboardEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.code === 'ArrowLeft') {
			slidePrev();
		} else if (e.code === 'ArrowRight') {
			slideNext();
		}
	}, 300);

	const mouseEnterHandler: MouseEventHandler<HTMLDivElement> = () => {
		if (!pauseOnHover) return;
		setIsSliderHovered(true);
	};

	const mouseLeaveHandler: MouseEventHandler<HTMLDivElement> = () => {
		if (!pauseOnHover) return;
		setIsSliderHovered(false);
	};

	useEffect(() => {
		const containerNode = containerRef.current;
		if (!containerNode) return;

		const scrollHandler = throttle(() => {
			if (!containerNode.firstElementChild) return;
			const firstElementRectData = containerNode.firstElementChild?.getBoundingClientRect();
			const containerRectData = containerNode.getBoundingClientRect();
			const shift = firstElementRectData.left - containerRectData.left;
			const slideWidthInGroup = containerRectData.width * (slidesPerGroup / slidesPerView) + spaceBetween;
			const currentIndex = Math.abs(Math.round(shift / slideWidthInGroup));

			setActiveIndex(currentIndex);
			if (onSlideChange) onSlideChange(currentIndex);
		}, 300);

		containerNode.addEventListener('scroll', scrollHandler);

		return () => {
			containerNode.removeEventListener('scroll', scrollHandler);
		}
	}, [slidesPerGroup, slidesPerView, onSlideChange, spaceBetween]);

	useEffect(() => {
		let interval: ReturnType<typeof setTimeout> | undefined;
		if (autoplay && !isSliderHovered) {
			interval = setInterval(() => {
				slideNext();
			}, autoplayInterval);
		};

		if (isSliderHovered) {
			clearInterval(interval);
		}

		return () => {
			clearInterval(interval);
		}
	}, [autoplay, autoplayInterval, slideNext, isSliderHovered]);

	const wrapperClases = [
		'overflow-hidden relative',
		className
	].join(' ');

	const containerClasses = [
		'flex overflow-x-auto snap-mandatory snap-x no-scrollbar',
		noSwiping ? 'touch-none' : '',
	].join(' ');
	return (
		//event bubbling 
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
		<div
			className={wrapperClases}
			onKeyDown={keyDownHandler}
			ref={ref}
			data-testid={testId}
			role='region'
			aria-roledescription='carousel'
			aria-label={label}
			aria-live={autoplay ? 'off' : 'polite'}
		>
			<div
				id={`${id}-container`}
				ref={containerRef}
				className={containerClasses}
				onWheel={wheelHandler}
				onMouseEnter={mouseEnterHandler}
				onMouseLeave={mouseLeaveHandler}
			>
				{slides.map((slide, index) => (
					<div
						key={index}
						role='group'
						aria-roledescription='slide'
						className='flex-shrink-0 flex-grow-0'
						style={{
							marginRight: `${slides.length - 1 === index ? 0 : spaceBetween}px`,
							flexBasis: `${100 / slidesPerView}%`,
							scrollSnapAlign: index % slidesPerGroup === 0 ? 'start' : 'none',
							scrollSnapStop: index % slidesPerGroup === 0 ? 'always' : 'normal',
						}}
					>
						{slide}
					</div>
				))}
			</div>

			{showArrows && (
				<>
					<CarouselArrow
						direction='left'
						onClick={slidePrev}
						isDisabled={activeIndex === 0}
						aria-controls={`${id}-container`}

					/>
					<CarouselArrow
						direction='right'
						onClick={slideNext}
						isDisabled={activeIndex === lastIndex}
						aria-controls={`${id}-container`}
					/>
				</>
			)}

			{showPagination && (
				<>
					<CarouselPagination
						className={`${paginationType !== 'progress' ? 'mt-2' : ''}`}
						activeIndex={activeIndex}
						totalCount={lastIndex + 1}
						paginationType={paginationType}
						onDotClick={dotClickHandler}
					/>
				</>
			)}
		</div>
	);
});
