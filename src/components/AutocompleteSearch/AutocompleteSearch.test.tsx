import { render, screen } from "@testing-library/react";
import AutocompleteSearch from "./AutocompleteSearch";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";
import userEvent from "@testing-library/user-event";

const options = [
	{
		href: '/',
		label: 'first option',
	}, {
		href: '/',
		label: 'second option',
	}, {
		href: '/',
		label: 'third option',
	}
];

describe('AutocompleteSearch tests', () => {
	it('is rendered correctly', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn();
		const dictionary = {
			emptyStateTitle: 'We can\'t find anything for your request.',
			emptyStateText: 'Try entering a different value',
			search: {
				button: 'To find',
				clearButton: 'To clear',
			},
		};
		render(
			<AutocompleteSearch
				id='test-autocomplete-search'
				label='autocomplete-search'
				name='autocomplete-search'
				onChange={changeMockFn}
				onSubmit={submitMockFn}
				value=''
				options={options}
				initialOptions={[]}
				testId='test-autocomplete-search'
				dictionary={dictionary}
			/>
		);

		await user.click(screen.getByRole<HTMLInputElement>('textbox'));

		expect(screen.getByTestId<HTMLDivElement>('test-autocomplete-search')).toBeInTheDocument();
	});

	it('if isLoading is true, the spinner should be displayed', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn();
		const dictionary = {
			emptyStateTitle: 'We can\'t find anything for your request.',
			emptyStateText: 'Try entering a different value',
			search: {
				button: 'To find',
				clearButton: 'To clear',
			},
		};
		render(
			<AutocompleteSearch
				id='test-autocomplete-search'
				label='autocomplete search'
				name='autocomplete-search'
				onChange={changeMockFn}
				onSubmit={submitMockFn}
				value=''
				options={[]}
				initialOptions={[]}
				testId='test-autocomplete-search'
				dictionary={dictionary}
				isLoading
			/>
		);

		await user.type(screen.getByRole<HTMLInputElement>('textbox'), ' ');

		expect(screen.getByTestId<HTMLSpanElement>('test-spinner')).toBeInTheDocument();
	});

	it('If nothing is found at the user\'s request, then the corresponding message should be displayed', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn();
		const dictionary = {
			emptyStateTitle: 'We can\'t find anything for your request.',
			emptyStateText: 'Try entering a different value',
			search: {
				button: 'To find',
				clearButton: 'To clear',
			},
		};
		render(
			<AutocompleteSearch
				id='test-autocomplete-search'
				label='autocomplete-search'
				name='autocomplete-search'
				onChange={changeMockFn}
				onSubmit={submitMockFn}
				value=''
				options={[]}
				initialOptions={[]}
				testId='test-autocomplete-search'
				dictionary={dictionary}
			/>
		);

		await user.type(screen.getByRole<HTMLInputElement>('textbox'), ' ');

		expect(screen.getByText<HTMLParagraphElement>(dictionary.emptyStateText)).toBeInTheDocument();
		expect(screen.getByRole<HTMLHeadingElement>('heading', { name: dictionary.emptyStateTitle })).toBeInTheDocument();
	});

	it('is a basic snapshot', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn();
		const dictionary = {
			emptyStateTitle: 'We can\'t find anything for your request.',
			emptyStateText: 'Try entering a different value',
			search: {
				button: 'To find',
				clearButton: 'To clear',
			},
		};
		render(
			<AutocompleteSearch
				id='test-autocomplete-search'
				label='autocomplete-search'
				name='autocomplete-search'
				onChange={changeMockFn}
				onSubmit={submitMockFn}
				value=''
				options={options}
				initialOptions={[]}
				testId='test-autocomplete-search'
				dictionary={dictionary}
			/>
		);

		await user.click(screen.getByRole<HTMLInputElement>('textbox'));

		expect(screen.getByTestId<HTMLDivElement>('test-autocomplete-search')).toMatchSnapshot();
	});

	it('is a snapshot with isLoading is true', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn();
		const dictionary = {
			emptyStateTitle: 'We can\'t find anything for your request.',
			emptyStateText: 'Try entering a different value',
			search: {
				button: 'To find',
				clearButton: 'To clear',
			},
		};
		render(
			<AutocompleteSearch
				id='test-autocomplete-search'
				label='autocomplete-search'
				name='autocomplete-search'
				onChange={changeMockFn}
				onSubmit={submitMockFn}
				value=''
				options={[]}
				initialOptions={[]}
				testId='test-autocomplete-search'
				dictionary={dictionary}
				isLoading
			/>
		);

		await user.click(screen.getByRole<HTMLInputElement>('textbox'));

		expect(screen.getByTestId<HTMLDivElement>('test-autocomplete-search')).toMatchSnapshot();
	});

	it('is a snapshot when initialOptions and options are empty', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn();
		const dictionary = {
			emptyStateTitle: 'We can\'t find anything for your request.',
			emptyStateText: 'Try entering a different value',
			search: {
				button: 'To find',
				clearButton: 'To clear',
			},
		};
		render(
			<AutocompleteSearch
				id='test-autocomplete-search'
				label='autocomplete-search'
				name='autocomplete-search'
				onChange={changeMockFn}
				onSubmit={submitMockFn}
				value=''
				options={[]}
				initialOptions={[]}
				testId='test-autocomplete-search'
				dictionary={dictionary}
			/>
		);

		await user.click(screen.getByRole<HTMLInputElement>('textbox'));

		expect(screen.getByTestId<HTMLDivElement>('test-autocomplete-search')).toMatchSnapshot();
	});
});

