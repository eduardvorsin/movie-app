import { render, screen } from "@testing-library/react";
import Select, { Props, SelectOption } from "./Select";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

const options: SelectOption[] = [
	{ value: "dog", label: "Dog" },
	{ value: "cat", label: "Cat" },
	{ value: "lion", label: "Lion" },
	{ value: "tiger", label: "Tiger" },
	{ value: "elephant", label: "Elephant" },
	{ value: "giraffe", label: "Giraffe" },
	{ value: "zebra", label: "Zebra" },
	{ value: "penguin", label: "Penguin" },
	{ value: "panda", label: "Panda" },
	{ value: "koala", label: "Koala" },
];

const TestSelect = ({ ...props }: Omit<Props, 'value' | 'options'>) => {
	const [value, setValue] = useState<string | null>(null);
	const changeHandler = (optionValue: string): void => {
		setValue(optionValue);
		props.onChange(optionValue);
	};
	return (
		<Select
			{...props}
			options={options}
			value={value}
			onChange={changeHandler}
		/>
	);
};


describe('Select tests', () => {
	it('is rendered correctly', () => {
		const mockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={mockFn}
				testId='test-select'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-select')).toBeInTheDocument();
	});

	it('when selecting a new option, the mock function should be called', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={mockFn}
				testId='test-select'
			/>
		);

		await user.click(screen.getAllByRole<HTMLLIElement>('option')[2]);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('when the focus is received, the mock function must be called', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const focusMockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={changeMockFn}
				onFocus={focusMockFn}
				testId='test-select'
			/>
		);

		await user.tab();

		expect(focusMockFn).toHaveBeenCalledTimes(1);
	});

	it('if the focus is lost, the mock function should be called by the button', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const blurMockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={changeMockFn}
				onBlur={blurMockFn}
				testId='test-select'
			/>
		);

		await user.tab();
		await user.tab();

		expect(blurMockFn).toHaveBeenCalledTimes(1);
	});

	it('when the key is pressed, the mock function should be called', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const keyDownMockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={changeMockFn}
				onKeyDown={keyDownMockFn}
				testId='test-select'
			/>
		);

		await user.tab();
		await user.keyboard('{Enter}');

		expect(keyDownMockFn).toHaveBeenCalledTimes(1);
	});

	it('when closing the menu, the mock function should be called', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const closeMockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={changeMockFn}
				onMenuClose={closeMockFn}
				testId='test-select'
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('combobox'));
		await user.click(screen.getByRole<HTMLButtonElement>('combobox'));

		expect(closeMockFn).toHaveBeenCalledTimes(1);
	});

	it('when opening the menu, the mock function should be called', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		const openMockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={changeMockFn}
				onMenuOpen={openMockFn}
				testId='test-select'
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('combobox'));

		expect(openMockFn).toHaveBeenCalledTimes(1);
	});

	it('when you click on the button, the menu should open', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={changeMockFn}
				testId='test-select'
			/>
		);

		expect(screen.getByRole<HTMLUListElement>('listbox')).toHaveClass('hidden');

		await user.click(screen.getByRole<HTMLButtonElement>('combobox'));

		expect(screen.getByRole<HTMLUListElement>('listbox')).toHaveClass('block');
	});

	it('when closeMenuOnSelect is set to true it should close the menu when an option is selected', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={changeMockFn}
				closeMenuOnSelect
				testId='test-select'
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('combobox'));

		expect(screen.getByRole<HTMLUListElement>('listbox')).toHaveClass('block');

		await user.click(screen.getAllByRole<HTMLLIElement>('option')[2]);

		expect(screen.getByRole<HTMLUListElement>('listbox')).toHaveClass('hidden');
	});

	it('when openMenuOnFocus is set to true, it should open the menu when the focus is received by the button', async () => {
		const user = userEvent.setup();
		const changeMockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={changeMockFn}
				openMenuOnFocus
				testId='test-select'
			/>
		);

		expect(screen.getByRole<HTMLUListElement>('listbox')).toHaveClass('hidden');

		await user.tab();

		expect(screen.getByRole<HTMLUListElement>('listbox')).toHaveClass('block');
	});

	it('is a basic snapshot', () => {
		const mockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={mockFn}
				testId='test-select'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-select')).toMatchSnapshot();
	});

	it('is a snapshot with placeholder', () => {
		const mockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={mockFn}
				placeholder='test placeholder'
				testId='test-select'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-select')).toMatchSnapshot();
	});

	it('is a snapshot with an error', () => {
		const mockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={mockFn}
				error='test error'
				testId='test-select'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-select')).toMatchSnapshot();
	});

	it('is a snapshot with labelHidden set to true', () => {
		const mockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={mockFn}
				labelHidden
				testId='test-select'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-select')).toMatchSnapshot();
	});

	it('is a snapshot with isRequired set to true', () => {
		const mockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={mockFn}
				isRequired
				testId='test-select'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-select')).toMatchSnapshot();
	});

	it('is a snapshot with isDisabled set to true', () => {
		const mockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={mockFn}
				isDisabled
				testId='test-select'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-select')).toMatchSnapshot();
	});

	it('is a snapshot with IsInvalid set to true', () => {
		const mockFn = jest.fn();
		render(
			<TestSelect
				label='test-select'
				id='test-select'
				name='test-select'
				onChange={mockFn}
				isInvalid
				testId='test-select'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-select')).toMatchSnapshot();
	});
});