import { personsData } from '@/msw/mock-data/person';
import { server } from '@/msw/node';
import { fetchPopularPersons } from './fetchPopularPersons';

describe('fetchPopularPersons tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('If the page number is greater than or equal to 1, it should return an array with data about the persons', async () => {
		const result = await fetchPopularPersons(1);
		expect(result).toEqual(personsData);
	});

	it('If the page number is less than 1, it should return null', async () => {
		const result = await fetchPopularPersons(0);
		expect(result).toBeNull();
	});
})