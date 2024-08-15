import { personDetailsData } from '@/msw/mock-data/person';
import { server } from '@/msw/node';
import { fetchPerson } from './fetchPerson';

describe('fetchPerson tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close())

	it('if a person with specific id exists, it should return an object with details about the person', async () => {
		const result = await fetchPerson('1');
		expect(result).toEqual(personDetailsData);
	});

	it('if a person with specific id does not exist, it should return null', async () => {
		const result = await fetchPerson('0');
		expect(result).toBeNull();
	});
})