import { Genres } from '@/types/shared'
import { genres } from 'src/constants';

export const getGenreIdByName = (name: Genres): string | null => {
	const genrePair = Object.entries(genres).find(([key, value]) => {
		if (value === name) return key;
	});

	return genrePair?.[0] ?? null;
}