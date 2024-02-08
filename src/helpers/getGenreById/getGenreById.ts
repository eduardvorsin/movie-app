import { Genres } from '@/types/shared'
import { genres } from '@/constants';

export const getGenreById = (id: number): Genres => {
	return genres[id] ?? '';
}