import { fireEvent, render, screen } from "@testing-library/react";
import Carousel, { Props, getBreakpointFromValue } from "./Carousel";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";

const paginationTypes: NonNullable<Props['paginationType']>[] = ['dots', 'progress', 'fraction'];

jest.useFakeTimers();
describe('Carousel tests', () => {
	beforeEach(() => {
		HTMLElement.prototype.scrollTo = jest.fn().mockImplementation(() => {
			const container = screen.getByTestId<HTMLDivElement>('test-carousel-container');
			container.dispatchEvent(new Event('scroll'));
		});
	});

	it('is rendered correctly', async () => {
		render(
			<Carousel
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-carousel')).toBeInTheDocument();
	});

	it('when changing the slide, the mock function should be called', () => {
		const mockFn = jest.fn();
		render(
			<Carousel
				testId='test-carousel'
				onSlideChange={mockFn}
				showArrows
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>
		);

		fireEvent.scroll(screen.getByTestId<HTMLDivElement>('test-carousel-container'), { target: { scrollLeft: 500 } });

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('if mousewheel is true, the mock function should be called when changing the slide through the mouse wheel',
		() => {
			const mockFn = jest.fn();
			render(
				<Carousel
					testId='test-carousel'
					onSlideChange={mockFn}
					mousewheel
					showArrows
				>
					{new Array(10).fill(null).map((_, index) => (
						<div key={index}>index: {index}</div>
					))}
				</Carousel>
			);

			fireEvent.wheel(screen.getByTestId<HTMLDivElement>('test-carousel-container'), { deltaY: 100, });

			expect(mockFn).toHaveBeenCalledTimes(1);
		});

	it('with autoplay set to true, the mock function should be called when changing the slide after 1 second', () => {
		const mockFn = jest.fn();
		render(
			<Carousel
				testId='test-carousel'
				onSlideChange={mockFn}
				autoplay
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>
		);

		jest.advanceTimersByTime(1000);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('is a basic snapshot', async () => {
		render(
			<Carousel
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-carousel')).toBeInTheDocument();
	});

	it('is a snapshot with slidesPerView', async () => {
		render(
			<Carousel
				slidesPerView={3}
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-carousel')).toBeInTheDocument();
	});

	it('is a snapshot with slidesPerGroup', async () => {
		render(
			<Carousel
				slidesPerGroup={3}
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-carousel')).toBeInTheDocument();
	});

	it('is a snapshot with spaceBetween', async () => {
		render(
			<Carousel
				spaceBetween={50}
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-carousel')).toBeInTheDocument();
	});

	it('is a snapshot with showArrows', async () => {
		render(
			<Carousel
				showArrows
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-carousel')).toBeInTheDocument();
	});

	it('is a snapshot with showPagination', async () => {
		render(
			<Carousel
				showPagination
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-carousel')).toBeInTheDocument();
	});

	it('is a snapshot with showScrollShadow', async () => {
		render(
			<Carousel
				showScrollShadow
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-carousel')).toBeInTheDocument();
	});

	it.each(paginationTypes)('is a snapshot with paginationType equal to "%s"', async (paginationType) => {
		render(
			<Carousel
				paginationType={paginationType}
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-carousel')).toBeInTheDocument();
	});

	it('is a snapshot with noSwiping', async () => {
		render(
			<Carousel
				noSwiping
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-carousel')).toBeInTheDocument();
	});

	it('is a snapshot with breakpoints', async () => {
		render(
			<Carousel
				breakpoints={{
					0: {
						slidesPerView: 1,
						slidesPerGroup: 1,
					},
					1024: {
						slidesPerView: 4,
						slidesPerGroup: 2,
					}
				}}
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-carousel')).toBeInTheDocument();
	});
});

describe('Carousel integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('carouselArrow.direction', { context: 'left' }));

		render(
			<Carousel
				showArrows
				showPagination
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('carouselArrow.direction', { context: 'left' }));

		render(
			<Carousel
				showArrows
				showPagination
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');

		render(
			<Carousel
				showArrows
				showPagination
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-carousel')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');

		render(
			<Carousel
				showArrows
				showPagination
				testId='test-carousel'
			>
				{new Array(10).fill(null).map((_, index) => (
					<div key={index}>index: {index}</div>
				))}
			</Carousel>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-carousel')).toMatchSnapshot();
	});
});

describe('getBreakpointFromValue tests', () => {
	it('if breakpoints is not an object it should return null', () => {
		expect(getBreakpointFromValue(320, undefined)).toBeNull();
	});

	it('if value is less than all breakpoints it should return null', () => {
		const breakpoints = { 1024: { slidesPerView: 2 } };
		expect(getBreakpointFromValue(320, breakpoints)).toBeNull();
	});

	it('if value is greater than or equal to the corresponding breakpoint, it should return the corresponding object', () => {
		const breakpoints = { 1024: { slidesPerView: 1 } };
		expect(getBreakpointFromValue(1200, breakpoints)).toEqual({ slidesPerView: 1 });
	});
});