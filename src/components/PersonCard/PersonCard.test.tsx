import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PersonCard from './PersonCard';
import i18next from '@/i18n/client';
import I18nextWrapper from '@/test-utils/I18nextWrapper';

describe('PersonCard tests', () => {
	it('is rendered correctly', async () => {
		const dictionary = { rating: 'Popularity' };

		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test card'
				dictionary={dictionary}
			>
				test text
			</PersonCard>
		);

		expect(await screen.findByTestId<HTMLAnchorElement>('test card')).toBeInTheDocument();
	});

	it('when click on the card, the mock function should work', async () => {
		const mockFn = jest.fn();
		const user = userEvent.setup();
		const dictionary = { rating: i18next.t('personCard.rating') };

		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test card'
				dictionary={dictionary}
				onClick={mockFn}
			>
				test text
			</PersonCard>
		);

		await screen.findByTestId<HTMLAnchorElement>('test card');

		await user.click(screen.getByRole<HTMLAnchorElement>('link'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('if title is not an empty string, then the title is rendered', async () => {
		const dictionary = { rating: 'Popularity' };

		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test card'
				title='test title'
				dictionary={dictionary}
			>
				test text
			</PersonCard>
		);
		await screen.findByTestId<HTMLAnchorElement>('test card');

		expect(screen.getByRole<HTMLHeadingElement>('heading')).toBeInTheDocument();
	});

	it('if showRating is true it should show the rating value', async () => {
		const dictionary = { rating: 'Popularity' };

		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test card'
				rating={30}
				showRating
				dictionary={dictionary}
			>
				test text
			</PersonCard>
		);
		await screen.findByTestId<HTMLAnchorElement>('test card');

		expect(screen.getByText<HTMLSpanElement>('30')).toBeInTheDocument();
	});

	it('is a basic snapshot', async () => {
		const dictionary = { rating: 'Popularity' };

		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test card'
				dictionary={dictionary}
			>
				test text
			</PersonCard>
		);
		await screen.findByTestId<HTMLAnchorElement>('test card');

		expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
	});

	it('is a snapshot with title', async () => {
		const dictionary = { rating: 'Popularity' };

		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test card'
				dictionary={dictionary}
			>
				test text
			</PersonCard>
		);
		await screen.findByTestId<HTMLAnchorElement>('test card');

		expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
	});

	it('is a snapshot with showRating', async () => {
		const dictionary = { rating: 'Popularity' };

		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test card'
				dictionary={dictionary}
			>
				test text
			</PersonCard>
		);
		await screen.findByTestId<HTMLAnchorElement>('test card');

		expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
	});
});

describe('PersonCard integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('personCard.rating'));

		const dictionary = { rating: i18next.t('personCard.rating') };
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test card'
				dictionary={dictionary}
				rating={90}
				showRating
			>
				test text
			</PersonCard>,
			{ wrapper: I18nextWrapper }
		);

		await screen.findByTestId<HTMLAnchorElement>('test card');
		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('personCard.rating'));

		const dictionary = { rating: i18next.t('personCard.rating') };
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test card'
				dictionary={dictionary}
				rating={90}
				showRating
			>
				test text
			</PersonCard>,
			{ wrapper: I18nextWrapper }
		);

		await screen.findByTestId<HTMLAnchorElement>('test card');
		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');

		const dictionary = { rating: i18next.t('personCard.rating') };
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test card'
				dictionary={dictionary}
				rating={90}
				showRating
			>
				test text
			</PersonCard>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLAnchorElement>('test card')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');

		const dictionary = { rating: i18next.t('personCard.rating') };
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test card'
				dictionary={dictionary}
				rating={90}
				showRating
			>
				test text
			</PersonCard>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLAnchorElement>('test card')).toMatchSnapshot();
	});
});