'use client';
import { Theme, useTheme } from '@/context/ThemeProvider/ThemeProvider';
import Image, { ImageProps } from 'next/image';

type Props = {
	testId?: string,
	src: Record<Theme, string>;
	fallback?: Record<Theme, string>;
} & Omit<ImageProps, 'src'>;
export default function ThemedImage({
	src,
	testId,
	fallback,
	...props
}: Props) {
	const theme = useTheme();

	let currentSrc: string;
	if (src[theme].length) {
		currentSrc = src[theme];
	} else {
		const inverseTheme = theme === 'light' ? 'dark' : 'light';
		currentSrc = fallback?.[theme] ?? src[inverseTheme];
	}

	return (
		// eslint-disable-next-line jsx-a11y/alt-text
		<Image
			data-testid={testId}
			src={currentSrc}
			{...props}
		/>
	);
};