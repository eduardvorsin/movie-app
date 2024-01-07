import type { Meta, StoryObj } from '@storybook/react';
import LoadingLayout from './LoadingLayout';

const meta: Meta<typeof LoadingLayout> = {
	title: 'components/LoadingLayout',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the LoadingLayout'
		},
		testId: {
			description: 'Id for testing the component',
		},
	},
	component: LoadingLayout,
	parameters: {
		docs: {
			description: {
				component: 'The component responsible for displaying the page loading status. It is shown both when the page is initially loaded and when navigating through pages',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof LoadingLayout>;

export const Default: Story = {
	args: {
		className: '',
		testId: '',
	},
};