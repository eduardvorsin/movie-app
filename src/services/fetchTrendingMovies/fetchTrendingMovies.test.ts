import { moviesData } from '@/msw/mock-data/movie';
import { fetchTrendingMovies } from './fetchTrendingMovies';
import { server } from '@/msw/node';
import { http, HttpResponse } from 'msw';

describe('fetchTrendingMovies tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('if the request was successful, it should return movies data.', async () => {
		const result = await fetchTrendingMovies();
		expect(result).toEqual(moviesData);
	});

	it('if an error occurred on the server, it should return null.', async () => {
		server.use(http.get('https://api.themoviedb.org/3/trending/movie/week', () => {
			return HttpResponse.json({
				"success": false,
				"status_code": 9,
				"status_message": "This service is temporarily offline, try again later"
			}, { status: 503, statusText: 'The service is temporarily offline' });
		}));

		const result = await fetchTrendingMovies();
		expect(result).toBeNull();
	});
});
