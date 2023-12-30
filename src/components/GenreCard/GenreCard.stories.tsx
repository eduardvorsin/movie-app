import type { Meta, StoryObj } from '@storybook/react';
import GenreCard from './GenreCard';
import { Genres } from '@/types/shared';

const genres: Genres[] = ['adventure', 'romance', 'history', 'music', 'war', 'thriller', 'animation', 'crime', 'documentary', 'drama', 'family', 'fantasy', 'horror', 'mystery', 'tv movie', 'western', 'action', 'comedy', 'action & adventure', 'war & politics', 'talk', 'soap', 'news', 'reality', 'kids', 'sci-fi & fantasy', 'science fiction'];

const meta: Meta<typeof GenreCard> = {
	title: 'components/GenreCard',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for GenreCard'
		},
		href: {
			description: 'The url to which the click-through will take place',
		},
		genre: {
			description: 'Type of genre',
		},
		title: {
			description: 'Title content',
		},
		titleElement: {
			description: 'Title level from 1 to 6',
		},
		onClick: {
			control: false,
			description: 'The callback that is called when you click on the card',
		},
		testId: {
			description: 'Id for testing the component',
		}
	},
	component: GenreCard,
	parameters: {
		docs: {
			description: {
				component: 'GenreCard is a type of cards that helps the user to select the desired movie genre for further searchreCards are employed to exhibit the condition of an object or the outcome of a completed action.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof GenreCard>;

export const Default: Story = {
	args: {
		title: 'Default',
		titleElement: 'h3',
		genre: 'comedy',
		href: '/',
	},
	parameters: {
		docs: {
			description: {
				story: 'Default type of card.',
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
	args: {
		title: 'Click event',
		titleElement: 'h3',
		genre: 'adventure',
		href: '/',
	},
	parameters: {
		docs: {
			description: {
				story: 'Callback function can be supplied to onClick event',
			},
		},
	},
};

export const All: Story = {
	render: () => {
		return (
			<div
				className='grid grid-cols-[repeat(auto-fill,_150px)] auto-rows-min gap-4'
			>
				{genres.map((genre) => (
					<GenreCard
						key={genre}
						genre={genre}
						title={`${genre} title`}
						titleElement='h3'
						href='/'
					/>
				))}
			</div>
		)
	},
	parameters: {
		docs: {
			description: {
				story: 'Here are all possible variants of GenreCards by types of icons and genres',
			},
		},
	},
};