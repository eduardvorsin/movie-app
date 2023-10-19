import type { Meta, StoryObj } from '@storybook/react';
import CommentInfoItem from './CommentInfoItem';

const meta: Meta<typeof CommentInfoItem> = {
	title: 'components/CommentInfoItem',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes of the CommentInfoItem component'
		},
		children: {
			description: 'CommentInfoItem contents',
		},
		onFocus: {
			control: false,
			description: 'The callback is executed when the component gets focus'
		},
		onClick: {
			control: false,
			description: 'The callback is performed when the component is pressed'
		},
		type: {
			description: 'The type of element, there are 2 options available in total: author and time'
		},
		href: {
			description: 'Url for the link that will be clicked on'
		},
		testId: {
			description: 'Id for testing the component',
		}
	},
	component: CommentInfoItem,
	parameters: {
		docs: {
			description: {
				component: 'It is a component that allows you to add a block with the author\'s name or the time of publication of the comment. It is part of the Comment component.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof CommentInfoItem>;

export const Default: Story = {
	args: {
		children: 'Default'
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
};

export const Type: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the block type. There are 2 types in total: author and time, which differ only in styling.',
			},
		},
	},
	render: () => (
		<div className='flex'>
			<CommentInfoItem
				className='mr-4 last:mr-0'
				type='author'
			>
				Author
			</CommentInfoItem>
			<CommentInfoItem
				className='mr-4 last:mr-0'
				type='time'
			>
				Time
			</CommentInfoItem>
		</div>
	),
};

export const EventCallbacks: Story = {
	argTypes: {
		onClick: {
			action: 'Clicked',
		},
		onFocus: {
			action: 'Focused',
		},
	},
	args: {
		children: 'click, focus, blur events',
		href: '/',
	},
	parameters: {
		docs: {
			description: {
				story: 'Callback functions can be supplied to onClick, onBlur, and onFocus events',
			},
		},
	},
};