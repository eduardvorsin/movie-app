import { render, screen } from '@testing-library/react';
import TextField from './TextField';
import userEvent from '@testing-library/user-event';

describe('TextField tests', () => {
	it('is rendered correctly', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-field')).toBeInTheDocument();
	});

	it('the mock function is triggered when a value is entered into the input', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
			/>
		);

		await user.type(screen.getByRole<HTMLInputElement>('textbox'), 'abcdef');

		expect(mockFn).toHaveBeenCalledTimes(6);
	})

	it('when the isRequired prop is true, an asterisk appears at the end of the label', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
				isRequired
			/>
		);

		expect(screen.getByText<HTMLSpanElement>('*')).toBeInTheDocument();
	});

	it('when the prop IsInvalid is true the border color turns red', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
				isInvalid
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('textbox')).toHaveClass('border-red-600');
	});

	it('The mock function is triggered when the focus hits the input', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				onFocus={mockFn}
				testId='test-field'
			/>
		);

		await user.tab();

		expect(mockFn).toHaveBeenCalledTimes(1);
	})

	it('The mock function is triggered when the focus is lost from the input', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				onBlur={mockFn}
				testId='test-field'
			/>
		);

		await user.tab();
		await user.tab();

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('the mock function is triggered when the clear button is clicked', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
				onClear={mockFn}
				clearButton
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /clear/i }));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('when the clearButton prop is true, the input clearing button appears', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
				clearButton
			/>
		);

		expect(screen.getByRole<HTMLButtonElement>('button', { name: /clear/i })).toBeInTheDocument();
	});

	it('when the labelHidden prop is true, the label becomes visible only to screen readers', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
				labelHidden
			/>
		);

		expect(screen.getByText<HTMLLabelElement>('test-field')).toHaveClass('sr-only');
	});

	it('when the error prop is not empty, an error message is displayed next to the input', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
				error='mock error'
			/>
		);

		expect(screen.getByText<HTMLParagraphElement>('mock error')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-field')).toMatchSnapshot();
	});

	it('is a snapshot with isDisabled set to true', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
				isDisabled
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-field')).toMatchSnapshot();
	});

	it('is a snapshot with isReadonly set to true', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
				isReadOnly
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-field')).toMatchSnapshot();
	});

	it('is a snapshot with isInvalid set to true', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
				isInvalid
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-field')).toMatchSnapshot();
	});

	it('is a snapshot with isRequired set to true', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
				isRequired
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-field')).toMatchSnapshot();
	});

	it('is a snapshot with clear button', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
				clearButton
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-field')).toMatchSnapshot();
	});

	it('is a snapshot with an error message', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
				error='mock error'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-field')).toMatchSnapshot();
	});

	it('is a snapshot with labelHidden set to true', () => {
		const mockFn = jest.fn();
		render(
			<TextField
				onChange={mockFn}
				name='test-field'
				label='test-field'
				id='test-field'
				value='mock'
				testId='test-field'
				labelHidden
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-field')).toMatchSnapshot();
	});
});