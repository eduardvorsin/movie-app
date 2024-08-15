import { fetchTopRatedTVSeries } from './fetchTopRatedTVSeries';
import { server } from '@/msw/node';
import { tvSeriesData } from '@/msw/mock-data/tvSeries';

describe('fetchTopRatedTVSeries tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('if the page value is less than 1, it should return null', async () => {
		const result = await fetchTopRatedTVSeries(0);
		expect(result).toBeNull();
	});

	it('if the page value is greater than or equal to 1, it should return data with movies', async () => {
		const result = await fetchTopRatedTVSeries(1);
		expect(result).toEqual(tvSeriesData);
	});
});