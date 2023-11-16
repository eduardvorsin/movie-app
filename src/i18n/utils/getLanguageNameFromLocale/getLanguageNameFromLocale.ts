import { Locales, fallbackLng } from '@/i18n/settings';

export const getLanguageNameFromLocale = (locale: string, lang: Locales): string | undefined => {
	const languageName = new Intl.DisplayNames([lang, fallbackLng], {
		type: 'language',
	});

	return languageName.of(locale);
};