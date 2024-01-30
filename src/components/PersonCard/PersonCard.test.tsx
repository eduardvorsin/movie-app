import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PersonCard from './PersonCard';

describe('PersonCard tests', () => {
	it('is rendered correctly', async () => {
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test card'
				dictionary={{ rating: 'Popularity' }}
			>
				test text
			</PersonCard>
		);
		await screen.findByTestId<HTMLAnchorElement>('test card');

		expect(screen.getByRole<HTMLAnchorElement>('link')).toBeInTheDocument();
	});

	it('when click on the card, the mock function should work', async () => {
		const mockFn = jest.fn();
		const user = userEvent.setup();
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				onClick={mockFn}
				testId='test card'
				dictionary={{ rating: 'Popularity' }}
			>
				test text
			</PersonCard>
		);
		await screen.findByTestId<HTMLAnchorElement>('test card');

		await user.click(screen.getByRole<HTMLAnchorElement>('link'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('if title is not an empty string, then the title is rendered', async () => {
		render(
			<PersonCard
				personId={1}
				src='/'
				title='test title'
				alt='alternative text'
				testId='test card'
				dictionary={{ rating: 'Popularity' }}
			>
				test text
			</PersonCard>
		);
		await screen.findByTestId<HTMLAnchorElement>('test card');

		expect(screen.getByRole<HTMLHeadingElement>('heading')).toBeInTheDocument();
	});

	it('if showRating is true it should show the rating value', async () => {
		render(
			<PersonCard
				personId={1}
				src='/'
				title='test title'
				alt='alternative text'
				showRating
				rating={30}
				testId='test card'
				dictionary={{ rating: 'Popularity' }}
			>
				test text
			</PersonCard>
		);
		await screen.findByTestId<HTMLAnchorElement>('test card');

		expect(screen.getByText<HTMLSpanElement>('30')).toBeInTheDocument();
	});

	it('is a basic snapshot', async () => {
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test card'
				dictionary={{ rating: 'Popularity' }}
			>
				test text
			</PersonCard>
		);
		await screen.findByTestId<HTMLAnchorElement>('test card');

		expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
	});

	it('is a snapshot with title', async () => {
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				title='test title'
				testId='test card'
				dictionary={{ rating: 'Popularity' }}
			>
				test text
			</PersonCard>
		);
		await screen.findByTestId<HTMLAnchorElement>('test card');

		expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
	});

	it('is a snapshot with showRating', async () => {
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				rating={30}
				showRating
				testId='test card'
				dictionary={{ rating: 'Popularity' }}
			>
				test text
			</PersonCard>
		);
		await screen.findByTestId<HTMLAnchorElement>('test card');

		expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
	});
});