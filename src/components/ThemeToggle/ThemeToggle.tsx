'use client';
import { ThemeContext } from '@/context/ThemeProvider/ThemeProvider';
import { useTranslation } from '@/i18n/client';
import { Locales, fallbackLng } from '@/i18n/settings';
import { useParams } from 'next/navigation';
import { ChangeEventHandler, useContext, useState } from 'react';
import Toggle from '../Toggle/Toggle';
import MoonIcon from '../../assets/icons/moon.svg';
import SunIcon from '../../assets/icons/sun.svg';

type Props = {
	className?: string,
	testId?: string,
}

export default function ThemeToggle({
	className,
	testId,
}: Props) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const theme = useContext(ThemeContext);
	const { t } = useTranslation(lang);
	const [isChecked, setIsChecked] = useState<boolean>(theme.value === 'dark');

	const changeThemeHandler: ChangeEventHandler<HTMLInputElement> = () => {
		setIsChecked(!isChecked);
		theme.toggleTheme();
	};

	return (
		<Toggle
			className={className}
			name='theme-toggle'
			id='theme-toggle'
			appearance='secondary'
			labelHidden
			label={t('themeToggle.label')}
			value={theme.value}
			isChecked={isChecked}
			onChange={changeThemeHandler}
			checkedIcon={<MoonIcon />}
			uncheckedIcon={<SunIcon />}
			testId={testId}
		/>
	);
};