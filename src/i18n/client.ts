import { useEffect, useState } from 'react';
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions, languages, runsOnServerSide } from './settings';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

i18next
	.use(initReactI18next)
	.use(I18nextBrowserLanguageDetector)
	.use(resourcesToBackend((language: string, namespace: string) => import(`./translations/${language}/${namespace}.json`)))
	.init({
		...getOptions(),
		lng: undefined,
		detection: {
			order: ['path', 'htmlTag', 'cookie', 'navigator'],
		},
		preload: runsOnServerSide ? languages : [],
	});

export const useTranslation = (lng?: string, ns?: string | string[]) => {
	const ret = useTranslationOrg(ns);
	const { i18n } = ret;

	if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
		i18n.changeLanguage(lng)
	} else {
		const [activeLang, setActiveLang] = useState<string | undefined>(i18n.resolvedLanguage);

		useEffect(() => {
			if (activeLang === i18n.resolvedLanguage) return;
			setActiveLang(i18n.resolvedLanguage);
		}, [lng, i18n]);

		useEffect(() => {
			if (!lng || activeLang === i18n.resolvedLanguage) return;
			i18n.changeLanguage(i18n.resolvedLanguage);
		}, [lng, i18n]);
	}

	return ret;
};

