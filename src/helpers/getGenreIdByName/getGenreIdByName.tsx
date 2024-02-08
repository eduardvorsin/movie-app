import { Genres } from '@/types/shared'
import { genres } from '@/constants';

export const getGenreIdByName = (name: Genres): string => {
	const genrePair = Object.entries(genres).find(([key, value]) => {
		if (value === name) return key;
	});

	return genrePair?.[0] ?? '';
}