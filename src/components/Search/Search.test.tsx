import { render, screen } from '@testing-library/react';
import Search from './Search';
import userEvent from '@testing-library/user-event';
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";

describe('Search tests', () => {
	it('is rendered correctly', () => {
		const dictionary = { button: 'To find' };
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-search')).toBeInTheDocument();
	});

	it('when submitting the form, the mock function is triggered', async () => {
		const dictionary = { button: 'To find' };
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button'));

		expect(submitMockFn).toHaveBeenCalledTimes(1);
	});

	it('when entering text into the input, the mock function is triggered', async () => {
		const dictionary = { button: 'To find' };
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		await user.type(screen.getByRole<HTMLInputElement>('textbox'), 'a');

		expect(changeMockFn).toHaveBeenCalledTimes(1);
	});

	it('when the input receives the focus, the mock function is triggered', async () => {
		const dictionary = { button: 'To find' };
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		const focusMockFn = jest.fn();
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				onFocus={focusMockFn}
				dictionary={dictionary}
			/>
		);

		await user.tab();

		expect(focusMockFn).toHaveBeenCalledTimes(1);
	});

	it('when the input loses focus, the mock function is triggered', async () => {
		const dictionary = { button: 'To find' };
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		const blurMockFn = jest.fn();
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				onFocus={blurMockFn}
				dictionary={dictionary}
			/>
		);

		await user.tab();
		await user.tab();

		expect(blurMockFn).toHaveBeenCalledTimes(1);
	});

	it('when isDisabled is true, the input and the button become inactive', async () => {
		const dictionary = { button: 'To find' };
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				isDisabled
				testId='test-search'
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		await user.type(screen.getByRole<HTMLInputElement>('textbox'), 'a');
		await user.click(screen.getByRole<HTMLButtonElement>('button'));

		expect(changeMockFn).toHaveBeenCalledTimes(0);
		expect(submitMockFn).toHaveBeenCalledTimes(0);
	});

	it('with IsReadOnly set to true, the mock function is triggered when the focus is on, but not when the value is changed', async () => {
		const dictionary = { button: 'To find' };
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		const focusMockFn = jest.fn();
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				isReadOnly
				testId='test-search'
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				onFocus={focusMockFn}
				dictionary={dictionary}
			/>
		);

		await user.type(screen.getByRole<HTMLInputElement>('textbox'), 'a');
		await user.tab();

		expect(changeMockFn).toHaveBeenCalledTimes(0);
		expect(focusMockFn).toHaveBeenCalledTimes(1);
	});

	it('if IsInvalid is true, the input\'s border color turns red', () => {
		const dictionary = { button: 'To find' };
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				isInvalid
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('textbox')).toHaveClass('border-red-600');
	});

	it('when labelHidden is set to true, the label should be visible only to screen readers', () => {
		const dictionary = { button: 'To find' };
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				labelHidden
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		expect(screen.getByText<HTMLLabelElement>('test-search')).toHaveClass('sr-only');
	});

	it('when the error prop is not empty, an error message is displayed next to the input', () => {
		const dictionary = { button: 'To find' };
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				error='mock error'
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		expect(screen.getByText<HTMLParagraphElement>('mock error')).toBeInTheDocument();
	});

	it('when you click on the "Clear" button, the mock function should be called', async () => {
		const dictionary = { button: 'To find', clearButton: 'To clear' };
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		const clearMockFn = jest.fn();

		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				onChange={changeMockFn}
				onClear={clearMockFn}
				clearButton={true}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /to clear/i }));

		expect(clearMockFn).toHaveBeenCalledTimes(1);
	});

	it('is a basic snapshot', () => {
		const dictionary = { button: 'To find' };
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-search')).toMatchSnapshot();
	});

	it('is a snapshot with labelHidden set to true', () => {
		const dictionary = { button: 'To find' };
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				labelHidden
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-search')).toMatchSnapshot();
	});

	it('is a snapshot with isDisabled set to true', () => {
		const dictionary = { button: 'To find' };
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				labelHidden
				isDisabled
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-search')).toMatchSnapshot();
	});

	it('is snapshot with IsInvalid equal to true', () => {
		const dictionary = { button: 'To find' };
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				labelHidden
				isInvalid
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-search')).toMatchSnapshot();
	});

	it('is a snapshot with IsReadOnly equal to true', () => {
		const dictionary = { button: 'To find' };
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				labelHidden
				isReadOnly
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-search')).toMatchSnapshot();
	});

	it('is a snapshot with clearButton equal to true', () => {
		const dictionary = { button: 'To find', clearButton: 'To clear' };
		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				onChange={changeMockFn}
				clearButton={true}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-search')).toMatchSnapshot();
	});
});

describe('Search integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('search.button'));

		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		const dictionary = { button: i18next.t('search.button') };
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				labelHidden
				isReadOnly
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('search.button'));

		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		const dictionary = { button: i18next.t('search.button') };
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				labelHidden
				isReadOnly
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');

		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		const dictionary = { button: i18next.t('search.button') };
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				labelHidden
				isReadOnly
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLAnchorElement>('test-search')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');

		const changeMockFn = jest.fn();
		const submitMockFn = jest.fn((e) => e.preventDefault());
		const dictionary = { button: i18next.t('search.button') };
		render(
			<Search
				name='test-search'
				id='test-search'
				label='test-search'
				value=''
				testId='test-search'
				labelHidden
				isReadOnly
				onChange={changeMockFn}
				clearButton={false}
				onSubmit={submitMockFn}
				dictionary={dictionary}
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLAnchorElement>('test-search')).toMatchSnapshot();
	});
});