export const fallbackLng = 'en';
export const languages = [fallbackLng, 'ru'] as const;
export const defaultNS = 'common';
export type Locales = typeof languages[number];

export const runsOnServerSide = typeof window === 'undefined';

export const getOptions = (lng: string = fallbackLng, ns: string | string[] = defaultNS) => ({
	debug: process.env.NODE_ENV === 'development',
	supportedLngs: languages,
	preload: runsOnServerSide ? languages : [],
	fallbackLng,
	lng,
	fallbackNS: defaultNS,
	defaultNS,
	ns,
});