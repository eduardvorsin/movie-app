import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Title tests', () => {
	it('is rendered correctly', () => {
		render(<Title level={1}>Title</Title>)

		expect(screen.getByText<HTMLHeadingElement>(/title/i)).toBeInTheDocument();
	});

	it('If the prop Level is 4, then the text-300 class should be added', () => {
		render(<Title level={4}>Title</Title>)

		expect(screen.getByText<HTMLHeadingElement>(/title/i)).toHaveClass('text-300');
	});

	it('is a basic snapshot', () => {
		render(<Title level={4}>Title</Title>)

		expect(screen.getByText<HTMLHeadingElement>(/title/i)).toMatchSnapshot();
	});

	it('is a snapshot with header level 2', () => {
		render(<Title level={2}>Title</Title>)

		expect(screen.getByText<HTMLHeadingElement>(/title/i)).toMatchSnapshot();
	});

	it('is a snapshot with html element h5', () => {
		render(<Title as='h5' level={3}>Title</Title>)

		expect(screen.getByText<HTMLHeadingElement>(/title/i)).toMatchSnapshot();
	});
});