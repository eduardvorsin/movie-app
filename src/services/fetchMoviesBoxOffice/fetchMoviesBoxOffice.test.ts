import { movieDetailsData } from '@/msw/mock-data/movie';
import { fetchMoviesBoxOffice } from './fetchMoviesBoxOffice';
import { server } from '@/msw/node';

describe('fetchMoviesBoxOffice tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('if the page value is less than 1, it should return an empty array.', async () => {
		const result = await fetchMoviesBoxOffice(0);
		expect(result).toEqual([]);
	});

	it('if the page value is greater than 1, it should return an array of movies', async () => {
		const result = await fetchMoviesBoxOffice(1);
		expect(result).toEqual([movieDetailsData]);
	});
});
