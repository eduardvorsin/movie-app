import { moviesData } from '@/msw/mock-data/movie';
import { fetchMoviesByFilters } from './fetchMoviesByFilters';
import { server } from '@/msw/node';

describe('fetchMoviesByFilters tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('if the page value is less than 1, it should return null', async () => {
		const result = await fetchMoviesByFilters(0, {
			language: 'en',
			sort_by: 'popularity.asc'
		});
		expect(result).toBeNull();
	});

	it('if the page value is greater than or equal to 1, it should return data with movies', async () => {
		const result = await fetchMoviesByFilters(1, {
			language: 'en',
			sort_by: 'popularity.asc'
		});
		expect(result).toEqual(moviesData);
	});
});