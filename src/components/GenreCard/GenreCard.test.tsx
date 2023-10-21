import { render, screen } from '@testing-library/react';
import GenreCard from './GenreCard';
import userEvent from '@testing-library/user-event';

describe('GenreCard tests', () => {
	it('is rendered correctly', () => {
		render(
			<GenreCard
				href='/'
				genre='comedy'
				title='comedy'
				titleElement='h3'
			/>
		);

		expect(screen.getByRole<HTMLAnchorElement>('link')).toBeInTheDocument();
	});

	it('when you click on the link, the mock function should call', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<GenreCard
				href='/'
				genre='horror'
				title='horror'
				titleElement='h3'
				onClick={mockFn}
			/>
		);

		await user.click(screen.getByRole<HTMLAnchorElement>('link'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('is a basic snapshot', () => {
		render(
			<GenreCard
				href='/'
				genre='history'
				title='history'
				titleElement='h3'
			/>
		);

		expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
	});
});