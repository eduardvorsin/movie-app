import { render, screen } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";

const dictionary = { label: 'Light and dark theme switch' };

describe('ThemeToggle tests', () => {
	it('is rendered correctly', async () => {

		render(
			<ThemeToggle
				dictionary={dictionary}
				testId='test-theme-toggle'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-theme-toggle')).toBeInTheDocument();
	});

	it('is a basic snapshot', async () => {
		render(
			<ThemeToggle
				dictionary={dictionary}
				testId='test-theme-toggle'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-theme-toggle')).toMatchSnapshot();
	});
});

describe('ThemeToggle integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('themeToggle.label'));
		const dictionary = { label: i18next.t('themeToggle.label') };
		render(
			<ThemeToggle
				dictionary={dictionary}
				testId='test-theme-toggle'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByLabelText<HTMLLabelElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('themeToggle.label'));
		const dictionary = { label: i18next.t('themeToggle.label') };
		render(
			<ThemeToggle
				dictionary={dictionary}
				testId='test-theme-toggle'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByLabelText<HTMLLabelElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');
		const dictionary = { label: i18next.t('themeToggle.label') };
		render(
			<ThemeToggle
				dictionary={dictionary}
				testId='test-theme-toggle'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-theme-toggle')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');
		const dictionary = { label: i18next.t('themeToggle.label') };
		render(
			<ThemeToggle
				dictionary={dictionary}
				testId='test-theme-toggle'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-theme-toggle')).toMatchSnapshot();
	});
});