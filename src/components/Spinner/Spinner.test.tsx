import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner tests', () => {
	it('is rendered correctly', () => {
		render(<Spinner testId='spinner' />);

		expect(screen.getByTestId<HTMLSpanElement>('spinner')).toBeInTheDocument();
	});

	it('if the size is xlarge, then classes w-24 and h-24 should be added', () => {
		render(<Spinner testId='spinner' size='xlarge' />);

		expect(screen.getByTestId<HTMLSpanElement>('spinner')).toHaveClass('w-24 h-24')
	});

	it('is a basic snapshot', () => {
		render(<Spinner testId='spinner' />);

		expect(screen.getByTestId<HTMLSpanElement>('spinner')).toMatchSnapshot();
	});

	it('is a snapshot with a size of type "small"', () => {
		render(<Spinner testId='spinner' size='small' />);

		expect(screen.getByTestId<HTMLSpanElement>('spinner')).toMatchSnapshot();
	});

	it('is a snapshot with a size of type "medium"', () => {
		render(<Spinner testId='spinner' size='medium' />);

		expect(screen.getByTestId<HTMLSpanElement>('spinner')).toMatchSnapshot();
	});

	it('is a snapshot with a size of type "large"', () => {
		render(<Spinner testId='spinner' size='large' />);

		expect(screen.getByTestId<HTMLSpanElement>('spinner')).toMatchSnapshot();
	});

	it('is a snapshot with a size of type "xlarge"', () => {
		render(<Spinner testId='spinner' size='xlarge' />);

		expect(screen.getByTestId<HTMLSpanElement>('spinner')).toMatchSnapshot();
	});
});