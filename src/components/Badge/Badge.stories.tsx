import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
	title: 'components/Badge',
	tags: ['autodocs'],
	argTypes: {
		appearance: {
			description: 'Appearance for badge',
		},
		className: {
			description: 'Additional classes for badge'
		},
		children: {
			description: 'Badge Contents',
		},
		testId: {
			description: 'Id for testing the component',
		}
	},
	component: Badge,
	parameters: {
		docs: {
			description: {
				component: 'Badges are employed to exhibit the condition of an object or the outcome of a completed action.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
	args: {
		appearance: 'default',
		children: 'Default'
	},
	parameters: {
		docs: {
			description: {
				story: 'It is used to display objects, actions, or states that do not require special attention or do not have an explicit status',
			},
		},
	},
};

export const Info: Story = {
	args: {
		appearance: 'info',
		children: 'Info'
	},
	parameters: {
		docs: {
			description: {
				story: 'Used to send important or contextual messages to the user',
			},
		},
	},
};

export const Sucsess: Story = {
	args: {
		appearance: 'sucsess',
		children: 'Sucsess'
	},
	parameters: {
		docs: {
			description: {
				story: 'it is used to explicitly indicate successfully completed actions, completed tasks, or positive results',
			},
		},
	},
};

export const Warning: Story = {
	args: {
		appearance: 'warning',
		children: 'Warning'
	},
	parameters: {
		docs: {
			description: {
				story: 'It is used to highlight an object, action, or situation that requires special attention or may cause some risks',
			},
		},
	},
};

export const Danger: Story = {
	args: {
		appearance: 'danger',
		children: 'Danger'
	},
	parameters: {
		docs: {
			description: {
				story: 'It is used to explicitly designate situations, objects, or actions that pose a significant risk or negative consequences',
			},
		},
	},
};

const appearances = ['default', 'info', 'sucsess', 'warning', 'danger'] as const;

export const All: Story = {
	render: () => {
		return (
			<div
				className='flex flex-wrap items-start'
			>
				{appearances.map((appearance) => (
					<Badge
						className='mr-3 last:mr-0 mb-3 last:mb-0'
						key={appearance}
						appearance={appearance}
					>
						{`${appearance[0].toUpperCase()}${appearance.slice(1)}`}
					</Badge>
				))}
			</div>
		)
	},
	parameters: {
		docs: {
			description: {
				story: 'Here are all possible variants of badges by color',
			},
		},
	},
};