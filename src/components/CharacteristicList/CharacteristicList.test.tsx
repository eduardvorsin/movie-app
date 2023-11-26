import { render, screen } from '@testing-library/react';
import CharacteristicList from './CharacteristicList';

const mockData = [
	{
		name: 'first',
		value: 'banana'
	},
	{
		name: 'second',
		value: 'orange'
	},
	{
		name: 'third',
		value: 'apple',
	},
];

describe('CharacteristicList tests', () => {
	it('is rendered correctly', () => {
		render(
			<CharacteristicList
				data={mockData}
				testId='characteristic-list'
			/>);

		expect(screen.getByRole<HTMLUListElement>('list')).toBeInTheDocument();
	});

	it('if the data array is empty then it renders an empty list', () => {
		render(
			<CharacteristicList
				data={[]}
				testId='characteristic-list'
			/>);

		expect(screen.queryByRole<HTMLLIElement>('listitem')).not.toBeInTheDocument();
	});

	it('is is a basic snapshot', () => {
		render(
			<CharacteristicList
				data={mockData}
				testId='characteristic-list'
			/>);

		expect(screen.getByRole<HTMLUListElement>('list')).toMatchSnapshot();
	});

	it('snapshot with an empty data array', () => {
		render(
			<CharacteristicList
				data={[]}
				testId='characteristic-list'
			/>);

		expect(screen.getByRole<HTMLUListElement>('list')).toMatchSnapshot();
	});
});