import { ExternalIDS, KeyWithoutId } from '@/types/shared';
import { Theme } from '@/context/ThemeProvider/ThemeProvider';

export const createCharacteristicsArray = (data: { [key: string]: unknown },
): Record<'name' | 'value', string>[] => {

	const characteristics = [] as Record<'name' | 'value', string>[];

	Object.keys(data).forEach((key) => {
		if (data[key] === null || typeof data[key] === 'object') {
			return;
		}

		characteristics.push({
			name: key,
			value: String(data[key]),
		});
	});

	return characteristics;
}

export const createSocialNetworksArray = (data: ExternalIDS): SocialNetworkItem[] => {
	const socialNetworkUrls = {
		imdb_id: 'https://www.imdb.com/name/',
		facebook_id: 'https://www.facebook.com/',
		instagram_id: 'https://www.instagram.com/',
		tiktok_id: 'https://www.tiktok.com/@',
		twitter_id: 'https://twitter.com/',
		youtube_id: 'https://www.youtube.com/@',
	} as const;

	const socialNetworkFields = new Set<keyof ExternalIDS>([
		'imdb_id',
		'facebook_id',
		'instagram_id',
		'tiktok_id',
		'twitter_id',
		'youtube_id',
	]);

	const keys = Object.keys(data) as Array<keyof ExternalIDS>;

	return keys.filter((key) => socialNetworkFields.has(key) && data[key]).map((key) => ({
		name: key.slice(0, -3) as KeyWithoutId<typeof key>,
		url: `${socialNetworkUrls[key]}${data[key]}`,
	}));
};

export const setColorTheme = (value: Theme): void => {
	if (typeof value !== 'string') return;

	if (value !== 'light' && value !== 'dark') {
		throw new Error('The value parameter should only be equal to light or dark');
	}

	localStorage.setItem('theme', value);
}

export const getColorTheme = (): Theme => {
	return (localStorage.getItem('theme') as Theme) ?? getSytemColorTheme();
}

export const getSytemColorTheme = (): Theme => {
	const isDarkTheme = matchMedia('(prefers-color-scheme:dark)').matches;
	return isDarkTheme ? 'dark' : 'light' as Theme;
}