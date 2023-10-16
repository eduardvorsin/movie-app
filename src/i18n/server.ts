import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { Locales, defaultNS, getOptions } from './settings';

const initI18next = async (lng: Locales, ns: string | string[]) => {
	const i18nextInstance = createInstance();
	await i18nextInstance
		.use(initReactI18next)
		.use(
			resourcesToBackend(
				(language: string, namespace: string) => import(`./translations/${language}/${namespace}.json`),
			),
		)
		.init(getOptions(lng, ns));

	return i18nextInstance;
}

export const fetchTranslation = async (lng: Locales, ns?: string | string[]) => {
	const i18nextInstance = await initI18next(lng, ns ?? defaultNS);
	return {
		t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
		i18n: i18nextInstance,
	}
};

