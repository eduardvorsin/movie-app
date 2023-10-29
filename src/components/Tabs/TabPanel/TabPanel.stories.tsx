import type { Meta, StoryObj } from '@storybook/react';
import TabPanel from './TabPanel';

const meta: Meta<typeof TabPanel> = {
	title: 'components/Tabs/TabPanel',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for TabPanel'
		},
		testId: {
			description: 'Id for testing the component',
		},
		children: {
			description: 'Contents of the TabPanel component',
		},
		label: {
			description: 'Text to display in TabButton',
		},
	},
	component: TabPanel,
	parameters: {
		docs: {
			description: {
				component: 'The TabPanel component is a container used in the Tabs component to display the contents of a specific tab or section on a web page. It allows the user to see and interact with the content associated with the selected tab, providing ease of navigation and accessibility of the interface.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof TabPanel>;

export const Default: Story = {
	args: {
		label: 'tab-label',
		children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quia illum eligendi adipisci magni, atque animi facere odit. Ex in illo obcaecati natus culpa consequuntur nobis tempore quidem rem eum.Dicta deserunt vero consequatur veritatis veniam tenetur quibusdam vitae aspernatur perspiciatis quas modi voluptatum voluptatem impedit optio soluta eum, explicabo sequi totam quisquam doloribus consectetur illum tempora. Reiciendis, accusamus corporis.',
	},
	parameters: {
		docs: {
			description: {
				story: 'Default state for TabButton',
			},
		},
	},
};
