import { locales as langs } from '@/i18n/settings';
export const getLocalesFromString = (localesString: string): string[] => {
	const regexp = /\*|[a-z]{1,8}(-[a-z0-9]{1,8})*/g;
	const supportedLngs = new Set<string>(langs);
	const locales = localesString.match(regexp)?.filter((locale) => locale !== 'q' && supportedLngs.has(locale)) ?? [];

	return locales;
};