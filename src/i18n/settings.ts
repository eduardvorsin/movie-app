// eslint-disable-next-line import/named
import { InitOptions } from 'i18next';

export const fallbackLng = 'en';
export const locales = [fallbackLng, 'ru'] as const;
export const defaultNS = 'common';
export type Locales = typeof locales[number];

export const runsOnServerSide = typeof window === 'undefined';

export const getOptions = (lng: string = fallbackLng, ns: string | string[] = defaultNS):InitOptions => ({
	debug: process.env.NODE_ENV === 'development',
	supportedLngs: locales,
	preload: runsOnServerSide ? locales : [],
	fallbackLng,
	lng,
	fallbackNS: defaultNS,
	defaultNS,
	ns,
});