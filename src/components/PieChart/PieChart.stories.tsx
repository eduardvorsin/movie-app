import type { Meta, StoryObj } from '@storybook/react';
import PieChart, { Props } from './PieChart';

const meta: Meta<typeof PieChart> = {
	title: 'UI/PieChart',
	tags: ['autodocs'],
	argTypes: {
		size: {
			description: 'Chart width and height',
		},
		className: {
			description: 'Additional classes for the component'
		},
		value: {
			description: 'The fullness value of the progress bar',
		},
		barColor: {
			description: 'Allows you to set the color of the progress bar',
		},
		testId: {
			description: 'Id for testing the component',
		},
		trackColor: {
			description: 'Defines the color of the pie chart track',
		},
		thickness: {
			description: 'Sets the thickness of the strips in the diagram',
		},
		appearance: {
			description: 'Defines the type of appearance of the component.',
		},
	},
	component: PieChart,
	parameters: {
		docs: {
			description: {
				component: 'The PieChart component provides a graphical representation of the data in the form of a pie chart (or pie)',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof PieChart>;

export const Default: Story = {
	args: {
		size: 60,
		value: 33,
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
};

export const BarColor: Story = {
	args: {
		value: 50,
		size: 60,
		barColor: {
			light: '#5600e8',
			dark: '#dbb2ff',
		},
	},
	parameters: {
		docs: {
			description: {
				story: 'Custom color for the progress line',
			},
		},
	},
};

export const TrackColor: Story = {
	args: {
		size: 60,
		value: 66,
		barColor: {
			light: '#dbb2ff',
			dark: '#5600e8',
		},
	},
	parameters: {
		docs: {
			description: {
				story: 'Custom color for the track',
			},
		},
	},
};

export const Thickness: Story = {
	args: {
		size: 60,
		value: 40,
		barColor: {
			light: '#dbb2ff',
			dark: '#5600e8',
		},
	},
	parameters: {
		docs: {
			description: {
				story: 'Custom line thickness for the chart',
			},
		},
	},
};

const appearances: NonNullable<Props['appearance']>[] = ['primary', 'rating'];
export const Appearance: Story = {
	parameters: {
		docs: {
			description: {
				story: 'The appearance property allows you to set color options for the component. PieChart can have 2 options: primary and rating. The second option, depending on the value, turns the progress bar red, yellow or green',
			},
		},
	},
	render: () => (
		<div className='flex items-start gap-3 flex-wrap'>
			{appearances.map((appearance) => (
				<PieChart
					key={appearance}
					value={75}
					size={60}
					appearance={appearance}
				/>
			))}
		</div>
	),
};
