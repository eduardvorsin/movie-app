import { render, screen } from "@testing-library/react";
import Logo, { Props } from "./Logo";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";

const sizes: NonNullable<Props['size']>[] = ['small', 'medium', 'large'];

describe('Logo tests', () => {
	it('is rendered correctly', () => {
		const dictionary = {
			altText: 'MovieWander logo',
			linkText: 'To home page',
		};
		render(
			<Logo
				size='medium'
				dictionary={dictionary}
				testId='test-logo'
			/>
		);

		expect(screen.getByTestId<HTMLAnchorElement>('test-logo')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		const dictionary = {
			altText: 'MovieWander logo',
			linkText: 'To home page',
		};
		render(
			<Logo
				size='medium'
				dictionary={dictionary}
				testId='test-logo'
			/>
		);

		expect(screen.getByTestId<HTMLAnchorElement>('test-logo')).toMatchSnapshot();
	});

	it.each(sizes)('is a snapshot with a "%s" size', (size) => {
		const dictionary = {
			altText: 'MovieWander logo',
			linkText: 'To home page',
		};
		render(
			<Logo
				size={size}
				dictionary={dictionary}
				testId='test-logo'
			/>
		);

		expect(screen.getByTestId<HTMLAnchorElement>('test-logo')).toMatchSnapshot();
	});
});

describe('Banner integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('logo.linkText'));

		const dictionary = {
			altText: i18next.t('logo.altText'),
			linkText: i18next.t('logo.linkText'),
		};
		render(
			<Logo
				size='medium'
				dictionary={dictionary}
				testId='test-logo'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('logo.linkText'));

		const dictionary = {
			altText: i18next.t('logo.altText'),
			linkText: i18next.t('logo.linkText'),
		};
		render(
			<Logo
				size='medium'
				dictionary={dictionary}
				testId='test-logo'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');

		const dictionary = {
			altText: i18next.t('logo.altText'),
			linkText: i18next.t('logo.linkText'),
		};
		render(
			<Logo
				size='medium'
				dictionary={dictionary}
				testId='test-logo'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-logo')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');

		const dictionary = {
			altText: i18next.t('logo.altText'),
			linkText: i18next.t('logo.linkText'),
		};
		render(
			<Logo
				size='medium'
				dictionary={dictionary}
				testId='test-logo'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-logo')).toMatchSnapshot();
	});
});