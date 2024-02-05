import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumbs from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
	title: 'UI/Breadcrumbs',
	tags: ['autodocs'],
	argTypes: {
		label: {
			description: 'Text description for the element',
		},
		className: {
			description: 'Additional classes for the component'
		},
		isNavigation: {
			description: 'Allows you to select whether the element will be a navigation block or a regular block',
		},
		testId: {
			description: 'Id for testing the component',
		},
		maxItems: {
			description: 'Defines the maximum number of visible elements',
		},
		separator: {
			description: 'The character to be used as a separator',
		},
		truncationWidth: {
			description: 'Sets the maximum width of the navigation elements at which the text will be cut off',
		},
		target: {
			control: false,
			description: 'How to display a page when clicking on a link',
		},
		lastItemLabel: {
			description: 'The label for the last element in the navigation',
		},
	},
	component: Breadcrumbs,
	parameters: {
		docs: {
			description: {
				component: 'The Breadcrumbs component is a navigation element of the website or application interface that provides users with information about the current location on the site relative to its structure.',
			},
		},
		nextjs: {
			navigation: {
				pathname: '/en/movies/9999',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
	args: {
		label: 'navigation',
		maxItems: 2,
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
};

export const TrunctionWidth: Story = {
	args: {
		label: 'navigation',
		maxItems: 2,
		truncationWidth: 50,
	},
	parameters: {
		docs: {
			description: {
				story: 'The value in pixels after which the text in the navigation elements will be cropped',
			},
		},
	},
};

export const LastItemLabel: Story = {
	args: {
		label: 'navigation',
		maxItems: 2,
		lastItemLabel: 'Star Wars',
	},
	parameters: {
		docs: {
			description: {
				story: 'A text label that will be displayed instead of the last navigation element',
			},
		},
	},
};

export const Separator: Story = {
	args: {
		label: 'navigation',
		maxItems: 2,
		separator: '>',
	},
	parameters: {
		docs: {
			description: {
				story: 'Custom symbol for the element separator',
			},
		},
	},
};