import { moviesData } from '@/msw/mock-data/movie';
import { fetchNowPlayingMovies } from './fetchNowPlayingMovies';
import { server } from '@/msw/node';
import { http, HttpResponse } from 'msw';

describe('fetchNowPlayingMovies tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('if the request was successful, it should return movies data.', async () => {
		const result = await fetchNowPlayingMovies();
		expect(result).toEqual(moviesData);
	});

	it('if an error occurred on the server, it should return null.', async () => {
		server.use(http.get(`${process.env.API_BASE_URL}/${process.env.API_VERSION}/discover/movie`, () => {
			return HttpResponse.json({
				"success": false,
				"status_code": 9,
				"status_message": "This service is temporarily offline, try again later"
			}, { status: 503, statusText: 'The service is temporarily offline' });
		}));

		const result = await fetchNowPlayingMovies();
		expect(result).toBeNull();
	});
});
