import { tvSeriesSeasonsData } from '@/msw/mock-data/tvSeries';
import { fetchSeasonsForTVSeries } from './fetchSeasonsForTVSeries';
import { server } from '@/msw/node';

describe('fetchSeasonsForTVSeries tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('if the season number is less than 0, it should return null', async () => {
		const result = await fetchSeasonsForTVSeries({
			id: '1',
			seasonNumber: -1,
			lang: 'en'
		});

		expect(result).toBeNull();
	});

	it('if a series with this id does not exist, it should return null', async () => {
		const result = await fetchSeasonsForTVSeries({
			id: '0',
			seasonNumber: 1,
			lang: 'en'
		});

		expect(result).toBeNull();
	});

	it('if a series with passed id exists, it should return data about the seasons', async () => {
		const result = await fetchSeasonsForTVSeries({
			id: '1',
			seasonNumber: 1,
			lang: 'en'
		});

		expect(result).toEqual(tvSeriesSeasonsData);
	});
});