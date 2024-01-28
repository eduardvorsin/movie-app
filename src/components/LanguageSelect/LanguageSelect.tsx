'use client';

import { useTranslation } from '@/i18n/client';
import { Locales, fallbackLng } from '@/i18n/settings';
import { GeneralProps } from '@/types/shared';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Select from '../Select/Select';
import { useId, useState } from 'react';

type LanguageOption = {
	label: 'RU' | 'EN',
	value: 'ru' | 'en',
}

const languageOptions: LanguageOption[] = [
	{
		label: 'RU',
		value: 'ru',
	},
	{
		label: 'EN',
		value: 'en',
	},
]

type Props = GeneralProps;

export default function LanguageSelect({
	className,
	testId,
}: Props) {
	const id = useId();
	const currentLang = useParams()?.lang as Locales ?? fallbackLng;
	const { t, i18n } = useTranslation(currentLang);
	const [lang, setLang] = useState<Locales>(currentLang);
	const pathname = usePathname();
	const router = useRouter();

	const changeHandler = () => {
		const otherLang = lang === 'ru' ? 'en' : 'ru';
		setLang(otherLang);
		i18n.changeLanguage(otherLang);
		router.replace(pathname.replace(currentLang, otherLang));
	}

	return (
		<Select
			className={className}
			testId={testId}
			id={id}
			labelHidden
			label={t('languageSelect.label')}
			name='language select'
			options={languageOptions}
			value={lang}
			closeMenuOnSelect
			closeMenuOnScroll
			openMenuOnFocus
			onChange={changeHandler}
			minMenuHeight={69}
			maxMenuHeight={69}
		/>
	);
}