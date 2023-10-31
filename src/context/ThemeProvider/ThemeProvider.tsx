'use client';
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getColorTheme } from '@/helpers';

export type Theme = 'light' | 'dark';
type ThemeContextValue = {
	value: Theme,
	toggleTheme: () => void,
}

const defaultTheme = getColorTheme()
const ThemeContext = createContext<ThemeContextValue>({
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
		setTheme((prevTheme) => prevTheme === 'dark' ? 'light' : 'dark');
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