import type { Meta, StoryObj } from '@storybook/react';
import ThemedImage from './ThemedImage';

const meta: Meta<typeof ThemedImage> = {
	title: 'UI/ThemedImage',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the component'
		},
		testId: {
			description: 'Id for testing the component',
		},
		src: {
			description: 'The path for the image',
		},
		darkSrc: {
			description: 'The path for the image when the dark theme of the site is enabled',
		},
		fallback: {
			description: 'The path to the backup image if the main image fails to load',
		},
		alt: {
			description: 'Alternative text for the image',
		},
		placeholder: {
			control: false,
			description: 'The placeholder that will be shown when the image is uploaded',
		},
		fill: {
			description: 'Makes the image absolute positioning and filling the entire width and height',
		},
		width: {
			description: 'Image Width',
		},
		height: {
			description: 'Image Height',
		},
		showSkeleton: {
			description: 'Allows you to determine whether the skeleton will be displayed when the image is loaded or not',
		},
	},
	component: ThemedImage,
	parameters: {
		docs: {
			description: {
				component: 'ThemedImage is an image component with the ability to customize the theme, providing flexibility in integrating images into various design schemes of web applications.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof ThemedImage>;

export const Default: Story = {
	args: {
		width: 250,
		height: 250,
		src: '/assets/images/collection-marvel.webp'
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
};

export const DarkSrc: Story = {
	args: {
		width: 250,
		height: 250,
		src: '/assets/images/collection-marvel.webp',
		darkSrc: '/assets/images-collection-dc.webp',
	},
	parameters: {
		docs: {
			description: {
				story: 'Shows a different image if the theme is dark',
			},
		},
	},
};

export const Fallback: Story = {
	args: {
		src: '',
		width: 250,
		height: 250,
		fallback: {
			light: '/assets/images/movie-card-placeholder-l-h.svg',
			dark: '/assets/images/movie-card-placeholder-d-h.svg'
		},
	},
	parameters: {
		docs: {
			description: {
				story: 'Shows a backup image when the main image is not loading',
			},
		},
	},
};