import { fireEvent, render, screen } from "@testing-library/react";
import SelectOption from "./SelectOption";
import userEvent from "@testing-library/user-event";

describe('SelectOption tests', () => {
	it('is rendered correctly', () => {
		const clickMockFn = jest.fn();
		const keyDownMockFn = jest.fn();

		render(
			<SelectOption
				value='test'
				label='test'
				id='test'
				onClick={clickMockFn}
				onKeyDown={keyDownMockFn}
				isFocused={false}
				isSelected={false}
			/>
		);

		expect(screen.getByRole<HTMLLIElement>('option')).toBeInTheDocument();
	});

	it('when you click on the option, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const clickMockFn = jest.fn();
		const keyDownMockFn = jest.fn();

		render(
			<SelectOption
				value='test'
				label='test'
				id='test'
				onClick={clickMockFn}
				onKeyDown={keyDownMockFn}
				isFocused={false}
				isSelected={false}
			/>
		);

		await user.click(screen.getByRole<HTMLLIElement>('option'));

		expect(clickMockFn).toHaveBeenCalledTimes(1);
	});

	it('when you press the option key, the mock function is triggered', () => {
		const clickMockFn = jest.fn();
		const keyDownMockFn = jest.fn();

		render(
			<SelectOption
				value='test'
				label='test'
				id='test'
				onClick={clickMockFn}
				onKeyDown={keyDownMockFn}
				isFocused={false}
				isSelected={false}
			/>
		);

		fireEvent.keyDown(screen.getByRole<HTMLLIElement>('option'))

		expect(keyDownMockFn).toHaveBeenCalledTimes(1);
	});

	it('is a basic snapshot', () => {
		const clickMockFn = jest.fn();
		const keyDownMockFn = jest.fn();

		render(
			<SelectOption
				value='test'
				label='test'
				id='test'
				onClick={clickMockFn}
				onKeyDown={keyDownMockFn}
				isFocused={false}
				isSelected={false}
			/>
		);

		expect(screen.getByRole<HTMLLIElement>('option')).toMatchSnapshot();
	});

	it('is a snapshot with isSelected equal to true', () => {
		const clickMockFn = jest.fn();
		const keyDownMockFn = jest.fn();

		render(
			<SelectOption
				value='test'
				label='test'
				id='test'
				onClick={clickMockFn}
				onKeyDown={keyDownMockFn}
				isFocused={false}
				isSelected={true}
			/>
		);

		expect(screen.getByRole<HTMLLIElement>('option')).toBeInTheDocument();
	});

	it('is a snapshot with isFocused equal to true', () => {
		const clickMockFn = jest.fn();
		const keyDownMockFn = jest.fn();

		render(
			<SelectOption
				value='test'
				label='test'
				id='test'
				onClick={clickMockFn}
				onKeyDown={keyDownMockFn}
				isFocused={true}
				isSelected={false}
			/>
		);

		expect(screen.getByRole<HTMLLIElement>('option')).toBeInTheDocument();
	});
});