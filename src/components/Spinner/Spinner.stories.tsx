import type { Meta, StoryObj } from '@storybook/react';
import Spinner, { Props } from './Spinner';

type Sizes = Exclude<Props['size'], undefined>;
const sizes: Sizes[] = ['small', 'medium', 'large', 'xlarge'];

type Variant = {
	size: Sizes,
	color: Props['color'],
}

const variants: Variant[] = [
	{
		size: 'small',
		color: 'stroke-lime-800 dark:stroke-lime-300',
	},
	{
		size: 'medium',
		color: 'stroke-red-800 dark:stroke-red-300',
	},
	{
		size: 'large',
		color: 'stroke-orange-800 dark:stroke-orange-300',
	},
	{
		size: 'xlarge',
		color: 'stroke-teal-800 dark:stroke-teal-300',
	},
];

const meta: Meta<typeof Spinner> = {
	title: 'components/Spinner',
	tags: ['autodocs'],
	argTypes: {
		size: {
			description: 'Sets the size of the spinner. You can choose a ready-made size or set your own styles for sizes.',
		},
		className: {
			description: 'Additional classes for the Spinner'
		},
		color: {
			description: 'Color for spinner',
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

export const Color: Story = {
	args: {
		color: 'stroke-lime-500 dark:stroke-lime-300',
	},
	parameters: {
		docs: {
			description: {
				story: 'The color can be changed if you pass to the prop color class with a new color for svg stroke',
			},
		},
	},
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the size of the spinner. The default is medium. There are 5 spinner sizes in total, of which 4 have specific width and height dimensions and the 5th is custom, allowing you to set your sizes through classes',
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

export const All: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Here are all kinds of spinners, in size and colors',
			},
		},
	},
	render: () => (
		<div
			className='flex items-start'
		>
			{variants.map((variant) => (
				<Spinner
					className='mr-4 last:mr-0'
					key={variant.size}
					size={variant.size}
					color={variant.color}
				/>
			))}
		</div>
	)
};