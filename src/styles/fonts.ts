import { Inter, Roboto } from 'next/font/google';

export const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-inter',
});

export const roboto = Roboto({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '700'],
	display: 'swap',
	variable: '--font-roboto',
});