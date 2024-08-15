import { fetchTVSeriesByFilters } from './fetchTVSeriesByFilters';
import { server } from '@/msw/node';
import { tvSeriesData } from '@/msw/mock-data/tvSeries';

describe('fetchTVSeriesByFilters tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('if the page value is less than 1, it should return null', async () => {
		const result = await fetchTVSeriesByFilters(0, {
			language: 'en',
			sort_by: 'popularity.asc'
		});
		expect(result).toBeNull();
	});

	it('if the page value is greater than or equal to 1, it should return data with movies', async () => {
		const result = await fetchTVSeriesByFilters(1, {
			language: 'en',
			sort_by: 'popularity.asc'
		});
		expect(result).toEqual(tvSeriesData);
	});
});