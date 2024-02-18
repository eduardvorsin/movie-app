import { render, screen } from "@testing-library/react";
import NavigationMenuButton from "./NavigationMenuButton";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";
import userEvent from "@testing-library/user-event";

describe('NavigationMenuButton tests', () => {
	it('is rendered correctly', () => {
		const mockFn = jest.fn();
		const dictionary = {
			active: 'Close the navigation menu',
			inactive: 'Open the navigation menu'
		};
		render(
			<NavigationMenuButton
				onClick={mockFn}
				dictionary={dictionary}
				isActive={false}
				testId='test-navigation-menu-button'
			/>
		);

		expect(screen.getByTestId<HTMLButtonElement>('test-navigation-menu-button')).toBeInTheDocument();
	});

	it('when clicking on a component, the mock function should be called', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		const dictionary = {
			active: 'Close the navigation menu',
			inactive: 'Open the navigation menu'
		};
		render(
			<NavigationMenuButton
				onClick={mockFn}
				dictionary={dictionary}
				isActive={false}
				testId='test-navigation-menu-button'
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('is a basic snapshot', () => {
		const mockFn = jest.fn();
		const dictionary = {
			active: 'Close the navigation menu',
			inactive: 'Open the navigation menu'
		};
		render(
			<NavigationMenuButton
				onClick={mockFn}
				dictionary={dictionary}
				isActive={false}
				testId='test-navigation-menu-button'
			/>
		);

		expect(screen.getByTestId<HTMLButtonElement>('test-navigation-menu-button')).toMatchSnapshot();
	});

	it('is a snapshot when isActive is true', () => {
		const mockFn = jest.fn();
		const dictionary = {
			active: 'Close the navigation menu',
			inactive: 'Open the navigation menu'
		};
		render(
			<NavigationMenuButton
				onClick={mockFn}
				dictionary={dictionary}
				isActive
				testId='test-navigation-menu-button'
			/>
		);

		expect(screen.getByTestId<HTMLButtonElement>('test-navigation-menu-button')).toMatchSnapshot();
	});
});

describe('NavigationMenuButton integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('navigationMenuButton.inactive'));

		const mockFn = jest.fn();
		const dictionary = {
			active: i18next.t('navigationMenuButton.active'),
			inactive: i18next.t('navigationMenuButton.inactive')
		};
		render(
			<NavigationMenuButton
				onClick={mockFn}
				dictionary={dictionary}
				isActive={false}
				testId='test-navigation-menu-button'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLButtonElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('navigationMenuButton.inactive'));

		const mockFn = jest.fn();
		const dictionary = {
			active: i18next.t('navigationMenuButton.active'),
			inactive: i18next.t('navigationMenuButton.inactive')
		};
		render(
			<NavigationMenuButton
				onClick={mockFn}
				dictionary={dictionary}
				isActive={false}
				testId='test-navigation-menu-button'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLButtonElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');

		const mockFn = jest.fn();
		const dictionary = {
			active: i18next.t('navigationMenuButton.active'),
			inactive: i18next.t('navigationMenuButton.inactive')
		};
		render(
			<NavigationMenuButton
				onClick={mockFn}
				dictionary={dictionary}
				isActive={false}
				testId='test-navigation-menu-button'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLButtonElement>('test-navigation-menu-button')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');

		const mockFn = jest.fn();
		const dictionary = {
			active: i18next.t('navigationMenuButton.active'),
			inactive: i18next.t('navigationMenuButton.inactive')
		};
		render(
			<NavigationMenuButton
				onClick={mockFn}
				dictionary={dictionary}
				isActive={false}
				testId='test-navigation-menu-button'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLButtonElement>('test-navigation-menu-button')).toMatchSnapshot();
	});
});