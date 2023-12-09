import { Genres } from '@/types/shared'

const genres: Record<string, Genres> = {
	28: 'action',
	12: 'adventure',
	16: 'animation',
	35: 'comedy',
	80: 'crime',
	99: 'documentary',
	18: 'drama',
	10751: 'family',
	14: 'fantasy',
	36: 'history',
	27: 'horror',
	10402: 'music',
	9648: 'mystery',
	10749: 'romance',
	878: 'science fiction',
	10770: 'tv movie',
	53: 'thriller',
	10752: 'war',
	37: 'western',
	10759: 'action & adventure',
	10762: 'kids',
	10763: 'news',
	10764: 'reality',
	10765: 'sci-fi & fantasy',
	10766: 'soap',
	10767: 'talk',
	10768: 'war & politics',
};

export const getGenreById = (id: number): Genres | null => {
	return genres[id] ?? null;
}