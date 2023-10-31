import type { Meta, StoryObj } from '@storybook/react';
import Comment from './Comment';
import Avatar from '@/components/Avatar/Avatar';
import AvatarPicture from '../../assets/avatar-example.jpg';
import CommentAction from './CommentAction/CommentAction';

const meta: Meta<typeof Comment> = {
	title: 'components/Comment',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes of the Comment component'
		},
		id: {
			description: 'Id for the component',
		},
		avatar: {
			control: false,
			description: 'Allows you to pass the Avatar component',
		},
		children: {
			control: false,
			description: 'Allows you to pass another comment inside to create a nesting of several comments',
		},
		content: {
			description: 'Text content of the comment',
		},
		savingText: {
			description: 'The text that will be displayed when isSaving is true',
		},
		author: {
			description: 'Author\'s name',
		},
		time: {
			description: 'Time of publication of the comment',
		},
		isEdited: {
			description: 'Shows whether the comment is edited or not',
		},
		restrictedTo: {
			description: 'Shows a message about which group of people this comment is visible to',
		},
		actions: {
			control: false,
			description: 'Array of buttons with actions regarding the comment (like, repost)',
		},
		errorActions: {
			control: false,
			description: 'Array of buttons with error actions regarding the comment (resend, delete)',
		},
		type: {
			description: 'The type of comment. The text that will be displayed after the author\'s name',
		},
		afterContent: {
			control: false,
			description: 'The element that comes immediately after the comment content',
		},
		isError: {
			description: 'Displays the button action for, shows an error message and hides some blocks',
		},
		error: {
			description: 'The error text that appears when isError is true',
		},
		highlighted: {
			description: 'Allows you to visually highlight the background of a comment'
		},
		isSaving: {
			description: 'Allows you to set the save status at which the corresponding message will appear and the action buttons will disappear'
		},
		titleElement: {
			description: 'Allows you to set a title element for a comment'
		},
		shouldRenderNestedCommentsInline: {
			description: 'A property that allows you to determine how comments will be visually positioned nested inside each other or vertically in a column'
		},
		testId: {
			description: 'Id for testing the component',
		}
	},
	component: Comment,
	parameters: {
		docs: {
			description: {
				component: 'A comment presents conversations and input from users.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
	args: {
		id: 'default',
		author: 'Devin Nigel',
		content: 'Default comment with Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsa recusandae ratione, inventore eveniet magni earum consequatur labore hic harum facilis asperiores maxime! Cum, itaque!',
		type: 'author',
		avatar: (
			<Avatar
				label='John FLick'
				initials='JF'
				src={AvatarPicture.src}
				size='large'
			/>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
};

export const AfterContent: Story = {
	args: {
		id: 'after-content',
		author: 'Devin Nigel',
		content: 'After content comment with Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsa recusandae ratione, inventore eveniet magni earum consequatur labore hic harum facilis asperiores maxime! Cum, itaque!',
		afterContent: <em>After content</em>,
		type: 'author',
		avatar: (
			<Avatar
				label='John FLick'
				initials='JF'
				src={AvatarPicture.src}
				size='large'
			/>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'Sets the element that will go after the main content of the comment',
			},
		},
	},
};

export const Edited: Story = {
	args: {
		id: 'edited',
		author: 'Devin Nigel',
		content: 'Edited comment with Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsa recusandae ratione, inventore eveniet magni earum consequatur labore hic harum facilis asperiores maxime! Cum, itaque!',
		type: 'author',
		isEdited: true,
		avatar: (
			<Avatar
				label='John FLick'
				initials='JF'
				src={AvatarPicture.src}
				size='large'
			/>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'Indicates that the comment has already been edited by the author',
			},
		},
	},
};

export const RestrictedTo: Story = {
	args: {
		id: 'restricted-to',
		author: 'Devin Nigel',
		content: 'Restricted to comment with Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsa recusandae ratione, inventore eveniet magni earum consequatur labore hic harum facilis asperiores maxime! Cum, itaque!',
		restrictedTo: 'Admins only',
		type: 'author',
		avatar: (
			<Avatar
				label='John FLick'
				initials='JF'
				src={AvatarPicture.src}
				size='large'
			/>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'Displays additional text that describes who will see this comment',
			},
		},
	},
};

export const Saving: Story = {
	args: {
		id: 'saving',
		author: 'Devin Nigel',
		content: 'Saving comment with Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsa recusandae ratione, inventore eveniet magni earum consequatur labore hic harum facilis asperiores maxime! Cum, itaque!',
		type: 'author',
		isSaving: true,
		avatar: (
			<Avatar
				label='John FLick'
				initials='JF'
				src={AvatarPicture.src}
				size='large'
			/>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'Displays the save status of the comment, temporarily disabling the functionality of the buttons in the component',
			},
		},
	},
};

