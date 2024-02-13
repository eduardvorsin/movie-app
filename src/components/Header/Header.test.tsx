import { render, screen } from "@testing-library/react";
import Header from "./Header";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";

const mockUseSelectedLayoutSegments = jest.fn();
jest.mock('next/navigation', () => ({
	useSelectedLayoutSegments: () => mockUseSelectedLayoutSegments(),
}));

describe('Header tests', () => {
	it('is rendered correctly', () => {
		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
		const dictionary = {
			searchButton: 'To find',
			logo: {
				linkText: 'To home page',
				altText: 'MovieWander logo'
			},
			navigation: {
				movies: 'movies',
				persons: 'persons',
				tv: 'series and shows',
				new: 'new releases',
				collections: 'collections'
			},
			userSettingsButton: {
				button: 'Open settings',
				themeTitle: 'The theme of the site',
				languageTitle: 'Language Settings',
				themeToggle: { label: 'Light and dark theme switch' },
				languageSelect: { label: 'Language selection' },
			},
			navigationMenuButton: {
				active: 'Close the navigation menu',
				inactive: 'Open the navigation menu',
			}
		};

		render(
			<Header
				dictionary={dictionary}
				testId='test-header'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-header')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
		const dictionary = {
			searchButton: 'To find',
			logo: {
				linkText: 'To home page',
				altText: 'MovieWander logo'
			},
			navigation: {
				movies: 'movies',
				persons: 'persons',
				tv: 'series and shows',
				new: 'new releases',
				collections: 'collections'
			},
			userSettingsButton: {
				button: 'Open settings',
				themeTitle: 'The theme of the site',
				languageTitle: 'Language Settings',
				themeToggle: { label: 'Light and dark theme switch' },
				languageSelect: { label: 'Language selection' },
			},
			navigationMenuButton: {
				active: 'Close the navigation menu',
				inactive: 'Open the navigation menu',
			}
		};
		render(
			<Header
				dictionary={dictionary}
				testId='test-header'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-header')).toMatchSnapshot();
	});
});

describe('Header integration tests', () => {
	it('localization into English works correctly', async () => {
		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('header.searchButton'));

		const dictionary = {
			searchButton: i18next.t('header.searchButton'),
			userSettingsButton: {
				button: i18next.t('userSettingsButton.button'),
				themeTitle: i18next.t('userSettingsButton.themeTitle'),
				languageTitle: i18next.t('userSettingsButton.languageTitle'),
				languageSelect: { label: i18next.t('languageSelect.label') },
				themeToggle: { label: i18next.t('themeToggle.label') },
			},
			navigationMenuButton: {
				active: i18next.t('navigationMenuButton.active'),
				inactive: i18next.t('navigationMenuButton.inactive'),
			},
			logo: {
				altText: i18next.t('logo.altText'),
				linkText: i18next.t('logo.linkText'),
			},
			navigation: {
				movies: i18next.t('navigation.movies'),
				persons: i18next.t('navigation.persons'),
				tv: i18next.t('navigation.tv'),
				new: i18next.t('navigation.new'),
				collections: i18next.t('navigation.collections'),
			},
		};
		render(
			<Header
				dictionary={dictionary}
				testId='test-header'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLHeadingElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('header.searchButton'));

		const dictionary = {
			searchButton: i18next.t('header.searchButton'),
			userSettingsButton: {
				button: i18next.t('userSettingsButton.button'),
				themeTitle: i18next.t('userSettingsButton.themeTitle'),
				languageTitle: i18next.t('userSettingsButton.languageTitle'),
				languageSelect: { label: i18next.t('languageSelect.label') },
				themeToggle: { label: i18next.t('themeToggle.label') },
			},
			navigationMenuButton: {
				active: i18next.t('navigationMenuButton.active'),
				inactive: i18next.t('navigationMenuButton.inactive'),
			},
			logo: {
				altText: i18next.t('logo.altText'),
				linkText: i18next.t('logo.linkText'),
			},
			navigation: {
				movies: i18next.t('navigation.movies'),
				persons: i18next.t('navigation.persons'),
				tv: i18next.t('navigation.tv'),
				new: i18next.t('navigation.new'),
				collections: i18next.t('navigation.collections'),
			},
		};
		render(
			<Header
				dictionary={dictionary}
				testId='test-header'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLHeadingElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
		await i18next.changeLanguage('en');

		const dictionary = {
			searchButton: i18next.t('header.searchButton'),
			userSettingsButton: {
				button: i18next.t('userSettingsButton.button'),
				themeTitle: i18next.t('userSettingsButton.themeTitle'),
				languageTitle: i18next.t('userSettingsButton.languageTitle'),
				languageSelect: { label: i18next.t('languageSelect.label') },
				themeToggle: { label: i18next.t('themeToggle.label') },
			},
			navigationMenuButton: {
				active: i18next.t('navigationMenuButton.active'),
				inactive: i18next.t('navigationMenuButton.inactive'),
			},
			logo: {
				altText: i18next.t('logo.altText'),
				linkText: i18next.t('logo.linkText'),
			},
			navigation: {
				movies: i18next.t('navigation.movies'),
				persons: i18next.t('navigation.persons'),
				tv: i18next.t('navigation.tv'),
				new: i18next.t('navigation.new'),
				collections: i18next.t('navigation.collections'),
			},
		};
		render(
			<Header
				dictionary={dictionary}
				testId='test-header'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-header')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
		await i18next.changeLanguage('ru');

		const dictionary = {
			searchButton: i18next.t('header.searchButton'),
			userSettingsButton: {
				button: i18next.t('userSettingsButton.button'),
				themeTitle: i18next.t('userSettingsButton.themeTitle'),
				languageTitle: i18next.t('userSettingsButton.languageTitle'),
				languageSelect: { label: i18next.t('languageSelect.label') },
				themeToggle: { label: i18next.t('themeToggle.label') },
			},
			navigationMenuButton: {
				active: i18next.t('navigationMenuButton.active'),
				inactive: i18next.t('navigationMenuButton.inactive'),
			},
			logo: {
				altText: i18next.t('logo.altText'),
				linkText: i18next.t('logo.linkText'),
			},
			navigation: {
				movies: i18next.t('navigation.movies'),
				persons: i18next.t('navigation.persons'),
				tv: i18next.t('navigation.tv'),
				new: i18next.t('navigation.new'),
				collections: i18next.t('navigation.collections'),
			},
		};
		render(
			<Header
				dictionary={dictionary}
				testId='test-header'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-header')).toMatchSnapshot();
	});
});
