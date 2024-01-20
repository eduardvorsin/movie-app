'use client';
import { runsOnServerSide } from '@/i18n/settings';
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Theme = 'light' | 'dark';
const defaultTheme = 'dark';

const setColorTheme = (value: Theme): void => {
	if (typeof value !== 'string') return;
	if (value !== 'light' && value !== 'dark') {
		throw new Error('The value parameter should only be equal to light or dark');
	}

	localStorage.setItem('theme', value);
};

const getColorTheme = (): Theme => {
	let userTheme;
	if (!runsOnServerSide) {
		userTheme = localStorage.getItem('theme') as Theme;
	}
	return userTheme ?? getSytemColorTheme();
};

const getSytemColorTheme = (): Theme => {
	if (!runsOnServerSide) {
		const isDarkTheme = matchMedia('(prefers-color-scheme:dark)').matches;
		return isDarkTheme ? 'dark' : 'light' as Theme;
	}

	return defaultTheme;
};

const currentTheme = getColorTheme();

type ThemeContextValue = {
	value: Theme,
	toggleTheme: () => void,
}
export const ThemeContext = createContext<ThemeContextValue>({
	value: currentTheme,
	toggleTheme: () => { }
});

type Props = {
	children: ReactNode,
}
export default function ThemeProvider({
	children
}: Props) {
	const [theme, setTheme] = useState<Theme>(currentTheme);
	const toggleTheme = useCallback((): void => {
		const nextTheme = theme === 'dark' ? 'light' : 'dark'
		setTheme(nextTheme);
		setColorTheme(nextTheme);
	}, [theme]);

	const themeContextValue = useMemo<ThemeContextValue>(() => ({
		value: theme,
		toggleTheme,
	}), [theme, toggleTheme]);

	useEffect(() => {
		document.documentElement.classList.add(theme);
		return () => {
			document.documentElement.classList.remove(theme);
		}
	}, [theme]);

	return (
		<ThemeContext.Provider value={themeContextValue}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = (): Theme => useContext(ThemeContext).value;