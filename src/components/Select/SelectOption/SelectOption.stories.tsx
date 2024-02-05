import type { Meta, StoryObj } from '@storybook/react';
import SelectOption from './SelectOption';

const meta: Meta<typeof SelectOption> = {
	title: 'UI/Select/SelectOption',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the component'
		},
		label: {
			description: 'The text label for the component',
		},
		value: {
			description: 'Value for the component'
		},
		testId: {
			description: 'Id for testing the component',
		},
		id: {
			description: 'A unique identifier for the component',
		},
		isFocused: {
			description: 'Allows you to set the focus state for a component',
		},
		isSelected: {
			description: 'Allows you to make the state of the item selected',
		},
		onKeyDown: {
			control: false,
			description: 'The callback that is called when the key is pressed',
		},
		onClick: {
			control: false,
			description: 'The callback that is called when the component is clicked',
		},
	},
	component: SelectOption,
	parameters: {
		docs: {
			description: {
				component: 'SelectOption is a selection element that is used together with the Select component to create a drop-down list in the user interface. This component provides options for users to choose from and ensures that they are displayed inside a drop-down list.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof SelectOption>;

export const Default: Story = {
	args: {
		className: 'list-none',
		id: 'option',
		label: 'option label',
		value: 'value',
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
};

export const Focused: Story = {
	args: {
		className: 'list-none',
		id: 'option',
		label: 'option label',
		value: 'value',
		isFocused: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'The state of the component when it is in focus',
			},
		},
	},
};

export const Selected: Story = {
	args: {
		className: 'list-none',
		id: 'option',
		label: 'option label',
		value: 'value',
		isSelected: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'The state of the component when it is selected',
			},
		},
	},
};

export const EventCallbacks: Story = {
	argTypes: {
		onKeyDown: {
			action: 'Key Down',
		},
		onClick: {
			action: 'Clicked',
		},
	},
	args: {
		className: 'list-none',
		id: 'option',
		label: 'option label',
		value: 'value',
	},
	parameters: {
		docs: {
			description: {
				story: 'Callback functions that are called when you click and when you press the keys',
			},
		},
	},
};