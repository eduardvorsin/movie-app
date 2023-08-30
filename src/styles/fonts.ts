import { Inter } from 'next/font/google';

export const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-inter',
	fallback: ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
});