import { render, screen } from "@testing-library/react";
import BreadcrumbsItem from "./BreadcrumbsItem";
import userEvent from "@testing-library/user-event";

describe('BreadcrumbsItem tests', () => {
	it('is rendered correctly', () => {
		render(
			<BreadcrumbsItem
				isLastItem={false}
				testId='test-breadcrumbs-item'
			>
				movies
			</BreadcrumbsItem>
		);

		expect(screen.getByTestId<HTMLAnchorElement>('test-breadcrumbs-item')).toBeInTheDocument();
	});

	it('when clicking on a component, the mock function is called', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<BreadcrumbsItem
				isLastItem={false}
				onClick={mockFn}
				testId='test-breadcrumbs-item'
			>
				movies
			</BreadcrumbsItem>
		);

		await user.click(screen.getByRole<HTMLAnchorElement>('link'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('if isLastItem is true when clicking on the link, then the mock function will not be called', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<BreadcrumbsItem
				isLastItem={true}
				onClick={mockFn}
				testId='test-breadcrumbs-item'
			>
				movies
			</BreadcrumbsItem>
		);

		await user.click(screen.getByRole<HTMLAnchorElement>('link'));

		expect(mockFn).toHaveBeenCalledTimes(0);
	});

	it('is a basic snapshot', () => {
		render(
			<BreadcrumbsItem
				isLastItem={false}
				testId='test-breadcrumbs-item'
			>
				movies
			</BreadcrumbsItem>
		);

		expect(screen.getByTestId<HTMLAnchorElement>('test-breadcrumbs-item')).toMatchSnapshot();
	});

	it('is a snapshot with a truncationWidth of 100', () => {
		render(
			<BreadcrumbsItem
				isLastItem={false}
				truncationWidth={100}
				testId='test-breadcrumbs-item'
			>
				movies
			</BreadcrumbsItem>
		);

		expect(screen.getByTestId<HTMLAnchorElement>('test-breadcrumbs-item')).toMatchSnapshot();
	});

	it('is a snapshot with isLastItem equal to true', () => {
		render(
			<BreadcrumbsItem
				isLastItem={true}
				testId='test-breadcrumbs-item'
			>
				movies
			</BreadcrumbsItem>
		);

		expect(screen.getByTestId<HTMLAnchorElement>('test-breadcrumbs-item')).toMatchSnapshot();
	});
});