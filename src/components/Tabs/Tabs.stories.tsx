import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';
import TabPanel from './TabPanel/TabPanel';

const meta: Meta<typeof Tabs> = {
	title: 'UI/Tabs',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for Tabs'
		},
		children: {
			control: false,
			description: 'Contents of tabs',
		},
		testId: {
			description: 'Id for testing the component',
		},
		onSelect: {
			control: false,
			description: 'Id for testing the component',
		},
		defaultSelected: {
			description: 'The tab that will be displayed by default',
		},
		isDisabled: {
			description: 'Allows you to make buttons for tabs inactive',
		},
		fitted: {
			description: 'Allows tab buttons to take up the entire allowable width',
		}
	},
	component: Tabs,
	parameters: {
		docs: {
			description: {
				component: 'The "Tabs" component is an element that is used to organize content into several tabs, allowing the user to choose between different sections of information without reloading the page. It improves navigation and accessibility by allowing users to easily switch between related sections of content.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Tabs>;

const tabLabels = ['banana', 'orange', 'apple', 'avocado', 'blackberry', 'blueberry', 'cherry', 'cocount', 'grape', 'lemon', 'lime', 'nectarine', 'watermelon', 'raspberry', 'strawberry', 'mango', 'pear', 'papaya', 'pomegranate', 'peach', 'pineapple', 'cabbage', 'broccoli', 'mushroom', 'zucchini', 'red chilli pepper', 'sweet potato'];
const tabPanels = tabLabels.map((label, index) => (
	<TabPanel
		className='p-2'
		key={index}
		label={label}
	>
		{label}
	</TabPanel>
));

export const Default: Story = {
	args: {
		id: 'tabs',
		children: tabPanels.slice(0, 3),
	},
	parameters: {
		docs: {
			description: {
				story: 'Default state of tabs',
			},
		},
	},
};

export const Disabled: Story = {
	args: {
		id: 'tabs',
		children: tabPanels.slice(0, 3),
		isDisabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Makes tab buttons inactive. It is useful in cases when you need to limit the user\'s ability from repeated clicks, or just make it temporarily inactive',
			},
		},
	},
};

export const Fitted: Story = {
	args: {
		id: 'tabs',
		children: tabPanels.slice(0, 3),
		fitted: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Tab buttons occupy the entire free width, in equal parts',
			},
		},
	},
};

export const ManyTabs: Story = {
	args: {
		id: 'tabs',
		children: tabPanels,
	},
	parameters: {
		docs: {
			description: {
				story: 'Tab buttons occupy the entire free width, in equal parts',
			},
		},
	},
};

export const EventCallbacks: Story = {
	argTypes: {
		onSelect: {
			action: 'Selected',
		},
	},
	args: {
		id: 'tabs',
		children: tabPanels.slice(0, 3),
	},
	parameters: {
		docs: {
			description: {
				story: 'The callback function is called when another tab is selected',
			},
		},
	},
};

