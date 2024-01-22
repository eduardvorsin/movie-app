'use client';

// eslint-disable-next-line import/named
import i18next, { i18n } from 'i18next'
import { useEffect, useState } from 'react';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend';
import { Locales, defaultNS, getOptions, locales, runsOnServerSide } from './settings';
import LanguageDetector from 'i18next-browser-languagedetector';

// eslint-disable-next-line import/no-named-as-default-member
i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(
		resourcesToBackend(
			(language: string, namespace: string) => import(`./translations/${language}/${namespace}.json`),
		),
	)
	.init({
		...getOptions(),
		lng: undefined,
		detection: {
			order: ['path', 'cookie', 'navigator', 'htmlTag'],
			caches: ['cookie', 'localStorage'],
		},
		preload: runsOnServerSide ? locales : [],
	});

export const useTranslation = (lng: Locales, ns?: string | string[]) => {
	const translator = useTranslationOrg(ns ?? defaultNS);
	const { i18n } = translator;

	if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
		i18n.changeLanguage(lng);
	} else {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useCustomTranslation(i18n, lng);
	}

	return translator;
};

const useCustomTranslation = (i18n: i18n, lng: Locales) => {
	const [activeLang, setActiveLang] = useState<string | undefined>(i18n.resolvedLanguage);

	useEffect(() => {
		if (activeLang === i18n.resolvedLanguage) return;
		setActiveLang(i18n.resolvedLanguage);
	}, [activeLang, i18n.resolvedLanguage]);

	useEffect(() => {
		if (!lng || i18n.resolvedLanguage === lng) return;
		i18n.changeLanguage(i18n.resolvedLanguage);
	}, [lng, i18n]);
}

