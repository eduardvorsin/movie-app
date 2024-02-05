import type { Meta, StoryObj } from '@storybook/react';
import MovieCard from './MovieCard';

const meta: Meta<typeof MovieCard> = {
	title: 'Layout/MovieCard',
	tags: ['autodocs'],
	argTypes: {
		appearance: {
			description: 'Appearance for the card',
		},
		className: {
			description: 'Additional classes for the MovieCard'
		},
		testId: {
			description: 'Id for testing the component',
		},
		movieId: {
			description: 'Id for the link to the film project',
		},
		src: {
			description: 'The path to the picture',
		},
		alt: {
			description: 'Alternative text for the image',
		},
		releaseDate: {
			description: 'Release date of the film project',
		},
		runtime: {
			description: 'Duration of the film project',
		},
		country: {
			description: 'The country of origin of the film',
		},
		title: {
			description: 'Title for the card',
		},
		showRating: {
			description: 'Allows you to hide/show the rating of a film project',
		},
		rating: {
			description: 'Rating value',
		},
		genres: {
			control: false,
			description: 'Genres of the film project',
		},
		titleElement: {
			description: 'The html element to be used for the header',
		},
		titleLevel: {
			description: 'Header level',
		},
		variant: {
			description: 'A variant of the card',
		},
		mediaType: {
			description: 'Type of media content',
		},
		loading: {
			description: 'Allows you to add a lazy loading for an image',
		},
		sizes: {
			description: 'Allows you to set the dimensions for the image',
		},
	},
	component: MovieCard,
	parameters: {
		docs: {
			description: {
				component: 'The MovieCard component is an important user interface element specifically designed to display movie information in applications or websites focused on cinematic content.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof MovieCard>;

export const Default: Story = {
	args: {
		className: 'max-w-[285px]',
		movieId: 9999,
		src: '/assets/images/movie-card-placeholder-l-v.svg',
		rating: 80,
		alt: '',
		releaseDate: '2024-02-03',
		runtime: '1:30',
		title: 'title',
		country: 'USA',
		genres: [37, 18],
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
};

export const ShowRating: Story = {
	args: {
		className: 'max-w-[285px]',
		movieId: 9999,
		src: '/assets/images/movie-card-placeholder-l-v.svg',
		showRating: true,
		rating: 80,
		alt: '',
		releaseDate: '2024-02-03',
		runtime: '1:30',
		title: 'title',
		country: 'USA',
		genres: [37, 18],
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to hide or show an item with a rating for a movie project',
			},
		},
	},
};

export const Variant: Story = {
	args: {
		movieId: 9999,
		src: '/assets/images/movie-card-placeholder-l-v.svg',
		showRating: true,
		rating: 80,
		alt: '',
		releaseDate: '2024-02-03',
		runtime: '1:30',
		title: 'title',
		country: 'USA',
		genres: [37, 18],
	},
	parameters: {
		docs: {
			description: {
				story: 'Card options. There are 2 options in total: vertical and horizontal',
			},
		},
	},
	render: (args) => (
		<div className='flex gap-4 items-start'>
			<MovieCard
				{...args}
				className='basis-[153px] shrink-0 grow-0'
				variant='vertical'
			/>
			<MovieCard
				{...args}
				className='basis-[285px] shrink-0 grow-0'
				variant='horizontal'
			/>
		</div>
	),
};

export const Appearance: Story = {
	args: {
		movieId: 9999,
		src: '/assets/images/movie-card-placeholder-l-v.svg',
		showRating: true,
		rating: 80,
		alt: '',
		releaseDate: '2024-02-03',
		runtime: '1:30',
		title: 'title',
		country: 'USA',
		genres: [37, 18],
	},
	parameters: {
		docs: {
			description: {
				story: 'The appearance of the card. There are 2 appearance options in total: primary, secondary',
			},
		},
	},
	render: (args) => (
		<div className='flex gap-8 flex-col'>
			<div className='flex gap-4 items-start'>
				<MovieCard
					{...args}
					className='basis-[153px] shrink-0 grow-0'
					variant='vertical'
					appearance='primary'
				/>
				<MovieCard
					{...args}
					className='basis-[153px] shrink-0 grow-0'
					variant='vertical'
					appearance='secondary'
				/>
			</div>
			<div className='flex gap-4 items-start'>
				<MovieCard
					{...args}
					className='basis-[285px] shrink-0 grow-0'
					variant='horizontal'
					appearance='primary'
				/>
				<MovieCard
					{...args}
					className='basis-[285px] shrink-0 grow-0'
					variant='horizontal'
					appearance='secondary'
				/>
			</div>
		</div>
	),
};