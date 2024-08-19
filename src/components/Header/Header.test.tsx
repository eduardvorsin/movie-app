import { render, screen } from "@testing-library/react";
import Header from "./Header";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";

const mockUseSelectedLayoutSegments = jest.fn();
jest.mock('next/navigation', () => ({
	useSelectedLayoutSegments: () => mockUseSelectedLayoutSegments(),
	useParams: () => jest.fn(),
	useRouter: () => jest.fn(),
	usePathname: () => jest.fn(),
}));

const dictionary = {
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
	mainSearch: {
		label: 'Search',
		placeholder: 'Search for movies, TV series, actors.',
		openSearch: 'Show the search field',
		closeSearch: 'Hide the search field',
		autocompleteSearch: {
			emptyStateTitle: 'We can\'t find anything for your request.',
			emptyStateText: 'Try entering a different value',
			search: {
				button: 'To find',
				clearButton: 'To clear',
			}
		},
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

describe('Header tests', () => {
	it('is rendered correctly', () => {
		mockUseSelectedLayoutSegments.mockReturnValue(['movies', '9999']);
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
		const translation = new RegExp(i18next.t('logo.linkText'));

		const dictionary = {
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
			mainSearch: {
				label: i18next.t('mainSearch.label'),
				placeholder: i18next.t('mainSearch.placeholder'),
				openSearch: i18next.t('mainSearch.openSearch'),
				closeSearch: i18next.t('mainSearch.closeSearch'),
				autocompleteSearch: {
					emptyStateTitle: i18next.t('autocompleteSearch.emptyStateTitle'),
					emptyStateText: i18next.t('autocompleteSearch.emptyStateText'),
					search: {
						button: i18next.t('search.button'),
						clearButton: i18next.t('search.clearButton'),
					},
				},
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
		const translation = new RegExp(i18next.t('logo.linkText'));

		const dictionary = {
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
			mainSearch: {
				label: i18next.t('mainSearch.label'),
				placeholder: i18next.t('mainSearch.placeholder'),
				openSearch: i18next.t('mainSearch.openSearch'),
				closeSearch: i18next.t('mainSearch.closeSearch'),
				autocompleteSearch: {
					emptyStateTitle: i18next.t('autocompleteSearch.emptyStateTitle'),
					emptyStateText: i18next.t('autocompleteSearch.emptyStateText'),
					search: {
						button: i18next.t('search.button'),
						clearButton: i18next.t('search.clearButton'),
					},
				},
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
			mainSearch: {
				label: i18next.t('mainSearch.label'),
				placeholder: i18next.t('mainSearch.placeholder'),
				openSearch: i18next.t('mainSearch.openSearch'),
				closeSearch: i18next.t('mainSearch.closeSearch'),
				autocompleteSearch: {
					emptyStateTitle: i18next.t('autocompleteSearch.emptyStateTitle'),
					emptyStateText: i18next.t('autocompleteSearch.emptyStateText'),
					search: {
						button: i18next.t('search.button'),
						clearButton: i18next.t('search.clearButton'),
					},
				},
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
			mainSearch: {
				label: i18next.t('mainSearch.label'),
				placeholder: i18next.t('mainSearch.placeholder'),
				openSearch: i18next.t('mainSearch.openSearch'),
				closeSearch: i18next.t('mainSearch.closeSearch'),
				autocompleteSearch: {
					emptyStateTitle: i18next.t('autocompleteSearch.emptyStateTitle'),
					emptyStateText: i18next.t('autocompleteSearch.emptyStateText'),
					search: {
						button: i18next.t('search.button'),
						clearButton: i18next.t('search.clearButton'),
					},
				},
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
