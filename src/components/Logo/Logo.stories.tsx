import type { Meta, StoryObj } from '@storybook/react';
import Logo, { Props } from './Logo';

const sizes: Exclude<Props['size'], undefined>[] = ['small', 'medium', 'large'];

const meta: Meta<typeof Logo> = {
	title: 'components/Logo',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the Logo'
		},
		testId: {
			description: 'Id for testing the component',
		},
		size: {
			description: 'Logo Dimensions',
		},
		onClick: {
			control: false,
			description: 'A callback that is triggered when a component is clicked on',
		},
	},
	component: Logo,
	parameters: {
		docs: {
			description: {
				component: 'The component responsible for displaying the project logo',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
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
	parameters: {
		docs: {
			description: {
				story: 'When you click on the logo, a callback is triggered',
			},
		},
	},
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: 'There are 3 logo sizes: small, medium, large.',
			},
		},
	},
	render: () => (
		<div
			className='flex flex-col gap-5'
		>
			{sizes.map((size) => (
				<Logo
					key={size}
					size={size}
				/>
			))}
		</div>
	)
};
