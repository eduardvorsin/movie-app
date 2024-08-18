import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";

const dictionary = {
	aboutTitle: 'About us',
	description: 'Discover the world of cinema with our website!',
	sectionsTitle: 'Sections',
	basedOnTitle: 'Created based on',
	logo: {
		linkText: 'To home page',
		altText: 'MovieWander logo'
	},
	navigation: {
		movies: 'movies',
		persons: 'persons',
		tv: 'series and shows',
		new: 'new releases',
		collections: 'collections'
	},
};

describe('Footer tests', () => {
	it('is rendered correctly', () => {
		render(
			<Footer
				dictionary={dictionary}
				testId='test-footer'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-footer')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(
			<Footer
				dictionary={dictionary}
				testId='test-footer'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-footer')).toMatchSnapshot();
	});
});

describe('Footer integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('footer.aboutTitle'));

		const dictionary = {
			aboutTitle: i18next.t('footer.aboutTitle'),
			description: i18next.t('footer.description'),
			sectionsTitle: i18next.t('footer.sectionsTitle'),
			basedOnTitle: i18next.t('footer.basedOnTitle'),
			logo: {
				altText: i18next.t('logo.altText'),
				linkText: i18next.t('logo.linkText'),
			},
			navigation: {
				movies: i18next.t('navigation.movies'),
				persons: i18next.t('navigation.persons'),
				tv: i18next.t('navigation.tv'),
				new: i18next.t('navigation.new'),
				collections: i18next.t('navigation.collections'),
			},
		};
		render(
			<Footer
				dictionary={dictionary}
				testId='test-footer'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLHeadingElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('footer.aboutTitle'));

		const dictionary = {
			aboutTitle: i18next.t('footer.aboutTitle'),
			description: i18next.t('footer.description'),
			sectionsTitle: i18next.t('footer.sectionsTitle'),
			basedOnTitle: i18next.t('footer.basedOnTitle'),
			logo: {
				altText: i18next.t('logo.altText'),
				linkText: i18next.t('logo.linkText'),
			},
			navigation: {
				movies: i18next.t('navigation.movies'),
				persons: i18next.t('navigation.persons'),
				tv: i18next.t('navigation.tv'),
				new: i18next.t('navigation.new'),
				collections: i18next.t('navigation.collections'),
			},
		};
		render(
			<Footer
				dictionary={dictionary}
				testId='test-footer'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLHeadingElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');

		const dictionary = {
			aboutTitle: i18next.t('footer.aboutTitle'),
			description: i18next.t('footer.description'),
			sectionsTitle: i18next.t('footer.sectionsTitle'),
			basedOnTitle: i18next.t('footer.basedOnTitle'),
			logo: {
				altText: i18next.t('logo.altText'),
				linkText: i18next.t('logo.linkText'),
			},
			navigation: {
				movies: i18next.t('navigation.movies'),
				persons: i18next.t('navigation.persons'),
				tv: i18next.t('navigation.tv'),
				new: i18next.t('navigation.new'),
				collections: i18next.t('navigation.collections'),
			},
		};
		render(
			<Footer
				dictionary={dictionary}
				testId='test-footer'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-footer')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');

		const dictionary = {
			aboutTitle: i18next.t('footer.aboutTitle'),
			description: i18next.t('footer.description'),
			sectionsTitle: i18next.t('footer.sectionsTitle'),
			basedOnTitle: i18next.t('footer.basedOnTitle'),
			logo: {
				altText: i18next.t('logo.altText'),
				linkText: i18next.t('logo.linkText'),
			},
			navigation: {
				movies: i18next.t('navigation.movies'),
				persons: i18next.t('navigation.persons'),
				tv: i18next.t('navigation.tv'),
				new: i18next.t('navigation.new'),
				collections: i18next.t('navigation.collections'),
			},
		};
		render(
			<Footer
				dictionary={dictionary}
				testId='test-footer'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-footer')).toMatchSnapshot();
	});
});