import type { Meta, StoryObj } from '@storybook/react';
import SocialLinks from './SocialLinks';
import { createSocialNetworksArray } from '@/helpers/createSocialNetworksArray/createSocialNetworksArray';

const meta: Meta<typeof SocialLinks> = {
	title: 'UI/SocialLinks',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the component'
		},
		testId: {
			description: 'Id for testing the component',
		},
		isRounded: {
			description: 'Allows you to make icons round',
		},
		data: {
			control: false,
			description: 'An array for generating links to social networks',
		},
	},
	component: SocialLinks,
	parameters: {
		docs: {
			description: {
				component: 'SocialLinks is an interface element designed to display and provide access to various social networks and platforms. This component is often used to integrate and provide users with easy access to social profiles or pages associated with a web application.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof SocialLinks>;

const data = createSocialNetworksArray({
	imdb_id: null,
	facebook_id: ' ',
	instagram_id: ' ',
	tiktok_id: ' ',
	twitter_id: ' ',
	youtube_id: ' ',
});

export const Default: Story = {
	args: { data },
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
};

export const Rounded: Story = {
	args: { data, isRounded: true },
	parameters: {
		docs: {
			description: {
				story: 'Makes social media icons round',
			},
		},
	},
};