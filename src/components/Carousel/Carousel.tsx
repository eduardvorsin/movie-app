'use client';

import { throttle } from '@/helpers/throttle/throttle';
import { MouseEventHandler, ReactNode, forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import CarouselPagination from './CarouselPagination/CarouselPagination';
import CarouselArrow from './CarouselArrow/CarouselArrow';
import { useScreenWidth } from '@/hooks/useScreenWidth/useScreenWidth';
import { GeneralProps } from '@/types/shared';
import dynamic from 'next/dynamic';
import { SkeletonImage } from '../Skeleton/Skeleton';
import { useParams } from 'next/navigation';
import { Locales, fallbackLng } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';

const arrowVerticalPostion = {
	dots: 'top-[calc(50%-35px)] sm:top-[calc(50%-30px)]',
	progress: 'top-[calc(50%-4px)]',
	fraction: 'top-[calc(50%-36px)]',
} as const;

type Breakpoints = {
	[key: number]: Partial<
		Record<'slidesPerView' | 'slidesPerGroup' | 'spaceBetween', number> &
		{ showArrows: boolean }
	>
};

type Props = {
	children: ReactNode,
	label?: string,
	slidesPerView?: number,
	slidesPerGroup?: number,
	onSlideChange?: (activeIndex: number) => void,
	spaceBetween?: number,
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
} & GeneralProps;

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
	...props
}, ref) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [isSliderHovered, setIsSliderHovered] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const id = useId();
	const screenWidth = useScreenWidth();

	const currentBreakpoint = getBreakpointFromValue(screenWidth, breakpoints);
	const visibleSlides = currentBreakpoint?.slidesPerView ?? slidesPerView;
	const scrollingSlides = currentBreakpoint?.slidesPerGroup ?? slidesPerGroup;
	const slideGap = currentBreakpoint?.spaceBetween ?? spaceBetween;
	const isArrowsVisible = currentBreakpoint?.showArrows ?? showArrows;

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
		showScrollShadow ? 'z-100 after:w-10 md:after:w-16 after:h-full after:absolute after:top-0 after:right-0 after:bg-gradient-to-r after:from-neutral-200/0 after:to-neutral-200/100 dark:after:from-dark-neutral-100/0 dark:after:to-dark-neutral-100/100 after:pointer-events-none after:transition-colors after:duration-150' : '',
		className
	].join(' ');

	const containerClasses = [
		'flex overflow-x-auto overflow-y-hidden snap-mandatory snap-x no-scrollbar',
		noSwiping ? 'touch-none' : '',
	].join(' ');

	const arrowLeftDictionary = useMemo(() => ({
		direction: t('carouselArrow.direction', { context: 'left' }),
	}), [t]);
	const arrowRightDictionary = useMemo(() => ({
		direction: t('carouselArrow.direction', { context: 'right' }),
	}), [t]);
	const paginationDictionary = useMemo(() => ({
		label: t('carouselPagination.label'),
	}), [t]);

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
			{...props}
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
						className='overflow-hidden flex-shrink-0 flex-grow-0'
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

			{isArrowsVisible && (
				<>
					<CarouselArrow
						className={showPagination ? arrowVerticalPostion[paginationType] : 'top-1/2'}
						direction='left'
						onClick={slidePrev}
						isDisabled={activeIndex === 0}
						aria-controls={`${id}-container`}
						dictionary={arrowLeftDictionary}

					/>
					<CarouselArrow
						className={showPagination ? arrowVerticalPostion[paginationType] : 'top-1/2'}
						direction='right'
						onClick={slideNext}
						isDisabled={activeIndex === lastIndex}
						aria-controls={`${id}-container`}
						dictionary={arrowRightDictionary}
					/>
				</>
			)}

			{showPagination && (
				<>
					{paginationType === 'dots' ? (
						<CarouselPagination
							activeIndex={activeIndex}
							totalCount={lastIndex + 1}
							paginationType={'dots'}
							onDotClick={dotClickHandler}
							dictionary={paginationDictionary}
						/>
					) : (
						<CarouselPagination
							activeIndex={activeIndex}
							totalCount={lastIndex + 1}
							paginationType={paginationType}
						/>
					)}
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

export const OngoingMoviesCarousel = dynamic(() => Promise.resolve(Carousel), {
	ssr: false,
	loading: () => <SkeletonImage className='h-[324px] sm:h-[364px] md:h-[436px] lg:h-[580px] xl:h-[724px]' />,
});

export const VerticalMovieCardsCarousel = dynamic(() => Promise.resolve(Carousel), {
	ssr: false,
	loading: () => <SkeletonImage className=' h-[358px] [@media(min-width:375px)]:h-[clamp(20.75rem,25vw_+_14.891rem,22.375rem))] xs:h-[clamp(15.625rem,47.17vw_+_1.474rem,20.313rem)] sm:h-[clamp(15.75rem,34.646vw_+_1.892rem,18.5rem)] md:h-[clamp(15.188rem,28.235vw_+_1.635rem,_19.688rem)] lg:h-[clamp(16.75rem,23.558vw_+_1.673rem,19.813rem)] [@media(min-width:1232px)]:h-[317px]' />,
});

export const HorizontalMovieCardsCarousel = dynamic(() => Promise.resolve(Carousel), {
	ssr: false,
	loading: () => <SkeletonImage className='h-[166px] 2xs:h-[clamp(10.375rem,55.975vw_-_0.82rem,15.938rem)] xs:h-[clamp(7.75rem,28.125vw_-_0.688rem,12.813rem)] md:h-[clamp(8.375rem,18.824vw_-_0.66rem,11.375rem)] lg:h-[clamp(8.438rem,13.942vw_-_0.486rem,10.25rem)]  [@media(min-width:1232px)]:h-[164px]' />,
});

export const PopularTrailersCarousel = dynamic(() => Promise.resolve(Carousel), {
	ssr: false,
	loading: () => <SkeletonImage className=' h-[166px] 2xs:h-[clamp(10.375rem,55.938vw_-_0.813rem,_21.563rem)] sm:h-[clamp(10.563rem,27.937vw_-_0.612rem,17.25rem)] lg:h-[clamp(11.375rem,18.269vw_-_0.317rem,13.75rem)] [@media(min-width:1232px)]:h-[220px]' />,
});

export const PersonCardsCarousel = dynamic(() => Promise.resolve(Carousel), {
	ssr: false,
	loading: () => <SkeletonImage className=' h-[263px] xs:h-[clamp(15.313rem,18.947vw_+_9.628rem,_16.438rem)] [@media(min-width:576px) and @media(max-width:640px)]:h-[263px] sm:h-[clamp(15.375rem,13.386vw_+_10.021rem,16.438rem)] md:h-[clamp(15rem,10.268vw_+_10.071rem,16.438rem)] [@media(min-width:992px)]:h-[263px]' />,
});

export const ReviewsCarousel = dynamic(() => Promise.resolve(Carousel), {
	ssr: false,
	loading: () => <SkeletonImage className=' h-[281px] xs:h-[245px]' />,
});

export const FamousPersonProjectsCarousel = dynamic(() => Promise.resolve(Carousel), {
	ssr: false,
	loading: () => <SkeletonImage className=' h-[375px] [@media(min-width:375px) and @media(max-width:480px)]:h-[clamp(19.125rem,50vw_+_7.406rem,22.375rem)] xs:h-[clamp(16.875rem,46.541vw_+_2.913rem,21.5rem)] sm:h-[clamp(16.938rem,35.433vw_+_2.764rem,19.75rem)] md:h-[clamp(16.688rem,38.824vw_-_1.948rem,22.875rem)] lg:h-[clamp(16.875rem,34.615vw_-_5.279rem,21.375rem)] [@media(min-width:1232px)]:h-[284px]' />,
});