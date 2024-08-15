import { server } from '@/msw/node';
import { fetchTVSeries } from './fetchTVSeries';
import { tvSeriesDetailsData } from '@/msw/mock-data/tvSeries';

describe('fetchTVSeries tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('if a tv series with specific id exists, it should return an object with details about the tv series', async () => {
		const result = await fetchTVSeries('1', {
			lang: 'en',
			includeAdditionalData: true
		});
		expect(result).toEqual(tvSeriesDetailsData);
	});

	it('if a tv series with specific id does not exist, it should return null', async () => {
		const result = await fetchTVSeries('0', {
			lang: 'en',
			includeAdditionalData: true
		});
		expect(result).toBeNull();
	});
})