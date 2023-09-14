import type { Meta, StoryObj } from '@storybook/react';
import CommentAction from './CommentAction';

const meta: Meta<typeof CommentAction> = {
	title: 'components/CommentAction',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes of the CommentAction component'
		},
		children: {
			description: 'CommentAction contents',
		},
		isDisabled: {
			description: 'Disabling the component makes it non-functional'
		},
		onFocus: {
			control: false,
			description: 'The callback is executed when the component gets focus'
		},
		onClick: {
			control: false,
			description: 'The callback is performed when the component is pressed'
		},
		testId: {
			description: 'Id for testing the component',
		}
	},
	component: CommentAction,
	parameters: {
		docs: {
			description: {
				component: 'CommentAction is a button that is used in the comments block to perform certain actions related to them (like, share, etc).',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof CommentAction>;

export const Default: Story = {
	args: {
		children: 'Default'
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the button',
			},
		},
	},
};

export const Disabled: Story = {
	args: {
		children: 'Disabled',
		isDisabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'The disabled state of the button. In this state, the click and focus on the element do not work. It may be useful to prevent the user from performing the action again.',
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
	},
	args: {
		children: 'click, focus, blur events'
	},
	parameters: {
		docs: {
			description: {
				story: 'Callback functions can be supplied to onClick, onBlur, and onFocus events',
			},
		},
	},
};