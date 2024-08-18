import { render, screen } from "@testing-library/react";
import MainSearch from "./MainSearch";
import userEvent from "@testing-library/user-event";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";

jest.mock('next/navigation', () => ({
	useParams: () => jest.fn(),
	useRouter: () => jest.fn(),
	usePathname: () => jest.fn(),
}));

const dictionary = {
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
};

describe('MainSearch tests', () => {
	it('is rendered correctly', () => {
		const closeSearchMockFn = jest.fn();
		const openSearchMockFn = jest.fn();

		render(
			<MainSearch
				id='main-search'
				isSearchVisible={false}
				onSearchClose={closeSearchMockFn}
				onSearchOpen={openSearchMockFn}
				dictionary={dictionary}
				testId='main-search'
			/>
		);

		expect(screen.getByRole<HTMLDivElement>('search')).toBeInTheDocument();
	});

	it('when you click on the "Clear" button, the mock function should be called', async () => {
		const closeSearchMockFn = jest.fn();
		const openSearchMockFn = jest.fn();
		const user = userEvent.setup();

		render(
			<MainSearch
				id='main-search'
				isSearchVisible={true}
				onSearchClose={closeSearchMockFn}
				onSearchOpen={openSearchMockFn}
				dictionary={dictionary}
				testId='main-search'
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /clear/i }));

		expect(closeSearchMockFn).toHaveBeenCalledTimes(1);
	});

	it('when you click on the "Show the search field" button, the ioc function should be called', async () => {
		const closeSearchMockFn = jest.fn();
		const openSearchMockFn = jest.fn();
		const user = userEvent.setup();

		render(
			<MainSearch
				id='main-search'
				isSearchVisible={false}
				onSearchClose={closeSearchMockFn}
				onSearchOpen={openSearchMockFn}
				dictionary={dictionary}
				testId='main-search'
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /show/i }));

		expect(openSearchMockFn).toHaveBeenCalledTimes(1);
	});

	it('is a basic snapshot', () => {
		const closeSearchMockFn = jest.fn();
		const openSearchMockFn = jest.fn();

		render(
			<MainSearch
				id='main-search'
				isSearchVisible={false}
				onSearchClose={closeSearchMockFn}
				onSearchOpen={openSearchMockFn}
				dictionary={dictionary}
				testId='main-search'
			/>
		);

		expect(screen.getByRole<HTMLDivElement>('search')).toMatchSnapshot();
	});

	it('is a snapshot with isSearchVisible set to true', () => {
		const closeSearchMockFn = jest.fn();
		const openSearchMockFn = jest.fn();

		render(
			<MainSearch
				id='main-search'
				isSearchVisible={true}
				onSearchClose={closeSearchMockFn}
				onSearchOpen={openSearchMockFn}
				dictionary={dictionary}
				testId='main-search'
			/>
		);

		expect(screen.getByRole<HTMLDivElement>('search')).toMatchSnapshot();
	});
});

describe('MainSearch integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const closeSearchMockFn = jest.fn();
		const openSearchMockFn = jest.fn();
		const translation = new RegExp(i18next.t('mainSearch.openSearch'));
		const dictionary = {
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
			}
		};
		render(
			<MainSearch
				id='main-search'
				isSearchVisible={false}
				onSearchClose={closeSearchMockFn}
				onSearchOpen={openSearchMockFn}
				dictionary={dictionary}
				testId='main-search'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByRole<HTMLButtonElement>('button', { name: translation })).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const closeSearchMockFn = jest.fn();
		const openSearchMockFn = jest.fn();
		const translation = new RegExp(i18next.t('mainSearch.openSearch'));
		const dictionary = {
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
			}
		};
		render(
			<MainSearch
				id='main-search'
				isSearchVisible={false}
				onSearchClose={closeSearchMockFn}
				onSearchOpen={openSearchMockFn}
				dictionary={dictionary}
				testId='main-search'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByRole<HTMLButtonElement>('button', { name: translation })).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');
		const closeSearchMockFn = jest.fn();
		const openSearchMockFn = jest.fn();
		const dictionary = {
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
			}
		};
		render(
			<MainSearch
				id='main-search'
				isSearchVisible={false}
				onSearchClose={closeSearchMockFn}
				onSearchOpen={openSearchMockFn}
				dictionary={dictionary}
				testId='main-search'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByRole<HTMLDivElement>('search')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');
		const closeSearchMockFn = jest.fn();
		const openSearchMockFn = jest.fn();
		const dictionary = {
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
			}
		};
		render(
			<MainSearch
				id='main-search'
				isSearchVisible={false}
				onSearchClose={closeSearchMockFn}
				onSearchOpen={openSearchMockFn}
				dictionary={dictionary}
				testId='main-search'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByRole<HTMLDivElement>('search')).toMatchSnapshot();
	});
});