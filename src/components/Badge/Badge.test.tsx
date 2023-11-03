import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge tests', () => {
	it('is rendered correctly', () => {
		render(<Badge>Badge</Badge>);

		expect(screen.getByText<HTMLSpanElement>(/badge/i)).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(<Badge>Badge</Badge>);

		expect(screen.getByText<HTMLSpanElement>(/badge/i)).toMatchSnapshot();
	});

	it('is a snapshot with the appearance type "default"', () => {
		render(<Badge appearance='default'>Badge</Badge>);

		expect(screen.getByText<HTMLSpanElement>(/badge/i)).toMatchSnapshot();
	});

	it('is a snapshot with the appearance type "info"', () => {
		render(<Badge appearance='info'>Badge</Badge>);

		expect(screen.getByText<HTMLSpanElement>(/badge/i)).toMatchSnapshot();
	});

	it('is a snapshot with the appearance type "success"', () => {
		render(<Badge appearance='success'>Badge</Badge>);

		expect(screen.getByText<HTMLSpanElement>(/badge/i)).toMatchSnapshot();
	});

	it('is a snapshot with the appearance type "warning"', () => {
		render(<Badge appearance='warning'>Badge</Badge>);

		expect(screen.getByText<HTMLSpanElement>(/badge/i)).toMatchSnapshot();
	});

	it('is a snapshot with the appearance type "danger"', () => {
		render(<Badge appearance='danger'>Badge</Badge>);

		expect(screen.getByText<HTMLSpanElement>(/badge/i)).toMatchSnapshot();
	});
});

