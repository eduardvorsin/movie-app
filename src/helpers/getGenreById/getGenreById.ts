import { Genres } from '@/types/shared'
import { genres } from 'src/constants';

export const getGenreById = (id: number): Genres => {
	return genres[id] ?? '';
}