import { moviesData } from '@/msw/mock-data/movie';
import { fetchMoviesByCollection } from './fetchMoviesByCollection';
import { server } from '@/msw/node';

describe('fetchMoviesByCollection tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('if the page value is less than 1, it should return null.', async () => {
		const result = await fetchMoviesByCollection('marvel', 0);
		expect(result).toBeNull();
	});

	it('if the page value is greater than 1, it should return movie data.', async () => {
		const result = await fetchMoviesByCollection('marvel', 1);
		expect(result).toEqual(moviesData);
	});
});
