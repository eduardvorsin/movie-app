'use client';

import { useScreenWidth } from '@/hooks/useScreenWidth/useScreenWidth';
import { GeneralProps } from '@/types/shared';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ThemedImage from '../ThemedImage/ThemedImage';
import { Locales, fallbackLng, runsOnServerSide } from '@/i18n/settings';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/i18n/client';

const youtubeVideoBasePath = 'https://www.youtube-nocookie.com/embed/';
const youtubePosterBasePath = 'https://i.ytimg.com/vi_webp/';

type Props = {
	width: number,
	height: number,
	videoId: string,
	title: string,
	startTime?: number,
	showControls?: boolean,
	loading?: 'eager' | 'lazy';
	posterQuality?: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault',
	muted?: boolean,
	posterAlt: string,
	posterSizes?: string,
	testId?: string,
} & GeneralProps;

export default function YouTubeVideo({
	className,
	width,
	height,
	videoId,
	title,
	startTime,
	showControls = true,
	testId,
	loading,
	posterQuality,
	muted,
	posterAlt,
	posterSizes,
	...props
}: Props) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);

	const [isIframeloading, setIsIframeLoading] = useState<boolean>(false);
	const screenWidth = useScreenWidth();
	const [posterResolution, setPosterResolution] = useState<Props['posterQuality']>(posterQuality ?? 'maxresdefault');

	const addIframe = () => setIsIframeLoading(true);

	const iframeSrc = new URL(videoId, youtubeVideoBasePath);
	iframeSrc.searchParams.append('rel', '0');
	iframeSrc.searchParams.append('autoplay', '1');
	iframeSrc.searchParams.append('muted', muted ? '1' : '0');

	if (startTime) {
		iframeSrc.searchParams.append('start', startTime.toString());
	}

	if (!showControls) {
		iframeSrc.searchParams.append('controls', '0');
	}

	const posterSrc = new URL(`${videoId}/${posterResolution}.webp`, youtubePosterBasePath);

	useEffect(() => {
		if (!runsOnServerSide) {
			setPosterResolution(posterQuality ?? screenWidth <= 768 ? 'hqdefault' : 'maxresdefault');
		}
	}, [posterQuality, screenWidth]);

	return (
		<div
			className={`relative dark:bg-dark-neutral-250 bg-neutral-300 transition-colors duration-150 ${className}`}
			data-testid={testId}
			{...props}
		>
			{!isIframeloading && (
				<>
					<ThemedImage
						className='w-full object-cover'
						width={width}
						height={height}
						showSkeleton
						src={posterSrc.href}
						fallback={{
							light: '/assets/images/movie-card-placeholder-l-h.svg',
							dark: '/assets/images/movie-card-placeholder-d-h.svg'
						}}
						alt={posterAlt}
						loading={loading}
						sizes={posterSizes}
						style={{
							aspectRatio: `${width}/${height}`
						}}
					/>

					<button
						className='w-full h-full flex items-center justify-center absolute z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
						onClick={addIframe}
						aria-label={t('youTubeVideo.button')}
						title={t('youTubeVideo.button')}
					>
						<Image
							className='w-[4rem] h-[4rem]'
							src='/assets/icons/youtube_default.svg'
							alt=''
							width={64}
							height={64}
						/>
					</button>
				</>
			)}

			{isIframeloading && (
				<iframe
					className='w-full max-w-full h-auto'
					width={width}
					height={height}
					src={iframeSrc.href}
					title={title}
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowFullScreen
					data-testid={testId}
					style={{
						aspectRatio: `${width}/${height}`
					}}
				/>
			)}
		</div>
	);
}


