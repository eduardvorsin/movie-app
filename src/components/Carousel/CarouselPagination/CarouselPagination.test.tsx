import { render, screen } from "@testing-library/react";
import CarouselPagination from "./CarouselPagination";
import userEvent from "@testing-library/user-event";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";

const dictionary = { label: 'Carousel pagination' }

describe('CarouselPagination tests', () => {
	it('is rendered correctly', () => {
		render(
			<CarouselPagination
				paginationType='progress'
				totalCount={8}
				activeIndex={2}
				testId='test-carousel-pagination'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-carousel-pagination')).toBeInTheDocument();
	});

	it('when clicking on the navigation element, the mock function should be called', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();

		render(
			<CarouselPagination
				paginationType='dots'
				totalCount={8}
				activeIndex={2}
				onDotClick={mockFn}
				dictionary={dictionary}
				testId='test-carousel-pagination'
			/>
		);

		await user.click(screen.getAllByRole<HTMLButtonElement>('button')[0]);

		expect(screen.getByTestId<HTMLDivElement>('test-carousel-pagination')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(
			<CarouselPagination
				paginationType='progress'
				totalCount={8}
				activeIndex={2}
				testId='test-carousel-pagination'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-carousel-pagination')).toMatchSnapshot();
	});

	it('is a snapshot with paginationType equal to "progress"', () => {
		render(
			<CarouselPagination
				paginationType='progress'
				totalCount={8}
				activeIndex={2}
				testId='test-carousel-pagination'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-carousel-pagination')).toBeInTheDocument();
	});

	it('is a snapshot with paginationType equal to "dots"', () => {
		const mockFn = jest.fn();
		render(
			<CarouselPagination
				paginationType='dots'
				totalCount={8}
				activeIndex={2}
				onDotClick={mockFn}
				dictionary={dictionary}
				testId='test-carousel-pagination'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-carousel-pagination')).toBeInTheDocument();
	});

	it('is a snapshot with paginationType equal to "fraction"', () => {
		render(
			<CarouselPagination
				paginationType='fraction'
				totalCount={8}
				activeIndex={2}
				testId='test-carousel-pagination'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-carousel-pagination')).toBeInTheDocument();
	});
});

describe('CarouselPagination integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('carouselPagination.label'));

		const mockFn = jest.fn();
		const dictionary = { label: i18next.t('carouselPagination.label') }
		render(
			<CarouselPagination
				paginationType='dots'
				totalCount={8}
				activeIndex={2}
				onDotClick={mockFn}
				dictionary={dictionary}
				testId='test-carousel-pagination'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByRole<HTMLDivElement>('group', { name: translation })).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('carouselPagination.label'));

		const mockFn = jest.fn();
		const dictionary = { label: i18next.t('carouselPagination.label') }
		render(
			<CarouselPagination
				paginationType='dots'
				totalCount={8}
				activeIndex={2}
				onDotClick={mockFn}
				dictionary={dictionary}
				testId='test-carousel-pagination'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByRole<HTMLDivElement>('group', { name: translation })).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('carouselPagination.label'));

		const mockFn = jest.fn();
		const dictionary = { label: i18next.t('carouselPagination.label') }
		render(
			<CarouselPagination
				paginationType='dots'
				totalCount={8}
				activeIndex={2}
				onDotClick={mockFn}
				dictionary={dictionary}
				testId='test-carousel-pagination'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByRole<HTMLDivElement>('group', { name: translation })).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('carouselPagination.label'));

		const mockFn = jest.fn();
		const dictionary = { label: i18next.t('carouselPagination.label') }
		render(
			<CarouselPagination
				paginationType='dots'
				totalCount={8}
				activeIndex={2}
				onDotClick={mockFn}
				dictionary={dictionary}
				testId='test-carousel-pagination'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByRole<HTMLDivElement>('group', { name: translation })).toMatchSnapshot();
	});
});