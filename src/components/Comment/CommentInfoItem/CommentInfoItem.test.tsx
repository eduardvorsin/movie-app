import { render, screen } from "@testing-library/react";
import CommentInfoItem from "./CommentInfoItem";
import userEvent from "@testing-library/user-event";

describe('CommentInfoItem tests', () => {
	it('is rendered correctly', () => {
		render(
			<CommentInfoItem
				type='author'
			>
				test item
			</CommentInfoItem>
		);

		expect(screen.getByRole<HTMLButtonElement>('button')).toBeInTheDocument();
	});

	it('if the prop href is not empty then the link is rendered', () => {
		render(
			<CommentInfoItem
				href='/'
				type='author'
			>
				test item
			</CommentInfoItem>
		);

		expect(screen.getByRole<HTMLAnchorElement>('link')).toBeInTheDocument();
	});

	it('when you click on an element, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();

		render(
			<CommentInfoItem
				href='/'
				type='author'
				onClick={mockFn}
			>
				test item
			</CommentInfoItem>
		);

		await user.click(screen.getByRole<HTMLAnchorElement>('link'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('when the focus is received, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();

		render(
			<CommentInfoItem
				href='/'
				type='author'
				onFocus={mockFn}
			>
				test item
			</CommentInfoItem>
		);

		await user.tab();

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('is a basic snapshot', () => {
		render(
			<CommentInfoItem
				type='author'
			>
				test item
			</CommentInfoItem>
		);

		expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
	});

	it('is a snapshot with an element in the form of a link', () => {
		render(
			<CommentInfoItem
				type='author'
				href='/'
			>
				test item
			</CommentInfoItem>
		);

		expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
	});
});