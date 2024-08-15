import { fetchTVSeriesByCollection } from './fetchTVSeriesByCollection';
import { server } from '@/msw/node';
import { tvSeriesData } from '@/msw/mock-data/tvSeries';

describe('fetchTVSeriesByCollection tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('if the page value is less than 1, it should return null.', async () => {
		const result = await fetchTVSeriesByCollection('marvel', 0);
		expect(result).toBeNull();
	});

	it('if the page value is greater than 1, it should return movie data.', async () => {
		const result = await fetchTVSeriesByCollection('marvel', 1);
		expect(result).toEqual(tvSeriesData);
	});
});
