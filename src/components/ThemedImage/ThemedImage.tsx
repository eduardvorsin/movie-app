'use client';
import { Theme, useTheme } from '@/context/ThemeProvider/ThemeProvider';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image, { ImageProps } from 'next/image';
import { useLayoutEffect, useState } from 'react';
import { SkeletonImage } from '../Skeleton/Skeleton';

export type Props = {
	className?: string,
	testId?: string,
	src: string,
	darkSrc?: string,
	fallback?: Record<Theme, string>,
	alt: string,
	placeholder?: PlaceholderValue,
	fill?: boolean,
	width?: number | `${number}`;
	height?: number | `${number}`;
	showSkeleton?: boolean,
} & Omit<ImageProps, 'src' | 'onError' | 'alt' | 'placeholder' | 'fill' | 'width' | 'height' | 'className'>;
export default function ThemedImage({
	className,
	src,
	darkSrc = '',
	testId,
	fallback,
	alt,
	fill,
	width,
	height,
	showSkeleton = false,
	placeholder = 'empty',
	...props
}: Props) {
	const theme = useTheme();
	const [loaded, setLoaded] = useState<boolean>(placeholder === 'empty');
	const [imgSrc, setImgSrc] = useState<string>(() => {
		if (src.length === 0 && fallback) return fallback[theme];
		return src;
	});

	const errorHandler = (): void => {
		if (fallback) setImgSrc(fallback[theme]);
		if (showSkeleton) setLoaded(false);
	}
	const loadHandler = (): void => {
		if (showSkeleton) setLoaded(false);
	}

	useLayoutEffect(() => {
		if (theme === 'dark' && darkSrc.length !== 0) {
			setImgSrc(darkSrc);
		} else if (src.length === 0 && fallback) {
			setImgSrc(fallback[theme]);
		}
		else {
			setImgSrc(src);
		}
	}, [src, darkSrc, fallback, theme]);

	if (showSkeleton) {
		return (
			<div
				className={`relative ${className}`}
				style={{ aspectRatio: `${width}/${height}` }}
				data-testid={testId}
			>
				{loaded && (
					<SkeletonImage
						width={'100%'}
						height={'100%'}
						className='[&]:absolute top-0 left-0 z-100'
					/>
				)}

				<Image
					src={imgSrc}
					alt={alt}
					fill={true}
					onError={errorHandler}
					onLoad={loadHandler}
					{...props}
				/>
			</div>
		);
	} else {
		return (
			<Image
				className={className}
				data-testid={testId}
				src={imgSrc}
				alt={alt}
				width={width}
				height={height}
				fill={fill}
				placeholder={placeholder}
				onError={errorHandler}
				onLoad={loadHandler}
				{...props}
			/>
		);
	}
};