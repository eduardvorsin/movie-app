import { render, screen } from "@testing-library/react";
import UserSettingsButton from "./UserSettingsButton";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";

const dictionary = {
	button: 'Open settings',
	themeTitle: 'The theme of the site',
	languageTitle: 'Language Settings',
	languageSelect: { label: 'Language selection' },
	themeToggle: { label: 'Light and dark theme switch' },
};

describe('UserSettingsButton tests', () => {
	it('is rendered correctly', () => {
		render(
			<UserSettingsButton
				dictionary={dictionary}
				testId='test-user-settings-button'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-user-settings-button')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(
			<UserSettingsButton
				dictionary={dictionary}
				testId='test-user-settings-button'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-user-settings-button')).toMatchSnapshot();
	});
});

describe('UserSettingsButton integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('userSettingsButton.button'));

		const dictionary = {
			button: i18next.t('userSettingsButton.button'),
			themeTitle: i18next.t('userSettingsButton.themeTitle'),
			languageTitle: i18next.t('userSettingsButton.languageTitle'),
			languageSelect: { label: i18next.t('languageSelect.label') },
			themeToggle: { label: i18next.t('themeToggle.label') },
		};
		render(
			<UserSettingsButton
				dictionary={dictionary}
				testId='test-user-settings-button'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLButtonElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('userSettingsButton.button'));

		const dictionary = {
			button: i18next.t('userSettingsButton.button'),
			themeTitle: i18next.t('userSettingsButton.themeTitle'),
			languageTitle: i18next.t('userSettingsButton.languageTitle'),
			languageSelect: { label: i18next.t('languageSelect.label') },
			themeToggle: { label: i18next.t('themeToggle.label') },
		};
		render(
			<UserSettingsButton
				dictionary={dictionary}
				testId='test-user-settings-button'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByText<HTMLButtonElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');

		const dictionary = {
			button: i18next.t('userSettingsButton.button'),
			themeTitle: i18next.t('userSettingsButton.themeTitle'),
			languageTitle: i18next.t('userSettingsButton.languageTitle'),
			languageSelect: { label: i18next.t('languageSelect.label') },
			themeToggle: { label: i18next.t('themeToggle.label') },
		};
		render(
			<UserSettingsButton
				dictionary={dictionary}
				testId='test-user-settings-button'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-user-settings-button')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');

		const dictionary = {
			button: i18next.t('userSettingsButton.button'),
			themeTitle: i18next.t('userSettingsButton.themeTitle'),
			languageTitle: i18next.t('userSettingsButton.languageTitle'),
			languageSelect: { label: i18next.t('languageSelect.label') },
			themeToggle: { label: i18next.t('themeToggle.label') },
		};
		render(
			<UserSettingsButton
				dictionary={dictionary}
				testId='test-user-settings-button'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(screen.getByTestId<HTMLDivElement>('test-user-settings-button')).toMatchSnapshot();
	});
});