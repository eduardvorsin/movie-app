'use client';
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Theme = 'light' | 'dark';

const setColorTheme = (value: Theme): void => {
	if (typeof value !== 'string') return;
	if (value !== 'light' && value !== 'dark') {
		throw new Error('The value parameter should only be equal to light or dark');
	}

	localStorage.setItem('theme', value);
}

const getColorTheme = (): Theme => {
	return (localStorage.getItem('theme') as Theme) ?? getSytemColorTheme();
}

const getSytemColorTheme = (): Theme => {
	const isDarkTheme = matchMedia('(prefers-color-scheme:dark)').matches;
	return isDarkTheme ? 'dark' : 'light' as Theme;
}

type ThemeContextValue = {
	value: Theme,
	toggleTheme: () => void,
}

const defaultTheme = getColorTheme()
export const ThemeContext = createContext<ThemeContextValue>({
	value: defaultTheme,
	toggleTheme: () => { }
});

type Props = {
	children: ReactNode,
}
export default function ThemeProvider({
	children
}: Props) {
	const [theme, setTheme] = useState<Theme>(defaultTheme);
	const toggleTheme = (): void => {
		const currentTheme = theme === 'dark' ? 'light' : 'dark'
		setTheme(currentTheme);
		setColorTheme(currentTheme);
	}

	const themeContextValue = useMemo<ThemeContextValue>(() => ({
		value: theme,
		toggleTheme,
	}), [theme]);

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