describe('AutocompleteSearch integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn();
		const translation = new RegExp(i18next.t('autocompleteSearch.emptyStateText'));

		const dictionary = {
			emptyStateTitle: 'We can\'t find anything for your request.',
			emptyStateText: 'Try entering a different value',
			search: {
				button: 'To find',
				clearButton: 'To clear',
			},
		};
		render(
			<AutocompleteSearch
				id='test-autocomplete-search'
				label='autocomplete-search'
				name='autocomplete-search'
				onChange={changeMockFn}
				onSubmit={submitMockFn}
				value=''
				options={[]}
				initialOptions={[]}
				testId='test-autocomplete-search'
				dictionary={dictionary}
			/>,
			{ wrapper: I18nextWrapper }
		);

		await user.type(screen.getByRole<HTMLInputElement>('textbox'), ' ');

		expect(screen.getByText<HTMLParagraphElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn();
		const translation = new RegExp(i18next.t('autocompleteSearch.emptyStateText'));

		const dictionary = {
			emptyStateTitle: 'Мы ничего не смогли найти по вашему запросу.',
			emptyStateText: 'Попробуйте ввести другое значение.',
			search: {
				button: 'Найти',
				clearButton: 'Очистить',
			},
		};
		render(
			<AutocompleteSearch
				id='test-autocomplete-search'
				label='autocomplete-search'
				name='autocomplete-search'
				onChange={changeMockFn}
				onSubmit={submitMockFn}
				value=''
				options={[]}
				initialOptions={[]}
				testId='test-autocomplete-search'
				dictionary={dictionary}
			/>,
			{ wrapper: I18nextWrapper }
		);

		await user.type(screen.getByRole<HTMLInputElement>('textbox'), ' ');

		expect(screen.getByText<HTMLParagraphElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn();

		const dictionary = {
			emptyStateTitle: 'We can\'t find anything for your request.',
			emptyStateText: 'Try entering a different value',
			search: {
				button: 'To find',
				clearButton: 'To clear',
			},
		};
		render(
			<AutocompleteSearch
				id='test-autocomplete-search'
				label='autocomplete-search'
				name='autocomplete-search'
				onChange={changeMockFn}
				onSubmit={submitMockFn}
				value=''
				options={[]}
				initialOptions={[]}
				testId='test-autocomplete-search'
				dictionary={dictionary}
			/>,
			{ wrapper: I18nextWrapper }
		);

		await user.type(screen.getByRole<HTMLInputElement>('textbox'), ' ');

		expect(screen.getByTestId<HTMLDivElement>('test-autocomplete-search')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn();

		const dictionary = {
			emptyStateTitle: 'Мы ничего не смогли найти по вашему запросу.',
			emptyStateText: 'Попробуйте ввести другое значение.',
			search: {
				button: 'Найти',
				clearButton: 'Очистить',
			},
		};
		render(
			<AutocompleteSearch
				id='test-autocomplete-search'
				label='autocomplete-search'
				name='autocomplete-search'
				onChange={changeMockFn}
				onSubmit={submitMockFn}
				value=''
				options={[]}
				initialOptions={[]}
				testId='test-autocomplete-search'
				dictionary={dictionary}
			/>,
			{ wrapper: I18nextWrapper }
		);

		await user.type(screen.getByRole<HTMLInputElement>('textbox'), ' ');

		expect(screen.getByTestId<HTMLDivElement>('test-autocomplete-search')).toMatchSnapshot();
	});
});