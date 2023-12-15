const imgURL = 'https://image.tmdb.org/t/p';

export const imgPath = {
	poster: `${imgURL}/w300`,
	backdrop: `${imgURL}/original`,
	profile: `${imgURL}/w342`,
	profileCard: `${imgURL}/w154`,
	logo: `${imgURL}/w185`,
	avatar: `${imgURL}/w45_and_h45_face`,
}
export const navigationRoutes = {
	movies: '/movies/',
	persons: '/persons/',
	collections: '/collections',
	series: '/tv',
	trailers: '/trailers',
	new: '/new',
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