export const Time: Story = {
	args: {
		id: 'time',
		author: 'Devin Nigel',
		content: 'Time comment with Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsa recusandae ratione, inventore eveniet magni earum consequatur labore hic harum facilis asperiores maxime! Cum, itaque!',
		type: 'author',
		time: 'Sept 14, 2023',
		avatar: (
			<Avatar
				label='John FLick'
				initials='JF'
				src={AvatarPicture.src}
				size='large'
			/>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'Shows the time when the comment was created',
			},
		},
	},
};

export const Highlited: Story = {
	args: {
		id: 'highlited',
		author: 'Devin Nigel',
		content: 'Highlited comment with Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsa recusandae ratione, inventore eveniet magni earum consequatur labore hic harum facilis asperiores maxime! Cum, itaque!',
		highlighted: true,
		type: 'author',
		avatar: (
			<Avatar
				label='John FLick'
				initials='JF'
				src={AvatarPicture.src}
				size='large'
			/>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'Visually highlights the background of the comment',
			},
		},
	},
};

export const NestedComments: Story = {
	args: {
		id: 'highlited',
		author: 'Devin Nigel',
		content: 'Nested comment with Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsa recusandae ratione, inventore eveniet magni earum consequatur labore hic harum facilis asperiores maxime! Cum, itaque!',
		type: 'author',
		time: 'Sept 10, 2023',
		avatar: (
			<Avatar
				label='John FLick'
				initials='JF'
				src={AvatarPicture.src}
				size='large'
			/>
		),
		children: (
			<Comment
				titleElement='h3'
				id='nested-comment'
				author='Lorraine Braelyn'
				time='Sept 10, 2023'
				type='moderator'
				content='Children comment with Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsa recusandae ratione, inventore eveniet magni earum consequatur labore hic harum facilis asperiores maxime! Cum, itaque!'
				avatar={<Avatar label='Lorraine Braelyn' initials='LB' />}
			/>
		)
	},
	parameters: {
		docs: {
			description: {
				story: 'By default, child comments are displayed nested, you can also change their display by making them vertically in one column',
			},
		},
	},
};

export const Error: Story = {
	args: {
		id: 'error',
		author: 'Devin Nigel',
		content: 'Error comment with Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsa recusandae ratione, inventore eveniet magni earum consequatur labore hic harum facilis asperiores maxime! Cum, itaque!',
		type: 'author',
		isError: true,
		error: 'error message',
		errorActions: [
			<CommentAction key={1} onClick={() => { }}>Resend</CommentAction>,
			<CommentAction key={2} onClick={() => { }}>Remove</CommentAction>,
		],
		avatar: (
			<Avatar
				label='John FLick'
				initials='JF'
				src={AvatarPicture.src}
				size='large'
			/>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'Displays the error text, action buttons with specific actions to correct it',
			},
		},
	},
};

export const Actions: Story = {
	args: {
		id: 'actions',
		author: 'Devin Nigel',
		content: 'Actions comment with Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsa recusandae ratione, inventore eveniet magni earum consequatur labore hic harum facilis asperiores maxime! Cum, itaque!',
		type: 'author',
		actions: [
			<CommentAction key={1} onClick={() => { }}>Like</CommentAction>,
			<CommentAction key={2} onClick={() => { }}>Repost</CommentAction>,
		],
		avatar: (
			<Avatar
				label='John FLick'
				initials='JF'
				src={AvatarPicture.src}
				size='large'
			/>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'Shows action buttons with which you can implement the functionality of likes, reposts',
			},
		},
	},
};