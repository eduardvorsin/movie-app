import { ExternalIDS } from '@/services/types';
import { KeyWithoutId, SocialNetworksItem } from '@/types/shared';

const socialNetworkUrls = {
	imdb_id: 'https://www.imdb.com/',
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

export const createSocialNetworksArray = (data: ExternalIDS): SocialNetworksItem[] => {
	const keys = Object.keys(data) as Array<keyof ExternalIDS>;

	return keys.filter((key) => socialNetworkFields.has(key) && data[key]).map((key) => ({
		name: key.slice(0, -3) as KeyWithoutId<typeof key>,
		url: `${socialNetworkUrls[key]}${data[key]}`,
	}));
};