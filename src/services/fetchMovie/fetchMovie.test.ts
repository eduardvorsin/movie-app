import { movieDetailsData } from '@/msw/mock-data/movie';
import { server } from '@/msw/node';
import { fetchMovie } from './fetchMovie';

describe('fetchMovie tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('if a movie with specific id exists, it should return an object with details about the movie', async () => {
		const result = await fetchMovie('1');
		expect(result).toEqual(movieDetailsData);
	});

	it('if a movie with specific id does not exist, it should return null', async () => {
		const result = await fetchMovie('0');
		expect(result).toBeNull();
	});
})