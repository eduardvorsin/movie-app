import type { Meta, StoryObj } from '@storybook/react';
import RatingItem from './RatingItem';

const meta: Meta<typeof RatingItem> = {
	title: 'UI/RatingItem',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the component'
		},
		children: {
			description: 'The text content of the component',
		},
		isOrdered: {
			description: 'Allows you to add a css counter for a component.'
		},
		testId: {
			description: 'Id for testing the component',
		},
		id: {
			description: 'A unique identifier for the component',
		},
		src: {
			description: 'The path to the image for the component',
		},
		element: {
			description: 'Allows you to determine which html element a component can be, div and li are available.',
		},
		title: {
			description: 'The text for the component header',
		},
		loading: {
			description: 'Allows you to add lazy loading for an image',
		},
	},
	component: RatingItem,
	parameters: {
		docs: {
			description: {
				component: 'A component that allows you to make a list of films for a certain top, for example, the top 10 films with a box office.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof RatingItem>;

export const Default: Story = {
	args: {
		id: 10,
		isOrdered: false,
		element: 'div',
		title: 'Rating Item Title',
		src: '/assets/images/movie-card-placeholder-l-v.svg',
		children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
};

export const Ordered: Story = {
	args: {
		id: 10,
		isOrdered: true,
		element: 'li',
		src: '/assets/images/movie-card-placeholder-l-v.svg',
		children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
	render: (args) => (
		<ul>
			<RatingItem
				{...args}
				title='Rating Item Title 1'

			/>
			<RatingItem
				{...args}
				title='Rating Item Title 2'
			/>
		</ul>
	),
};