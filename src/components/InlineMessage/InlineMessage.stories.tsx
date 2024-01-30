import type { Meta, StoryObj } from '@storybook/react';
import InlineMessage, { Props } from './InlineMessage';

type Appearance = Exclude<Props['appearance'], undefined>;
const appearance: Appearance[] = ['connectivity', 'confirmation', 'info', 'warning', 'error'];

type Variants = {
	left: Appearance[],
	right: Appearance[],
}
const variants: Variants = {
	left: appearance,
	right: appearance,
}

const meta: Meta<typeof InlineMessage> = {
	title: 'UI/InlineMessage',
	tags: ['autodocs'],
	argTypes: {
		appearance: {
			description: 'Appearance for InlineMessage',
		},
		className: {
			description: 'Additional classes for InlineMessage'
		},
		iconPosition: {
			description: 'The position of the icon relative to the text',
		},
		fieldId: {
			description: 'Id for linking input and messages for screen readers',
		},
		testId: {
			description: 'Id for testing the component',
		}
	},
	component: InlineMessage,
	parameters: {
		docs: {
			description: {
				component: 'An inline message informs users about important information or prompts them to take necessary action.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof InlineMessage>;

export const Default: Story = {
	args: {
		message: 'Default'
	},
	parameters: {
		docs: {
			description: {
				story: 'By default, inline messages contain an icon and the message text itself. The icon and the way it is positioned can be changed.',
			},
		},
	},
};

export const Positions: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the location of the icon relative to the text. By default, the icon is located on the left. 2 options are available left and right.',
			},
		},
	},
	render: () => (
		<div
			className='flex items-center'
		>
			<InlineMessage
				className='mr-3'
				fieldId='inline-message-1'
				message='Left Icon'
			/>
			<InlineMessage
				fieldId='inline-message-2'
				message='Right Icon'
				iconPosition='right'
			/>
		</div>
	)
};

export const Appearance: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the type of icon, its color and the color of the message. By default, this is "connectivity". There are 5 types of appearance in total: error, info, warning, connectivity, confirmation.',
			},
		},
	},
	render: () => (
		<div
			className='flex flex-wrap'
		>
			{appearance.map((variant) => (
				<InlineMessage
					className='mr-3 last:mr-0'
					key={variant}
					fieldId={variant}
					message={variant}
					appearance={variant}
				/>
			))}
		</div>
	)
};

export const All: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Here are all kinds of options for embedded messages, according to the location of icons and appearance',
			},
		},
	},
	render: () => (
		<div
			className='grid grid-cols-5 gap-x-3 gap-y-6'
		>
			{(Object.keys(variants) as Array<keyof typeof variants>).map((variant) => (
				variants[variant].map((appearance) => (
					<InlineMessage
						key={`${variant}-${appearance}`}
						fieldId={`${variant}-${appearance}`}
						message={appearance}
						iconPosition={variant}
						appearance={appearance}
					/>
				))
			))}
		</div>
	)
};