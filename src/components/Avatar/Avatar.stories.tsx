import type { Meta, StoryObj } from '@storybook/react';
import Avatar, { Props } from './Avatar';
import AvatarPicture from '../../assets/avatar-example.jpg';

type Statuses = Exclude<Props['status'], undefined>;
type Sizes = Exclude<Props['size'], undefined>;
type Presences = Exclude<Props['presence'], undefined>;

type Variant = {
	id: number,
	appearance?: Props['appearance'],
	isDisabled?: Props['isDisabled'],
	initials?: Props['initials'],
	presence?: Presences,
	status?: Statuses,
	src?: Props['src'],
};

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

export const Circle: Story = {
	args: {
		appearance: 'circle',
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set a round shape for the avatar',
			},
		},
	},
};

export const Square: Story = {
	args: {
		appearance: 'square',
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set a square shape for the avatar',
			},
		},
	},
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
				story: 'Allows you to set the size of the avatar. Medium is set by default. There are 7 sizes in total, 6 sizes with an explicit width and height, and the 7th custom option in which you need to set the sizes yourself through classes.',
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
			className='grid gap-y-6 items-start'
		>
			{sizes.map((size) => (
				<div className='flex flex-wrap items-start'>
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