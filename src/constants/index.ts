import { Genres, MovieGenres, TVSeriesGenres } from "@/types/shared";

const imgURL = 'https://image.tmdb.org/t/p';

export const imgPath = {
	poster: `${imgURL}/w300`,
	backdrop: `${imgURL}/original`,
	profile: `${imgURL}/w342`,
	profileCard: `${imgURL}/w185`,
	logo: `${imgURL}/w185`,
	avatar: `${imgURL}/w45_and_h45_face`,
	movieCard: `${imgURL}/w300`,
}

export const navigationRoutes = {
	movies: '/movies/',
	persons: '/persons/',
	tv: '/tv',
	new: '/new',
	collections: '/collections',
};
export type NavigationRoutes = typeof navigationRoutes;

export const authenticationRoutes = {
	login: '/login',
	register: '/register',
	account: '/account',
} as const;
export type AuthenticationRoutes = typeof authenticationRoutes;

export const routes = {
	home: '/',
	...navigationRoutes,
	...authenticationRoutes,
} as const;
export type Routes = typeof routes;

export const movieGenres: Record<string, MovieGenres> = {
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
};
export const movieGenresList = Object.values(movieGenres);

export const tvGenres: Record<string, TVSeriesGenres> = {
	16: 'animation',
	35: 'comedy',
	80: 'crime',
	99: 'documentary',
	18: 'drama',
	10751: 'family',
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
export const tvGenresList = Object.values(tvGenres);

export const genres: Record<string, Genres> = {
	...movieGenres,
	...tvGenres,
};

export const collections = ['marvel', 'dc', 'biography', 'books', 'avantgarde', 'cyberpunk', 'dystopia', 'espionage', 'fairytale', 'futuristic', 'idealism', 'investigation', 'mockumentary', 'neonoir', 'neorealism', 'postapocalypse', 'remakes', 'roadmovie', 'timetravel', 'vr', 'zombie'] as const;
export type Collections = typeof collections[number];

export const countryCodesBySubgenre = {
	turkish: 'TR',
	russian: 'RU',
	foreign: 'FR|IT|GB|DE|ES|NL|EL|CZ|AT|SE|US',
	korean: 'KR',
} as const;

export const authorsDepartments = ['Production', 'Writing', 'Directing'];
export const authorsProfessions = ['Director', 'Producer', 'Screenplay', 'Novel', 'Characters', 'Story', 'Writer'];