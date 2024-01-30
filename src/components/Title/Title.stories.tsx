import type { Meta, StoryObj } from '@storybook/react';
import Title, { Props } from './Title';

const levels: Exclude<Props['level'], undefined>[] = [1, 2, 3, 4, 5, 6];
const weights: Exclude<Props['weight'], undefined>[] = [400, 500, 600, 700];

const meta: Meta<typeof Title> = {
	title: 'UI/Title',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the Title'
		},
		testId: {
			description: 'Id for testing the component',
		},
		children: {
			description: 'Header Content',
		},
		level: {
			description: 'Header level',
		},
		as: {
			description: 'The HTML element that will be used on the page. A total of 6 elements are available from h1 to h6',
		}
	},
	component: Title,
	parameters: {
		docs: {
			description: {
				component: 'Utilize headings to designate pages or segments of a user interface. Headings have the flexibility to mark either a complete page or portions of associated content. With the Heading component, you can choose the suitable semantic element (h1-h6) and adjust its size independently to match the surrounding content appropriately.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Title>;

export const Default: Story = {
	args: {
		level: 3,
		children: 'Default',
	},
	parameters: {
		docs: {
			description: {
				story: 'Default version of the header',
			},
		},
	},
};

export const Weights: Story = {
	parameters: {
		docs: {
			description: {
				story: 'There are 4 levels of weight(400-700) for this font',
			},
		},
	},
	render: () => (
		<div
			className='flex flex-col'
		>
			{weights.map((weight) => (
				<Title
					key={weight}
					className='mb-4 last:mb-4'
					weight={weight}
					level={3}
					as={`h${3}`}
				>
					Weight {weight}
				</Title>
			))}
		</div>
	)
};

export const Levels: Story = {
	parameters: {
		docs: {
			description: {
				story: 'There are 6 levels of headers, which differ in font size and line height',
			},
		},
	},
	render: () => (
		<div
			className='flex flex-col'
		>
			{levels.map((level) => (
				<Title
					key={level}
					className='mb-4 last:mb-4'
					level={level}
					as={`h${level}`}
				>
					Level {level}
				</Title>
			))}
		</div>
	)
};