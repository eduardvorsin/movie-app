import type { Meta, StoryObj } from '@storybook/react';
import Link from './Link';


const meta: Meta<typeof Link> = {
	title: 'UI/Link',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the Link componentz'
		},
		id: {
			description: 'Unique identifier',
		},
		children: {
			description: 'Component content',
		},
		href: {
			description: 'The url to which the link will be clicked',
		},
		onClick: {
			description: 'The callback that is called when the link is clicked',
		},
		onFocus: {
			description: 'The callback that is called when a link is hit',
		},
		onBlur: {
			description: 'A callback that is called when the focus is lost from the link',
		},
		isDisabled: {
			description: 'Makes the link inactive for interaction',
		},
		target: {
			description: 'Allows you to set the way a new page will open when a link is clicked',
		},
		isExternal: {
			description: 'Determines whether the link is internal or external',
		},
		testId: {
			description: 'Id for testing the component',
		}
	},
	component: Link,
	parameters: {
		docs: {
			description: {
				component: 'Links transport users to a different location and typically manifest within or immediately after a sentence.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
	args: {
		children: 'Default',
		href: '/',
	},
	parameters: {
		docs: {
			description: {
				story: 'Default state of the component',
			},
		},
	},
};

export const Disabled: Story = {
	args: {
		children: 'Disabled',
		isDisabled: true,
		href: '/',
	},
	parameters: {
		docs: {
			description: {
				story: 'The inactive state of a link is useful when you need to temporarily restrict the user\'s ability to interact with it.',
			},
		},
	},
};

export const External: Story = {
	args: {
		children: 'External',
		isExternal: true,
		href: 'https://www.google.com/',
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to define a link to an external resource. Also implements additional security mechanisms for this',
			},
		},
	},
};

export const EventCallbacks: Story = {
	argTypes: {
		onClick: {
			action: 'Clicked',
		},
		onFocus: {
			action: 'Focused',
		},
		onBlur: {
			action: 'Blured',
		}
	},
	args: {
		children: 'click, focus, blur events',
		href: '/',
	},
	parameters: {
		docs: {
			description: {
				story: 'Callback functions can be supplied to onClick, onBlur, and onFocus events',
			},
		},
	},
};