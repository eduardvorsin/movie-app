import type { Meta, StoryObj } from '@storybook/react';
import YouTubeVideo, { Props } from './YouTubeVideo';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof YouTubeVideo> = {
	title: 'UI/YouTubeVideo',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the component'
		},
		testId: {
			description: 'Id for testing the component',
		},
		dictionary: {
			control: false,
			description: 'An object with keys for localization of the component',
		},
		width: {
			description: 'Width of the youtube video player',
		},
		height: {
			description: 'Height of the youtube video player',
		},
		videoId: {
			description: 'id for YouTube videos',
		},
		title: {
			description: 'text header for screen readers',
		},
		startTime: {
			description: 'The initial time when the video starts',
		},
		showControls: {
			description: 'Show controls in the YouTube player',
		},
		loading: {
			description: 'Allows you to add lazy loading for the poster',
		},
		posterQuality: {
			description: 'The quality of the YouTube poster',
		},
		muted: {
			description: 'Makes the default video without sound',
		},
		posterAlt: {
			description: 'Alternative text for the poster if it doesn\'t load',
		},
		posterSizes: {
			description: 'Dimensions of the YouTube video poster',
		},
	},
	component: YouTubeVideo,
	parameters: {
		docs: {
			description: {
				component: 'The YouTubeVideo component is a web interface element that provides user access to their account settings or personal preferences in the application.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof YouTubeVideo>;

const YouTubeVideoWithHooks = (props: Omit<Props, 'dictionary'>) => {
	const { t } = useTranslation('common');
	const dictionary = { playButton: t('youTubeVideo.button') };

	return (
		<YouTubeVideo
			{...props}
			dictionary={dictionary}
		/>
	);
}

export const Default: Story = {
	args: {
		className: 'max-w-[640px]',
		width: 640,
		height: 360,
		videoId: 'KLuTLF3x9sA',
		showControls: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
	render: (args) => (<YouTubeVideoWithHooks {...args} />),
};

export const StartTime: Story = {
	args: {
		className: 'max-w-[640px]',
		width: 640,
		height: 360,
		videoId: 'KLuTLF3x9sA',
		showControls: false,
		startTime: 50,
	},
	parameters: {
		docs: {
			description: {
				story: '',
			},
		},
	},
	render: (args) => (<YouTubeVideoWithHooks {...args} />),
};

export const ShowControls: Story = {
	args: {
		className: 'max-w-[640px]',
		width: 640,
		height: 360,
		videoId: 'KLuTLF3x9sA',
		showControls: true,
	},
	parameters: {
		docs: {
			description: {
				story: '',
			},
		},
	},
	render: (args) => (<YouTubeVideoWithHooks {...args} />),
};

export const Muted: Story = {
	args: {
		className: 'max-w-[640px]',
		width: 640,
		height: 360,
		videoId: 'KLuTLF3x9sA',
		muted: true,
	},
	parameters: {
		docs: {
			description: {
				story: '',
			},
		},
	},
	render: (args) => (<YouTubeVideoWithHooks {...args} />),
};