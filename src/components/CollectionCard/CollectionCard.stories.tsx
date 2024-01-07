import type { Meta, StoryObj } from '@storybook/react';
import CollectionCard from './CollectionCard';

const meta: Meta<typeof CollectionCard> = {
	title: 'components/CollectionCard',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the CollectionCard'
		},
		testId: {
			description: 'Id for testing the component',
		},
		title: {
			description: 'Card title',
		},
		alt: {
			description: 'Alternative text for the image',
		},
		href: {
			description: 'A link to go to when clicking on the card',
		},
		sizes: {
			description: 'Dimensions for the image',
		},
		priority: {
			description: 'Priority for the image',
		},
		src: {
			description: 'The path to the image',
		}
	},
	component: CollectionCard,
	parameters: {
		docs: {
			description: {
				component: 'A card that is used to designate a collection of films, TV series, etc.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof CollectionCard>;

export const Default: Story = {
	args: {
		className: 'max-w-[300px]',
		title: 'Collection Card',
		href: '/',
		src: '/assets/images/collection-marvel.webp',
		alt: 'collection card image',
	},
};