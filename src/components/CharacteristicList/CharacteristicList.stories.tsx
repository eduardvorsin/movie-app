import type { Meta, StoryObj } from '@storybook/react';
import CharacteristicList from './CharacteristicList';

const meta: Meta<typeof CharacteristicList> = {
	title: 'components/CharacteristicList',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the CharacteristicList'
		},
		testId: {
			description: 'Id for testing the component',
		},
		data: {
			description: 'the data array to be displayed as a list',
		},
	},
	component: CharacteristicList,
	parameters: {
		docs: {
			description: {
				component: 'The component that renders the list in the following format: name - value',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof CharacteristicList>;


const data: Record<'en' | 'ru', Record<'name' | 'value', string>[]> = {
	en: [
		{ name: 'budget', value: '1.000.000$' },
		{ name: 'country', value: 'USA' },
		{ name: 'release date', value: '15.12.2023' },
		{ name: 'runtime', value: '2:13' },
		{ name: 'original language', value: 'english' },
		{ name: 'status', value: 'releases' },
	],
	ru: [
		{ name: 'бюджет', value: '1.000.000$' },
		{ name: 'страна', value: 'США' },
		{ name: 'дата релиза', value: '15.12.2023' },
		{ name: 'продолжительность', value: '2:13' },
		{ name: 'язык оригинала', value: 'английский' },
		{ name: 'статус', value: 'релиз' },
	],
};

export const Default: Story = {
	render: (_, context) => {
		const { locale } = context.globals;
		console.log('locale', locale);
		return (
			<CharacteristicList
				data={locale === 'en' ? data.en : data.ru}
			/>
		);
	}
};