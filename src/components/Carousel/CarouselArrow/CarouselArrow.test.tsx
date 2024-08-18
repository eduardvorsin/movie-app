import { render, screen } from "@testing-library/react";
import CarouselArrow, { Props } from "./CarouselArrow";
import userEvent from "@testing-library/user-event";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";

const directions: NonNullable<Props['direction']>[] = ['left', 'right'];
const dictionary = { direction: 'Previous slide' };

describe('CarouselArrow tests', () => {
	it('is rendered correctly', () => {

		const mockFn = jest.fn();
		render(
			<CarouselArrow
				direction='left'
				dictionary={dictionary}
				onClick={mockFn}
				testId='test-carousel-arrow'
			/>
		);

		expect(screen.getByTestId<HTMLButtonElement>('test-carousel-arrow')).toBeInTheDocument();
	});

	it('when clicking on a component, the mock function is called', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<CarouselArrow
				direction='left'
				dictionary={dictionary}
				onClick={mockFn}
				testId='test-carousel-arrow'
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('when isDisabled is set to true, the component becomes inactive', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<CarouselArrow
				isDisabled
				direction='left'
				dictionary={dictionary}
				onClick={mockFn}
				testId='test-carousel-arrow'
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button'));

		expect(mockFn).toHaveBeenCalledTimes(0);
	});

	it('is a basic snapshot', () => {
		const mockFn = jest.fn();
		render(
			<CarouselArrow
				direction='left'
				dictionary={dictionary}
				onClick={mockFn}
				testId='test-carousel-arrow'
			/>
		);

		expect(screen.getByTestId<HTMLButtonElement>('test-carousel-arrow')).toMatchSnapshot();
	});

	it('is a snapshot with isDisabled set to true', () => {
		const mockFn = jest.fn();
		render(
			<CarouselArrow
				isDisabled
				direction='left'
				dictionary={dictionary}
				onClick={mockFn}
				testId='test-carousel-arrow'
			/>
		);

		expect(screen.getByTestId<HTMLButtonElement>('test-carousel-arrow')).toMatchSnapshot();
	});

	it.each(directions)('a snapshot with direction equal to %s', (direction) => {
		const dictionary = { direction: direction === 'left' ? 'Previous slide' : 'Next slide' };
		const mockFn = jest.fn();
		render(
			<CarouselArrow
				isDisabled
				direction={direction}
				dictionary={dictionary}
				onClick={mockFn}
				testId='test-carousel-arrow'
			/>
		);

		expect(screen.getByTestId<HTMLButtonElement>('test-carousel-arrow')).toMatchSnapshot();
	});
});

describe('CarouselArrow integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('carouselArrow.direction', { context: 'left' }));

		const dictionary = {
			direction: i18next.t('carouselArrow.direction', { context: 'left' })
		};
		const mockFn = jest.fn();
		render(
			<CarouselArrow
				direction='left'
				dictionary={dictionary}
				onClick={mockFn}
				testId='test-carousel-arrow'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('carouselArrow.direction', { context: 'left' }));

		const dictionary = {
			direction: i18next.t('carouselArrow.direction', { context: 'left' })
		};
		const mockFn = jest.fn();
		render(
			<CarouselArrow
				direction='left'
				dictionary={dictionary}
				onClick={mockFn}
				testId='test-carousel-arrow'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');

		const dictionary = {
			direction: i18next.t('carouselArrow.direction', { context: 'left' })
		};
		const mockFn = jest.fn();
		render(
			<CarouselArrow
				direction='left'
				dictionary={dictionary}
				onClick={mockFn}
				testId='test-carousel-arrow'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLButtonElement>('test-carousel-arrow')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');

		const dictionary = {
			direction: i18next.t('carouselArrow.direction', { context: 'left' })
		};
		const mockFn = jest.fn();
		render(
			<CarouselArrow
				direction='left'
				dictionary={dictionary}
				onClick={mockFn}
				testId='test-carousel-arrow'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLButtonElement>('test-carousel-arrow')).toMatchSnapshot();
	});
});