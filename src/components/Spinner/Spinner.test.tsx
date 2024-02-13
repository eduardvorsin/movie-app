import { render, screen } from '@testing-library/react';
import Spinner, { Props } from './Spinner';

const sizes: NonNullable<Props['size']>[] = ['small', 'medium', 'large', 'xlarge'];

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

	it.each(sizes)('is a snapshot with a size of type "%s"', (size) => {
		render(<Spinner testId='spinner' size={size} />);

		expect(screen.getByTestId<HTMLSpanElement>('spinner')).toMatchSnapshot();
	});
});