import { render, screen } from "@testing-library/react";
import CommentAction from "./CommentAction";
import userEvent from "@testing-library/user-event";

describe('CommentAction tests', () => {
	it('is rendered correctly', () => {
		const clickMockFn = jest.fn();
		render(
			<CommentAction
				onClick={clickMockFn}
			>
				test item
			</CommentAction>
		);

		expect(screen.getByRole<HTMLButtonElement>('button')).toBeInTheDocument();
	});

	it('if isDisabled is true then the mock functions for click and focus do not work', async () => {
		const clickMockFn = jest.fn();
		const focusMockFn = jest.fn();
		const user = userEvent.setup();
		render(
			<CommentAction
				isDisabled
				onClick={clickMockFn}
				onFocus={focusMockFn}
			>
				test item
			</CommentAction>
		);

		await user.tab();
		await user.click(screen.getByRole<HTMLButtonElement>('button'));

		expect(clickMockFn).toHaveBeenCalledTimes(0);
		expect(focusMockFn).toHaveBeenCalledTimes(0);
	});

	it('when you click on an element, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();

		render(
			<CommentAction
				onClick={mockFn}
			>
				test item
			</CommentAction>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('when the focus is received, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const clickMockFn = jest.fn();
		const focusMockFn = jest.fn();

		render(
			<CommentAction
				onClick={clickMockFn}
				onFocus={focusMockFn}
			>
				test item
			</CommentAction>
		);

		await user.tab();

		expect(focusMockFn).toHaveBeenCalledTimes(1);
	});

	it('is a basic snapshot', () => {
		const clickMockFn = jest.fn();
		render(
			<CommentAction
				onClick={clickMockFn}
			>
				test item
			</CommentAction>
		);

		expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
	});

	it('is a snapshot with an element in the form of a link', () => {
		const clickMockFn = jest.fn();
		render(
			<CommentAction
				onClick={clickMockFn}
			>
				test item
			</CommentAction>
		);

		expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
	});
});