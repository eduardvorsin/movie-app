import { render, screen } from "@testing-library/react";
import Container from "./Container";

describe('Container tests', () => {
	it('is rendered correctly', () => {
		render(
			<Container testId='test-container'>test content</Container>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-container')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(
			<Container testId='test-container'>test content</Container>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-container')).toMatchSnapshot();
	});
});