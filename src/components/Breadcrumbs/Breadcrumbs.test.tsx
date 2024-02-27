import { render, screen } from "@testing-library/react";
import Breadcrumbs from "./Breadcrumbs";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";

const mockUseParams = jest.fn();
const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
	useParams: () => mockUseParams(),
	usePathname: () => mockUsePathname(),
}));

describe('Breadcrumbs tests', () => {
	it('is rendered correctly', async () => {
		mockUseParams.mockReturnValue({ lang: 'en', id: '9999' });
		mockUsePathname.mockReturnValue('/en/movies/9999');

		render(
			<Breadcrumbs
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-breadcrumbs')).toBeInTheDocument();
	});

	it('if the number of elements is less than 3, then all the elements should be rendered', async () => {
		mockUseParams.mockReturnValue({ lang: 'en' });
		mockUsePathname.mockReturnValue('/en/movies');

		render(
			<Breadcrumbs
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
			/>
		);

		expect(await screen.findAllByRole<HTMLAnchorElement>('link')).toHaveLength(2);
	});

	it('if maxItems is more than the number of elements, then it should render all the elements', async () => {
		mockUseParams.mockReturnValue({ lang: 'en', id: '9999' });
		mockUsePathname.mockReturnValue('/en/movies/9999');

		render(
			<Breadcrumbs
				maxItems={5}
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
			/>
		);

		expect(await screen.findAllByRole<HTMLAnchorElement>('link')).toHaveLength(3);
	});

	it('if maxItems is less than the number of elements, then the first and last element should be rendered', async () => {
		mockUseParams.mockReturnValue({ lang: 'en', id: '9999' });
		mockUsePathname.mockReturnValue('/en/tv/9999/seasons');

		render(
			<Breadcrumbs
				maxItems={2}
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
			/>
		);

		expect(await screen.findByText<HTMLSpanElement>(/home page/i)).toBeInTheDocument();
		expect(screen.getByText<HTMLSpanElement>(/seasons/i)).toBeInTheDocument();
	});

	it('is a basic snapshot', async () => {
		mockUseParams.mockReturnValue({ lang: 'en', id: '9999' });
		mockUsePathname.mockReturnValue('/en/movies/9999');

		render(
			<Breadcrumbs
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-breadcrumbs')).toMatchSnapshot();
	});

	it('a snapshot with a truncationWidth of 100', async () => {
		mockUseParams.mockReturnValue({ lang: 'en', id: '9999' });
		mockUsePathname.mockReturnValue('/en/movies/9999');

		render(
			<Breadcrumbs
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
				truncationWidth={100}
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-breadcrumbs')).toMatchSnapshot();
	});

	it('a snapshot when all the elements are rendered', async () => {
		mockUseParams.mockReturnValue({ lang: 'en' });
		mockUsePathname.mockReturnValue('/en/movies');

		render(
			<Breadcrumbs
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-breadcrumbs')).toMatchSnapshot();
	});

	it('snapshot when the first and last element were rendered', async () => {
		mockUseParams.mockReturnValue({ lang: 'en', id: '9999' });
		mockUsePathname.mockReturnValue('/en/tv/9999/seasons');

		render(
			<Breadcrumbs
				maxItems={2}
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-breadcrumbs')).toMatchSnapshot();
	});

	it('a snapshot with isNavigation set to true', async () => {
		mockUseParams.mockReturnValue({ lang: 'en', id: '9999' });
		mockUsePathname.mockReturnValue('/en/movies/9999');

		render(
			<Breadcrumbs
				isNavigation
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-breadcrumbs')).toMatchSnapshot();
	});

	it('snapshot with lastItemLabel', async () => {
		mockUseParams.mockReturnValue({ lang: 'en', id: '9999' });
		mockUsePathname.mockReturnValue('/en/movies/9999');

		render(
			<Breadcrumbs
				isNavigation
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
				lastItemLabel='Star Wars'
			/>
		);
		expect(await screen.findByTestId<HTMLDivElement>('test-breadcrumbs')).toMatchSnapshot();
	});
});

describe('Breadcrumbs integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('breadcrumbs.elipsisLabel'));
		mockUseParams.mockReturnValue({ lang: 'en', id: '9999' });
		mockUsePathname.mockReturnValue('/en/movies/9999');

		render(
			<Breadcrumbs
				maxItems={2}
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('breadcrumbs.elipsisLabel'));
		mockUseParams.mockReturnValue({ lang: 'ru', id: '9999' });
		mockUsePathname.mockReturnValue('/ru/movies/9999');

		render(
			<Breadcrumbs
				maxItems={2}
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');
		mockUseParams.mockReturnValue({ lang: 'en', id: '9999' });
		mockUsePathname.mockReturnValue('/en/movies/9999');

		render(
			<Breadcrumbs
				maxItems={2}
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-breadcrumbs')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');
		mockUseParams.mockReturnValue({ lang: 'ru', id: '9999' });
		mockUsePathname.mockReturnValue('/ru/movies/9999');

		render(
			<Breadcrumbs
				maxItems={2}
				label='test-breadcrumbs'
				testId='test-breadcrumbs'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-breadcrumbs')).toMatchSnapshot();
	});
});