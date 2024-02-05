import type { Meta, StoryObj } from '@storybook/react';
import Select, { SelectOption } from './Select';

const meta: Meta<typeof Select> = {
	title: 'UI/Select',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the component'
		},
		label: {
			description: 'The text label for the component',
		},
		name: {
			description: 'Name for the select',
		},
		placeholder: {
			description: 'A placeholder text that is displayed when none of the options are selected',
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
		options: {
			control: false,
			description: 'Array of data for the selection options',
		},
		labelHidden: {
			description: 'Allows you to hide the label for components',
		},
		isRequired: {
			description: 'Makes the component mandatory',
		},
		isDisabled: {
			description: 'Makes the component non-functional',
		},
		isInvalid: {
			description: 'Allows you to select a component as incorrect for validation',
		},
		error: {
			description: 'A text message that will be displayed in case of an error',
		},
		closeMenuOnSelect: {
			description: 'Allows you to close the menu when an option is selected',
		},
		closeMenuOnScroll: {
			description: 'Allows you to close the menu when scrolling',
		},
		openMenuOnFocus: {
			description: 'Allows you to open the menu when in focus',
		},
		maxMenuHeight: {
			description: 'Maximum menu height',
		},
		minMenuHeight: {
			description: 'Minimum menu height',
		},
		onChange: {
			control: false,
			description: 'The callback that is called when the option selection is changed',
		},
		onBlur: {
			control: false,
			description: 'The callback that is called when the focus is lost',
		},
		onFocus: {
			control: false,
			description: 'The callback that is called when receiving and focusing',
		},
		onKeyDown: {
			control: false,
			description: 'A callback that is called when a key is pressed',
		},
		onMenuOpen: {
			control: false,
			description: 'The callback that is called when the menu is opened',
		},
		onMenuClose: {
			control: false,
			description: 'The callback that is called when the menu is closed',
		},
	},
	component: Select,
	parameters: {
		docs: {
			description: {
				component: 'Select is a form element designed to select one or more options from a drop-down list. It provides a convenient and compact way to provide the user with a choice from a limited set of options.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Select>;

const Options: SelectOption[] = [
	{
		label: 'Banana',
		value: 'banana',
	},
	{
		label: 'Orange',
		value: 'orange',
	},
	{
		label: 'Apple',
		value: 'apple',
	},
];

export const Default: Story = {
	args: {
		id: 'select',
		label: 'select label',
		options: Options,
		value: null,
		minMenuHeight: 102,
		maxMenuHeight: 102,
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
};

export const Error: Story = {
	args: {
		id: 'select',
		label: 'select label',
		options: Options,
		value: null,
		minMenuHeight: 102,
		maxMenuHeight: 102,
		error: 'Error text',
	},
	parameters: {
		docs: {
			description: {
				story: 'The text that will be displayed when the component fails',
			},
		},
	},
};

export const LabelHidden: Story = {
	args: {
		id: 'select',
		label: 'select label',
		options: Options,
		value: null,
		minMenuHeight: 102,
		maxMenuHeight: 102,
		labelHidden: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'The state when the label is visible only to screen readers',
			},
		},
	},
};

export const Disabled: Story = {
	args: {
		id: 'select',
		label: 'select label',
		options: Options,
		value: null,
		minMenuHeight: 102,
		maxMenuHeight: 102,
		isDisabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'The component becomes inactive for the user through the keyboard, mouse, and other means of interaction.',
			},
		},
	},
};

export const CloseMenuOnSelect: Story = {
	args: {
		id: 'select',
		label: 'select label',
		options: Options,
		value: null,
		minMenuHeight: 102,
		maxMenuHeight: 102,
		closeMenuOnSelect: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to close the selection when any of the options is selected',
			},
		},
	},
};

export const CloseMenuOnScroll: Story = {
	args: {
		id: 'select',
		label: 'select label',
		options: Options,
		value: null,
		minMenuHeight: 102,
		maxMenuHeight: 102,
		closeMenuOnScroll: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to close the selection when scrolling through the page',
			},
		},
	},
};

export const OpenMenuOnFocus: Story = {
	args: {
		id: 'select',
		label: 'select label',
		options: Options,
		value: null,
		minMenuHeight: 102,
		maxMenuHeight: 102,
		openMenuOnFocus: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to open the menu selector in the focus state',
			},
		},
	},
};

export const Invalid: Story = {
	args: {
		id: 'select',
		label: 'select label',
		options: Options,
		value: null,
		minMenuHeight: 102,
		maxMenuHeight: 102,
		isInvalid: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Makes the component not valid for validation',
			},
		},
	},
};

export const Required: Story = {
	args: {
		id: 'select',
		label: 'select label',
		options: Options,
		value: null,
		minMenuHeight: 102,
		maxMenuHeight: 102,
		isRequired: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Makes the component mandatory',
			},
		},
	},
};

export const EventCallbacks: Story = {
	argTypes: {
		onChange: {
			action: 'Changed',
		},
		onMenuOpen: {
			action: 'Opened',
		},
		onMenuClose: {
			action: 'Closed',
		},
		onFocus: {
			action: 'Focused',
		},
		onBlur: {
			action: 'Blured',
		},
		onKeyDown: {
			action: 'Key Down',
		},
	},
	args: {
		id: 'select',
		label: 'select label',
		options: Options,
		value: null,
		minMenuHeight: 102,
		maxMenuHeight: 102,
		isRequired: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Callbacks that are called when clicking, getting focus, losing focus, opening and closing menus, and pressing keys',
			},
		},
	},
};

export const MaxMenuHeight: Story = {
	args: {
		id: 'select',
		label: 'select label',
		options: Options.slice(0, 1),
		value: null,
		minMenuHeight: 102,
		maxMenuHeight: 102,
		isRequired: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the maximum height of the menu in pixels',
			},
		},
	},
};

export const MinMenuHeight: Story = {
	args: {
		id: 'select',
		label: 'select label',
		options: Options.slice(0, 1),
		value: null,
		minMenuHeight: 32,
		maxMenuHeight: 102,
		isRequired: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the minimum height of the menu in pixels',
			},
		},
	},
};