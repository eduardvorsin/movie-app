import type { Meta, StoryObj } from '@storybook/react';
import Badge, { Props } from './Badge';

const appearances: NonNullable<Props['appearance']>[] = ['default', 'info', 'success', 'warning', 'danger'];

const meta: Meta<typeof Badge> = {
	title: 'UI/Badge',
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
		children: 'default'
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
};

export const Appearances: Story = {
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
				story: 'Here are all possible variants of badges by color. Type "danger" used for highlighting situations with significant risks or negative. Type "warning" indicates objects or actions requiring special attention or posing potential risks. Type "success" explicitly communicates the successful completion of actions, tasks, or positive results. Type "info" sends important or contextual messages to the user. Type "default" displays objects, actions, or states that don\'t need special attention or lack explicit status.',
			},
		},
	},
};