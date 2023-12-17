'use client';

import { throttle } from '@/helpers/throttle/throttle';
import { MouseEventHandler, ReactNode, forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import CarouselPagination from './CarouselPagination/CarouselPagination';
import CarouselArrow from './CarouselArrow/CarouselArrow';
import { useScreenWidth } from '@/hooks/useScreenWidth/useScreenWidth';

const arrowVerticalPostion = {
	dots: 'top-[calc(50%-35px)] sm:top-[calc(50%-30px)]',
	progress: 'top-[calc(50%-4px)]',
	fraction: 'top-[calc(50%-36px)]',
} as const;

type Breakpoints = {
	[key: number]: Partial<
		Record<'slidesPerView' | 'slidesPerGroup' | 'spaceBetween', number>
	>
};

type Props = {
	children: ReactNode,
	label?: string,
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
	showScrollShadow?: boolean,
	breakpoints?: Breakpoints,
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
	showScrollShadow,
	breakpoints,
}, ref) {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [isSliderHovered, setIsSliderHovered] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const id = useId();
	const screenWidth = useScreenWidth();

	const currentBreakpoint = getBreakpointFromValue(screenWidth, breakpoints);
	const visibleSlides = currentBreakpoint?.slidesPerView ?? slidesPerView;
	const scrollingSlides = currentBreakpoint?.slidesPerGroup ?? slidesPerGroup;
	const slideGap = currentBreakpoint?.spaceBetween ?? spaceBetween;

	const slides: ReactNode[] = useMemo(() => {
		return Array.isArray(children) ? children : [children];
	}, [children]);
	const lastIndex = Math.ceil((slides.length - visibleSlides) / scrollingSlides);

	const moveSlide = useCallback((newActiveIndex: number): void => {
		const containerNode = containerRef.current;
		if (!containerNode || !containerNode.firstElementChild) return;

		const {
			width: childWidth,
		} = containerNode.firstElementChild?.getBoundingClientRect();

		const leftOffset = (childWidth + slideGap) * scrollingSlides * newActiveIndex;
		containerNode.scrollTo({
			left: leftOffset,
			behavior: 'smooth',
		})
	}, [slideGap, scrollingSlides]);

	const slideNext = useCallback((): void => {
		const currentActiveIndex = Math.min(activeIndex + 1, lastIndex);
		moveSlide(currentActiveIndex);
	}, [activeIndex, moveSlide, lastIndex]);

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
			const {
				width: childWidth,
				left: childLeft
			} = containerNode.firstElementChild?.getBoundingClientRect();

			const containerRectData = containerNode.getBoundingClientRect();
			const shift = childLeft - containerRectData.left;
			const slideWidthInGroup = childWidth * scrollingSlides + slideGap;
			const currentIndex = Math.abs(Math.round(shift / slideWidthInGroup));

			setActiveIndex(currentIndex);
			if (onSlideChange) onSlideChange(currentIndex);
		}, 300);

		containerNode.addEventListener('scroll', scrollHandler);

		return () => {
			containerNode.removeEventListener('scroll', scrollHandler);
		}
	}, [scrollingSlides, visibleSlides, onSlideChange, slideGap]);

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
		showScrollShadow ? 'z-100 after:w-10 md:after:w-16 after:h-full after:absolute after:top-0 after:right-0 after:bg-gradient-to-r after:from-neutral-200/0 after:to-neutral-200/100 dark:after:from-dark-neutral-100/0 dark:after:to-dark-neutral-100 after:pointer-events-none' : '',
		className
	].join(' ');

	const containerClasses = [
		'flex overflow-x-auto overflow-y-hidden snap-mandatory snap-x no-scrollbar',
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
							marginRight: `${slides.length - 1 === index ? 0 : slideGap}px`,
							flexBasis: `calc(${100 / visibleSlides}% - ${slideGap * ((visibleSlides - 1) / visibleSlides)}px)`,
							scrollSnapAlign: index % scrollingSlides === 0 ? 'start' : 'none',
							scrollSnapStop: index % scrollingSlides === 0 ? 'always' : 'normal',
						}}
					>
						{slide}
					</div>
				))}
			</div>

			{showArrows && (
				<>
					<CarouselArrow
						className={arrowVerticalPostion[paginationType]}
						direction='left'
						onClick={slidePrev}
						isDisabled={activeIndex === 0}
						aria-controls={`${id}-container`}

					/>
					<CarouselArrow
						className={arrowVerticalPostion[paginationType]}
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
						className={`${paginationType !== 'progress' ? 'mt-3' : ''}`}
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

function getBreakpointFromValue(value: number, breakpoints?: Breakpoints): Breakpoints[number] | null {
	if (!breakpoints) return null;

	const breakpointValues = Object.keys(breakpoints).map(Number);
	const lastIndex = breakpointValues.length - 1;

	let result: Breakpoints[number] | null = null;
	breakpointValues.forEach((currentValue, index) => {
		if (value >= currentValue && (index === lastIndex || value < breakpointValues[index + 1])) {
			result = breakpoints[currentValue];
		}
	});

	return result;
}
