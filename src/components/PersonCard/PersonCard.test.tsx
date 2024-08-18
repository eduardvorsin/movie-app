import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PersonCard, { Props } from './PersonCard';
import i18next from '@/i18n/client';
import I18nextWrapper from '@/test-utils/I18nextWrapper';
import { MouseEventHandler } from 'react';

const appearances: NonNullable<Props['appearance']>[] = ['primary', 'secondary'];

const dictionary = { rating: 'Popularity' };

describe('PersonCard tests', () => {
	it('is rendered correctly', async () => {


		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test-person-card'
				dictionary={dictionary}
			>
				test text
			</PersonCard>
		);

		expect(await screen.findByTestId<HTMLAnchorElement>('test-person-card')).toBeInTheDocument();
	});

	it('when click on the card, the mock function should work', async () => {
		const mockFn = jest.fn();
		const clickHandler: MouseEventHandler<HTMLAnchorElement> = (e): void => {
			e.preventDefault();
			mockFn();
		};
		const user = userEvent.setup();
		const dictionary = { rating: i18next.t('personCard.rating') };

		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test-person-card'
				dictionary={dictionary}
				onClick={clickHandler}
			>
				test text
			</PersonCard>
		);

		await screen.findByTestId<HTMLAnchorElement>('test-person-card');

		await user.click(screen.getByRole<HTMLAnchorElement>('link'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('if title is not an empty string, then the title is rendered', async () => {
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test-person-card'
				title='test title'
				dictionary={dictionary}
			>
				test text
			</PersonCard>
		);

		expect(await screen.findByRole<HTMLHeadingElement>('heading')).toBeInTheDocument();
	});

	it('if showRating is true it should show the rating value', async () => {
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test-person-card'
				rating={30}
				showRating
				dictionary={dictionary}
			>
				test text
			</PersonCard>
		);

		expect(await screen.findByText<HTMLSpanElement>('30')).toBeInTheDocument();
	});

	it('is a basic snapshot', async () => {
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test-person-card'
				dictionary={dictionary}
			>
				test text
			</PersonCard>
		);

		expect(await screen.findByTestId<HTMLAnchorElement>('test-person-card')).toMatchSnapshot();
	});

	it('is a snapshot with title', async () => {
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test-person-card'
				dictionary={dictionary}
			>
				test text
			</PersonCard>
		);

		expect(await screen.findByTestId<HTMLAnchorElement>('test-person-card')).toMatchSnapshot();
	});

	it('is a snapshot with showRating', async () => {
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test-person-card'
				dictionary={dictionary}
			>
				test text
			</PersonCard>
		);

		expect(await screen.findByTestId<HTMLAnchorElement>('test-person-card')).toMatchSnapshot();
	});

	it.each(appearances)('is a snapshot with appearance equal to "$s"', async (appearance) => {
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test-person-card'
				dictionary={dictionary}
				appearance={appearance}
			>
				test text
			</PersonCard>
		);

		expect(await screen.findByTestId<HTMLAnchorElement>('test-person-card')).toBeInTheDocument();
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
				testId='test-person-card'
				dictionary={dictionary}
				rating={90}
				showRating
			>
				test text
			</PersonCard>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByText<HTMLSpanElement>(translation)).toBeInTheDocument();
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
				testId='test-person-card'
				dictionary={dictionary}
				rating={90}
				showRating
			>
				test text
			</PersonCard>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');

		const dictionary = { rating: i18next.t('personCard.rating') };
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test-person-card'
				dictionary={dictionary}
				rating={90}
				showRating
			>
				test text
			</PersonCard>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLAnchorElement>('test-person-card')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');

		const dictionary = { rating: i18next.t('personCard.rating') };
		render(
			<PersonCard
				personId={1}
				src='/'
				alt='alternative text'
				testId='test-person-card'
				dictionary={dictionary}
				rating={90}
				showRating
			>
				test text
			</PersonCard>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLAnchorElement>('test-person-card')).toMatchSnapshot();
	});
});