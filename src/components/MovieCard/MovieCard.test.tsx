import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieCard, { Props } from './MovieCard';
import i18next from '@/i18n/client';
import I18nextWrapper from '@/test-utils/I18nextWrapper';
import { MouseEventHandler } from 'react';

const mediaTypes: NonNullable<Props['mediaType']>[] = ['movie', 'tv'];
const appearances: NonNullable<Props['appearance']>[] = ['primary', 'secondary'];
const variants: NonNullable<Props['variant']>[] = ['vertical', 'horizontal'];

describe('MovieCard tests', () => {
	it('is rendered correctly', async () => {
		render(
			<MovieCard
				movieId={1}
				mediaType='movie'
				src='/'
				alt='alternative text'
				testId='test-movie-card'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-movie-card')).toBeInTheDocument();
	});

	it('when click on the card, the mock function should work', async () => {
		const mockFn = jest.fn();
		const clickHandler: MouseEventHandler<HTMLAnchorElement> = (e): void => {
			e.preventDefault();
			mockFn();
		};
		const user = userEvent.setup();

		render(
			<MovieCard
				movieId={1}
				mediaType='movie'
				src='/'
				alt='alternative text'
				testId='test-movie-card'
				onClick={clickHandler}
			/>
		);

		await screen.findByTestId<HTMLDivElement>('test-movie-card');

		await user.click(screen.getAllByRole<HTMLAnchorElement>('link')[0]);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('if title is not an empty string, then the title is rendered', async () => {
		render(
			<MovieCard
				movieId={1}
				mediaType='movie'
				src='/'
				alt='alternative text'
				testId='test-movie-card'
				title='test title'
			/>
		);

		expect(await screen.findByRole<HTMLHeadingElement>('heading')).toBeInTheDocument();
	});

	it('if showRating is true it should show the rating value', async () => {
		render(
			<MovieCard
				movieId={1}
				mediaType='movie'
				src='/'
				alt='alternative text'
				testId='test-movie-card'
				showRating
				rating={80}
			/>
		);

		expect(await screen.findByText<HTMLSpanElement>('80')).toBeInTheDocument();
	});

	it('is a basic snapshot', async () => {
		render(
			<MovieCard
				movieId={1}
				mediaType='movie'
				src='/'
				alt='alternative text'
				testId='test-movie-card'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-movie-card')).toMatchSnapshot();
	});

	it('is a snapshot with title', async () => {
		render(
			<MovieCard
				movieId={1}
				mediaType='movie'
				src='/'
				alt='alternative text'
				testId='test-movie-card'
				title='test title'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-movie-card')).toMatchSnapshot();
	});

	it('is a snapshot with showRating', async () => {
		render(
			<MovieCard
				movieId={1}
				mediaType='movie'
				src='/'
				alt='alternative text'
				testId='test-movie-card'
				showRating
				rating={80}
				title='test title'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-movie-card')).toMatchSnapshot();
	});

	it.each(mediaTypes)('is a snapshot with mediaType equal to "%s"', async (mediaType) => {
		render(
			<MovieCard
				movieId={1}
				mediaType={mediaType}
				src='/'
				alt='alternative text'
				testId='test-movie-card'
				title='test title'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-movie-card')).toMatchSnapshot();
	});

	it.each(appearances)('is a snapshot with appearance equal to "%s"', async (appearance) => {
		render(
			<MovieCard
				movieId={1}
				mediaType={'tv'}
				appearance={appearance}
				src='/'
				alt='alternative text'
				testId='test-movie-card'
				title='test title'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-movie-card')).toMatchSnapshot();
	});

	it.each(variants)('is a snapshot with variant equal to "%s"', async (variant) => {
		render(
			<MovieCard
				movieId={1}
				mediaType={'tv'}
				variant={variant}
				src='/'
				alt='alternative text'
				testId='test-movie-card'
				title='test title'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-movie-card')).toMatchSnapshot();
	});
});

describe('MovieCard integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('movieCard.rating'));

		render(
			<MovieCard
				movieId={1}
				mediaType='movie'
				src='/'
				rating={80}
				showRating
				alt='alternative text'
				testId='test-movie-card'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByLabelText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('movieCard.rating'));

		render(
			<MovieCard
				movieId={1}
				mediaType='movie'
				src='/'
				rating={80}
				showRating
				alt='alternative text'
				testId='test-movie-card'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByLabelText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');

		render(
			<MovieCard
				movieId={1}
				mediaType='movie'
				src='/'
				rating={80}
				showRating
				alt='alternative text'
				testId='test-movie-card'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-movie-card')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');

		render(
			<MovieCard
				movieId={1}
				mediaType='movie'
				src='/'
				rating={80}
				showRating
				alt='alternative text'
				testId='test-movie-card'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-movie-card')).toMatchSnapshot();
	});
});