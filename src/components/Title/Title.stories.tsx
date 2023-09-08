import type { Meta, StoryObj } from '@storybook/react';
import Title from './Title';

const levels = [1, 2, 3, 4, 5, 6] as const;

const meta: Meta<typeof Title> = {
	title: 'components/Title',
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

export const Levels: Story = {
	parameters: {
		docs: {
			description: {
				story: 'There are 6 levels of headings, which differ in font size, line height and fat content.',
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