import type { Meta, StoryObj } from '@storybook/react';
import CatalogFilters from './CatalogFilters';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof CatalogFilters> = {
	title: 'UI/CatalogFilters',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the component'
		},
		testId: {
			description: 'Id for testing the component',
		},
		onSearchButtonClick: {
			control: false,
			description: 'Allows you to send a callback that is called when you click on the search button',
		},
	},
	component: CatalogFilters,
	parameters: {
		docs: {
			description: {
				component: 'The CatalogFilter component is an interface element designed to filter and search for content in a catalog, such as movies. This component provides users with a convenient and efficient way to customize search parameters to get more accurate results.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof CatalogFilters>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
};

export const EventCallbacks: Story = {
	args: {
		onSearchButtonClick: () => action('Search Button Clicked')(),
	},
	parameters: {
		docs: {
			description: {
				story: 'The callback that is called when you click on the search button',
			},
		},
	},
};