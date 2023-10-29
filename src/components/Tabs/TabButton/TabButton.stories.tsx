import type { Meta, StoryObj } from '@storybook/react';
import TabButton from './TabButton';

const meta: Meta<typeof TabButton> = {
	title: 'components/Tabs/TabButton',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for TabButton'
		},
		testId: {
			description: 'Id for testing the component',
		},
		isDisabled: {
			description: 'Allows you to make the component inactive',
		},
		isActive: {
			description: 'Shows whether the buttons and the associated tab are active or not',
		},
		onClick: {
			control: false,
			description: 'The callback that is called when clicked',
		},
		onKeyDown: {
			control: false,
			description: 'The callback that is called when the key is pressed',
		},
		ariaControls: {
			control: false,
			description: 'Allows you to set the id of the active tab for screen readers',
		},
		index: {
			control: false,
			description: 'Active tab index',
		},
	},
	component: TabButton,
	parameters: {
		docs: {
			description: {
				component: 'The TabButton component is an interactive button used in the Tabs component to select a specific tab or section on a web page. It provides user selection and navigation between different sections of content, which makes the interface more user-friendly and accessible to users.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof TabButton>;

export const Default: Story = {
	args: {
		id: 'tabs',
		label: 'tab-button',
		ariaControls: 'tab-panel-0'
	},
	parameters: {
		docs: {
			description: {
				story: 'Default state for TabButton',
			},
		},
	},
};

export const Active: Story = {
	args: {
		id: 'tabs',
		label: 'tab-button',
		ariaControls: 'tab-panel-0',
		isActive: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'The active state of the button',
			},
		},
	},
};

export const Disabled: Story = {
	args: {
		id: 'tabs',
		label: 'tab-button',
		ariaControls: 'tab-panel-0',
		isDisabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Inactive state of the button',
			},
		},
	},
};

export const EventCallbacks: Story = {
	argTypes: {
		onClick: {
			action: 'Clicked',
		},
		onKeyDown: {
			action: 'Pressed',
		},
	},
	args: {
		id: 'tabs',
		label: 'tab-button',
		ariaControls: 'tab-panel-0',
		isActive: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'onClick and onKeyDown callbacks are called when the button is clicked and when the key is pressed',
			},
		},
	},
};