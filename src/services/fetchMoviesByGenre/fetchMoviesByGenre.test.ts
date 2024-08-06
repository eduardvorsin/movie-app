import { moviesData } from '@/msw/mock-data/movie';
import { fetchMoviesByGenre } from './fetchMoviesByGenre';
import { server } from '@/msw/node';

describe('fetchMoviesByGenre tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('if the page value is less than 1, it should return null', async () => {
		const result = await fetchMoviesByGenre('anime', 0);
		expect(result).toBeNull();
	});

	it('if the page value is greater than or equal to 1, it should return data with movies', async () => {
		const result = await fetchMoviesByGenre('anime', 1);
		expect(result).toEqual(moviesData);
	});
});