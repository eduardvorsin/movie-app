import { Locales, fallbackLng } from '@/i18n/settings';

export const getLocalizedDate = (date: string, lang: Locales, options?: Intl.DateTimeFormatOptions): string => {
	if (!date.length) return '-';
	if (Number.isNaN(Date.parse(date))) {
		throw new Error('Строка с датой должна быть в формате "YYYY-MM-DDTHH:mm:ss.sssZ"');
	}

	const timeStamp = Date.parse(date);
	return new Date(timeStamp).toLocaleDateString([lang, fallbackLng], options);
};

