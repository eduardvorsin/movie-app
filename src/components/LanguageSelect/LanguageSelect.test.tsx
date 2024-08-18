import { render, screen } from "@testing-library/react";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";
import LanguageSelect from "./LanguageSelect";

jest.mock('next/navigation', () => ({
	useParams: () => jest.fn(),
	useRouter: () => jest.fn(),
	usePathname: () => jest.fn(),
}));

const dictionary = { label: 'Language selection' };

describe('LanguageSelect tests', () => {
	it('is rendered correctly', async () => {
		render(
			<LanguageSelect
				dictionary={dictionary}
				testId='test-language-select'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-language-select')).toBeInTheDocument();
	});

	it('is a basic snapshot', async () => {
		render(
			<LanguageSelect
				dictionary={dictionary}
				testId='test-language-select'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-language-select')).toMatchSnapshot();
	});
});

describe('LanguageSelect integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('languageSelect.label'));
		const dictionary = { label: i18next.t('languageSelect.label') };
		render(
			<LanguageSelect
				dictionary={dictionary}
				testId='test-language-select'
			/>,
			{ wrapper: I18nextWrapper }
		);
		expect(await screen.findByText<HTMLLabelElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('languageSelect.label'));
		const dictionary = { label: i18next.t('languageSelect.label') };
		render(
			<LanguageSelect
				dictionary={dictionary}
				testId='test-language-select'
			/>,
			{ wrapper: I18nextWrapper }
		);
		expect(await screen.findByText<HTMLLabelElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');
		const dictionary = { label: i18next.t('languageSelect.label') };
		render(
			<LanguageSelect
				dictionary={dictionary}
				testId='test-language-select'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-language-select')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');
		const dictionary = { label: i18next.t('languageSelect.label') };
		render(
			<LanguageSelect
				dictionary={dictionary}
				testId='test-language-select'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-language-select')).toMatchSnapshot();
	});
});