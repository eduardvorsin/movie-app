import { render, screen } from '@testing-library/react';
import Badge, { Props } from './Badge';

const appearances: NonNullable<Props['appearance']>[] = ['default', 'info', 'success', 'warning', 'danger']

describe('Badge tests', () => {
	it('is rendered correctly', () => {
		render(<Badge>Badge</Badge>);

		expect(screen.getByText<HTMLSpanElement>(/badge/i)).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(<Badge>Badge</Badge>);

		expect(screen.getByText<HTMLSpanElement>(/badge/i)).toMatchSnapshot();
	});

	it.each(appearances)('is a snapshot with the appearance type "%s"', (appearance) => {
		render(<Badge appearance={appearance}>Badge</Badge>);

		expect(screen.getByText<HTMLSpanElement>(/badge/i)).toMatchSnapshot();
	});
});

