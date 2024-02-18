import { render, screen } from "@testing-library/react";
import LoadingLayout from "./LoadingLayout";

describe('LoadingLayout tests', () => {
	it('is rendered correctly', () => {
		render(<LoadingLayout testId='test-loading-layout' />);

		expect(screen.getByTestId<HTMLDivElement>('test-loading-layout')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(<LoadingLayout testId='test-loading-layout' />);

		expect(screen.getByTestId<HTMLDivElement>('test-loading-layout')).toMatchSnapshot();
	});
});