import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";
import userEvent from "@testing-library/user-event";
import { MouseEventHandler } from "react";

const mockUseSelectedLayoutSegments = jest.fn();
jest.mock('next/navigation', () => ({
	useSelectedLayoutSegments: () => mockUseSelectedLayoutSegments(),
}));

describe('Navigation tests', () => {
	it('is rendered correctly', () => {
		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
		const mockFn = jest.fn();
		const dictionary = {
			movies: 'movies',
			persons: 'persons',
			tv: 'series and shows',
			new: 'new releases',
			collections: 'collections',
		};
		render(
			<Navigation
				onClick={mockFn}
				dictionary={dictionary}
				testId='test-navigation'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-navigation')).toBeInTheDocument();
	});

	it('when clicking on the link, the mock function is called', async () => {
		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
		const user = userEvent.setup();
		const mockFn = jest.fn();
		const clickHandler: MouseEventHandler<HTMLAnchorElement> = (e): void => {
			e.preventDefault();
			mockFn();
		};
		const dictionary = {
			movies: 'movies',
			persons: 'persons',
			tv: 'series and shows',
			new: 'new releases',
			collections: 'collections',
		};
		render(
			<Navigation
				onClick={clickHandler}
				dictionary={dictionary}
				testId='test-navigation'
			/>
		);

		await user.click(screen.getAllByRole<HTMLAnchorElement>('link')[0]);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('is a basic snapshot', () => {
		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
		const mockFn = jest.fn();
		const dictionary = {
			movies: 'movies',
			persons: 'persons',
			tv: 'series and shows',
			new: 'new releases',
			collections: 'collections',
		};
		render(
			<Navigation
				onClick={mockFn}
				dictionary={dictionary}
				testId='test-navigation'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-navigation')).toMatchSnapshot();
	});
});

describe('Navigation integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('navigation.movies'));

		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
		const mockFn = jest.fn();
		const dictionary = {
			movies: i18next.t('navigation.movies'),
			persons: i18next.t('navigation.persons'),
			tv: i18next.t('navigation.tv'),
			new: i18next.t('navigation.new'),
			collections: i18next.t('navigation.collections'),
		};
		render(
			<Navigation
				onClick={mockFn}
				dictionary={dictionary}
				testId='test-navigation'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLAnchorElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('navigation.movies'));

		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
		const mockFn = jest.fn();
		const dictionary = {
			movies: i18next.t('navigation.movies'),
			persons: i18next.t('navigation.persons'),
			tv: i18next.t('navigation.tv'),
			new: i18next.t('navigation.new'),
			collections: i18next.t('navigation.collections'),
		};
		render(
			<Navigation
				onClick={mockFn}
				dictionary={dictionary}
				testId='test-navigation'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLAnchorElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');

		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
		const mockFn = jest.fn();
		const dictionary = {
			movies: i18next.t('navigation.movies'),
			persons: i18next.t('navigation.persons'),
			tv: i18next.t('navigation.tv'),
			new: i18next.t('navigation.new'),
			collections: i18next.t('navigation.collections'),
		};
		render(
			<Navigation
				onClick={mockFn}
				dictionary={dictionary}
				testId='test-navigation'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-navigation')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');

		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
		const mockFn = jest.fn();
		const dictionary = {
			movies: i18next.t('navigation.movies'),
			persons: i18next.t('navigation.persons'),
			tv: i18next.t('navigation.tv'),
			new: i18next.t('navigation.new'),
			collections: i18next.t('navigation.collections'),
		};
		render(
			<Navigation
				onClick={mockFn}
				dictionary={dictionary}
				testId='test-navigation'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-navigation')).toMatchSnapshot();
	});
});