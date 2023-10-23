import { render, screen } from '@testing-library/react';
import Search from './Search';
import userEvent from '@testing-library/user-event';

describe('Search tests', () => {
	it('is rendered correctly', () => {
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
				onSubmit={submitMockFn}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-search')).toBeInTheDocument();
	});

	it('when submitting the form, the mock function is triggered', async () => {
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
				onSubmit={submitMockFn}
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button'));

		expect(submitMockFn).toHaveBeenCalledTimes(1);
	});

	it('when entering text into the input, the mock function is triggered', async () => {
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
				onSubmit={submitMockFn}
			/>
		);

		await user.type(screen.getByRole<HTMLInputElement>('textbox'), 'a');

		expect(changeMockFn).toHaveBeenCalledTimes(1);
	});

	it('when the input receives the focus, the mock function is triggered', async () => {
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
				onSubmit={submitMockFn}
				onFocus={focusMockFn}
			/>
		);

		await user.tab();

		expect(focusMockFn).toHaveBeenCalledTimes(1);
	});

	it('when the input loses focus, the mock function is triggered', async () => {
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
				onSubmit={submitMockFn}
				onFocus={blurMockFn}
			/>
		);

		await user.tab();
		await user.tab();

		expect(blurMockFn).toHaveBeenCalledTimes(1);
	});

	it('when isDisabled is true, the input and the button become inactive', async () => {
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
				onSubmit={submitMockFn}
			/>
		);

		await user.type(screen.getByRole<HTMLInputElement>('textbox'), 'a');
		await user.click(screen.getByRole<HTMLButtonElement>('button'));

		expect(changeMockFn).toHaveBeenCalledTimes(0);
		expect(submitMockFn).toHaveBeenCalledTimes(0);
	});

	it('with IsReadOnly set to true, the mock function is triggered when the focus is on, but not when the value is changed', async () => {
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
				onSubmit={submitMockFn}
				onFocus={focusMockFn}
			/>
		);

		await user.type(screen.getByRole<HTMLInputElement>('textbox'), 'a');
		await user.tab();

		expect(changeMockFn).toHaveBeenCalledTimes(0);
		expect(focusMockFn).toHaveBeenCalledTimes(1);
	});

	it('if IsInvalid is true, the input\'s border color turns red', () => {
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
				onSubmit={submitMockFn}
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('textbox')).toHaveClass('border-red-600');
	});

	it('when labelHidden is set to true, the label should be visible only to screen readers', () => {
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
				onSubmit={submitMockFn}
			/>
		);

		expect(screen.getByText<HTMLLabelElement>('test-search')).toHaveClass('sr-only');
	});

	it('when the error prop is not empty, an error message is displayed next to the input', () => {
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
				onSubmit={submitMockFn}
			/>
		);

		expect(screen.getByText<HTMLParagraphElement>('mock error')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
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
				onSubmit={submitMockFn}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-search')).toMatchSnapshot();
	});

	it('is a snapshot with labelHidden set to true', () => {
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
				onSubmit={submitMockFn}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-search')).toMatchSnapshot();
	});

	it('is a snapshot with isDisabled set to true', () => {
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
				onSubmit={submitMockFn}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-search')).toMatchSnapshot();
	});

	it('is snapshot with IsInvalid equal to true', () => {
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
				onSubmit={submitMockFn}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-search')).toMatchSnapshot();
	});

	it('is a snapshot with IsReadOnly equal to true', () => {
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
				onSubmit={submitMockFn}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-search')).toMatchSnapshot();
	});
});