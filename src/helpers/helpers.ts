import { fallbackLng, locales as langs } from '@/i18n/settings';
import { KeyWithoutId } from './../../types/shared';
import { ExternalIDS } from "@/pages/persons/[id]/page";
import { Theme } from '@/context/ThemeProvider/ThemeProvider';

export type CharacteristicItem = {
	name: string,
	value: string,
};

type SocialNetworkItem = {
	name: KeyWithoutId<keyof ExternalIDS>,
	url: string,
};

export const createPersonCharacteristicsArray = (data:
	{ [key: string]: string | string[] | number | null | boolean | object }
): CharacteristicItem[] => {
	type PersonData = {
		known_for_department: string,
		place_of_birth: string,
		gender: number,
		birthday: string,
		deathday: string | null,
		popularity: number,
	};

	const characteristicFields = new Set<keyof PersonData>([
		'known_for_department',
		'place_of_birth',
		'gender',
		'birthday',
		'deathday',
		'popularity',
	]);

	const characteristics = [] as CharacteristicItem[];

	(Object.keys(data) as Array<keyof PersonData>).forEach((key) => {
		if (!characteristicFields.has(key) || data[key] === null || typeof data[key] === 'object') {
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