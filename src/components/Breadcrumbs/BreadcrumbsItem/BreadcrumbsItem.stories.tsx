import type { Meta, StoryObj } from '@storybook/react';
import BreadcrumbsItem from './BreadcrumbsItem';

const meta: Meta<typeof BreadcrumbsItem> = {
	title: 'UI/Breadcrumbs/BreadcrumbsItem',
	tags: ['autodocs'],
	argTypes: {
		children: {
			description: 'The text content of the element',
		},
		className: {
			description: 'Additional classes for the component'
		},
		onClick: {
			control: false,
			description: 'The callback that is called when the component is clicked',
		},
		href: {
			description: 'The link to the page to which the transition will be made when clicking on the component',
		},
		testId: {
			description: 'Id for testing the component',
		},
		isLastItem: {
			description: 'Determines whether the link is the last in the list',
		},
		truncationWidth: {
			description: 'Sets the maximum width of the component at which the text will be cropped',
		},
		target: {
			control: false,
			description: 'How to display a page when clicking on a link',
		},
	},
	component: BreadcrumbsItem,
	parameters: {
		docs: {
			description: {
				component: 'The BreadcrumbsItem component is a part of the breadcrumbs system and is used to represent a single element in this navigation chain.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof BreadcrumbsItem>;

export const Default: Story = {
	args: {
		children: 'item',
		href: '/',
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
		children: 'A very long element',
		href: '/',
		truncationWidth: 100,
	},
	parameters: {
		docs: {
			description: {
				story: 'The value in pixels after which the text in the component will be cropped',
			},
		},
	},
};

export const isLastItem: Story = {
	args: {
		children: 'Last item',
		href: '/',
		isLastItem: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Since the last link in the list points to the current page, we use this prop to make it inactive for users',
			},
		},
	},
};

export const EventCallbacks: Story = {
	argTypes: {
		onClick: {
			action: 'Clicked',
		},
	},
	args: {
		children: 'item',
		href: '/',
	},
	parameters: {
		docs: {
			description: {
				story: 'A callback function can be provided to the onClick event.',
			},
		},
	},
};