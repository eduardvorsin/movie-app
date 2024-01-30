import type { Meta, StoryObj } from '@storybook/react';
import Spinner, { Props } from './Spinner';

type Sizes = Exclude<Props['size'], undefined>;
const sizes: Sizes[] = ['small', 'medium', 'large', 'xlarge'];

const meta: Meta<typeof Spinner> = {
	title: 'UI/Spinner',
	tags: ['autodocs'],
	argTypes: {
		size: {
			description: 'Sets the size of the spinner. You can choose a ready-made size or set your own styles for sizes.',
		},
		className: {
			description: 'Additional classes for the Spinner'
		},
		testId: {
			description: 'Id for testing the component',
		}
	},
	component: Spinner,
	parameters: {
		docs: {
			description: {
				component: 'Spinners serve the purpose of indicating a loading condition to the user and can be employed in buttons, forms, containers, pages, or any other context requiring the representation of a loading state.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Default type of spinner',
			},
		},
	},
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the size of the spinner. The default is medium. There are 4 spinner sizes in total, with specific width and height dimensions, allowing you to set your sizes through classes',
			},
		},
	},
	render: () => (
		<div
			className='flex items-start'
		>
			{sizes.map((size) => (
				<Spinner
					className='mr-4 last:mr-0'
					key={size}
					size={size}
				/>
			))}
		</div>
	)
};