import type { Meta, StoryObj } from '@storybook/react';
import Avatar, { Props } from './Avatar';
import AvatarPicture from '../../assets/avatar-example.jpg';

type Statuses = Exclude<Props['status'], undefined>;
type Sizes = Exclude<Props['size'], undefined>;
type Presences = Exclude<Props['presence'], undefined>;
type Appearances = Exclude<Props['appearance'], undefined>;

type Variant = {
	id: number,
	appearance?: Appearances,
	isDisabled?: Props['isDisabled'],
	initials?: Props['initials'],
	presence?: Presences,
	status?: Statuses,
	src?: Props['src'],
};

const appearances: Appearances[] = ['circle', 'square'];
const statuses: Statuses[] = ['approved', 'declined', 'locked'];
const sizes: Sizes[] = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'];
const presences: Presences[] = ['offline', 'online'];
const variants: Variant[] = [
	{
		id: 0,
		appearance: 'circle'
	},
	{
		id: 1,
		appearance: 'square'
	},
	{
		id: 2,
		src: AvatarPicture.src
	},
	{
		id: 3,
		initials: 'AS'
	},
	{
		id: 4,
		isDisabled: true
	},
	{
		id: 5,
		status: 'approved'
	},
	{
		id: 6,
		status: 'declined'
	},
	{
		id: 7,
		status: 'locked'
	},
	{
		id: 8,
		presence: 'offline'
	},
	{
		id: 9,
		presence: 'online'
	},
];

const meta: Meta<typeof Avatar> = {
	title: 'components/Avatar',
	tags: ['autodocs'],
	argTypes: {
		appearance: {
			description: 'Appearance for Avatar',
		},
		className: {
			description: 'Additional classes for Avatar'
		},
		label: {
			description: 'Text description for screen readers',
		},
		onClick: {
			control: false,
			description: 'The callback is performed by clicking on the avatar'
		},
		size: {
			description: 'Disabling an avatar makes it non-functional',
		},
		initials: {
			description: 'Initials that are displayed if there is no picture or icon of the user',
		},
		src: {
			description: 'Image url',
		},
		presence: {
			description: 'Indicates whether the user is online or offline',
		},
		status: {
			description: 'Displays the user\'s status',
		},
		isDisabled: {
			description: 'Disabling an avatar makes it non-functional',
		},
		testId: {
			description: 'Id for testing the component',
		},
		imgProps: {
			description: 'Props for next image',
		}
	},
	component: Avatar,
	parameters: {
		docs: {
			description: {
				component: 'An Avatar serves as a visual depiction of a user, group, or entity. It has the capability to exhibit an image, icon, or initials, and is adaptable to different dimensions and forms.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
	args: {
		label: 'default',
	},
	parameters: {
		docs: {
			description: {
				story: 'Default state if initials or url for the image are not specified',
			},
		},
	},
};

export const Appearances: Story = {
	parameters: {
		docs: {
			description: {
				story: 'The appearance property allows you to set the shape for the avatar. The avatar can be of 2 shapes: round or square',
			},
		},
	},
	render: () => (
		<div
			className='flex items-start gap-3 flex-wrap'
		>
			{appearances.map((appearance) => (
				<Avatar
					key={appearance}
					label={`avatar appearance ${appearance} variant`}
					size='xlarge'
					appearance={appearance}
				/>
			))}
		</div>
	),
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Apply this to actions that are currently unavailable. The user interface should effectively convey why the avatar is inactive and what steps are needed to activate it.',
			},
		},
	},
};

export const Initials: Story = {
	args: {
		initials: 'AS',
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to show initials inside the avatar if the picture is not loaded',
			},
		},
	},
};

export const Image: Story = {
	args: {
		initials: 'AS',
		src: AvatarPicture.src,
		size: 'xxlarge',
	},
	parameters: {
		docs: {
			description: {
				story: 'Avatar with a picture',
			},
		},
	},
};

export const Statuses: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the user status. By default, the status is not displayed. There are 3 statuses in total: approved, declined, locked.',
			},
		},
	},
	render: () => (
		<div
			className='flex items-start'
		>
			{statuses.map((status, index) => (
				<Avatar
					className='mr-3 last:mr-3'
					key={status}
					label={`avatar status variant ${index + 1}`}
					size='xlarge'
					status={status}
				/>
			))}
		</div>
	),
};

export const Pressence: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the user\'s presence status. By default, the presence status is not displayed. There are 2 values available - offline and online.',
			},
		},
	},
	render: () => (
		<div
			className='flex items-start'
		>
			{presences.map((presence, index) => (
				<Avatar
					className='mr-3 last:mr-3'
					key={presence}
					label={`avatar presence variant ${index + 1}`}
					size='xlarge'
					presence={presence}
				/>
			))}
		</div>
	),
};

export const EventCallbacks: Story = {
	argTypes: {
		onClick: {
			action: 'Clicked',
		},
	},
	args: {
		label: 'click event'
	},
	parameters: {
		docs: {
			description: {
				story: 'Callback function can be supplied to onClick event',
			},
		},
	},
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the size of the avatar. The average size is set by default. There are 6 sizes in total with clearly defined width and height.',
			},
		},
	},
	render: () => (
		<div
			className='flex items-start'
		>
			{sizes.map((size, index) => (
				<Avatar
					className='mr-3 last:mr-3'
					key={size}
					label={`avatar size variant ${index + 1}`}
					size={size}
				/>
			))}
		</div>
	),
};

export const All: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Here are all possible variants of avatars, in size, statuses, states, shape, etc.',
			},
		},
	},
	render: () => (
		<div
			className='flex flex-col'
		>
			{sizes.map((size) => (
				<div
					key={size}
					className='flex flex-wrap items-start mb-6 last:mb-0'
				>
					{variants.map((variant) => (
						<Avatar
							className='mr-4 last:mr-0 mb-4 last:mb-0'
							appearance={variant.appearance}
							key={`${variant.id}-${size}`}
							isDisabled={variant.isDisabled}
							initials={variant.initials}
							src={variant.src}
							presence={variant.presence}
							status={variant.status}
							size={size}
							label={`avatar size ${variant} ${variant.id + 1}`}
						/>
					))}
				</div>
			))}
		</div>
	),
};

