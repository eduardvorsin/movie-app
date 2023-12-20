import { GeneralProps } from "@/types/shared";

const youtubeBasePath = 'https://www.youtube-nocookie.com/embed/';

type Props = {
	width: number,
	height: number,
	videoId: string,
	title: string,
	startTime?: number,
	showControls?: boolean,
	loading?: 'eager' | 'lazy';
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
	...props
}: Props) {
	const src = new URL(videoId, youtubeBasePath);

	if (startTime) {
		src.searchParams.append('start', startTime.toString());
	}

	if (!showControls) {
		src.searchParams.append('controls', '0');
	}

	return (
		<iframe
			className={`max-w-full h-auto aspect-video ${className}`}
			width={width}
			height={height}
			src={src.href}
			title={title}
			loading={loading}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowFullScreen
			data-testid={testId}
			{...props}
		/>
	);
}

