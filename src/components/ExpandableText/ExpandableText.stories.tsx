import type { Meta, StoryObj } from '@storybook/react';
import ExpandableText from './ExpandableText';

const meta: Meta<typeof ExpandableText> = {
	title: 'components/ExpandableText',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for ExpandableText'
		},
		visibleRowsCount: {
			description: 'The number of visible rows in the non-expanded state. It can take values from 1 to 6',
		},
		children: {
			description: 'ExpandableText contents',
		},
		defaultExpanded: {
			description: 'Allows you to set whether the text will be open or not when it first appears. By default, part of the text is hidden.',
		},
		testId: {
			description: 'Id for testing the component',
		}
	},
	component: ExpandableText,
	parameters: {
		docs: {
			description: {
				component: 'This component is used to provide the user with the ability to expand or collapse additional text in the interface of a website or mobile application. It can be useful when you need to save space on a page, hide details, improve readability on mobile devices.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof ExpandableText>;

export const Default: Story = {
	args: {
		className: 'max-w-[15rem]',
		children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, dolore voluptate delectus facilis libero odio. Nisi doloremque nulla dolore eius adipisci? Reiciendis aliquam hic est laboriosam inventore expedita mollitia quidem?'
	},
	parameters: {
		docs: {
			description: {
				story: 'Default state of the component',
			},
		},
	},
};

export const DefaultExpanded: Story = {
	args: {
		className: 'max-w-[15rem]',
		children: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, dolore voluptate delectus facilis libero odio.', ' Nisi doloremque nulla dolore eius adipisci?', ' Reiciendis aliquam hic est laboriosam inventore expedita mollitia quidem?'],
		defaultExpanded: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set whether the text will be in the expanded or collapsed state when it first appears.',
			},
		},
	},
};