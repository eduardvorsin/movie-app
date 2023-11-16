import { Locales, fallbackLng } from '@/i18n/settings';

export const formatCurrency = (value: number, lang: Locales): string => {
	const currencyFormatter = new Intl.NumberFormat([lang, fallbackLng], {
		currency: 'USD',
		style: 'currency',
		currencyDisplay: 'symbol',
	});

	return currencyFormatter.format(value);
};