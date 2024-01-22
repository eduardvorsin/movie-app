// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import NavigationMenuButton, { Props } from './NavigationMenuButton';
import { MouseEventHandler, useState } from 'react';

const meta: Meta<typeof NavigationMenuButton> = {
	title: 'components/NavigationMenuButton',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the NavigationMenuButton'
		},
		testId: {
			description: 'Id for testing the component',
		},
		isActive: {
			description: 'Toggles the active state of the button',
		},
		onClick: {
			description: 'The callback that is called when clicked',
		}
	},
	component: NavigationMenuButton,
	parameters: {
		docs: {
			description: {
				component: 'The button that is used on mobile devices to open the main navigation of the site',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof NavigationMenuButton>;

const NavigationMenuButtonWithHooks = (props: Omit<Props, 'isActive' | 'onClick'>) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
		setIsActive((prevState) => !prevState);
		action('Clicked')(e);
	};

	return (
		<NavigationMenuButton
			{...props}
			isActive={isActive}
			onClick={clickHandler}
		/>
	);
}

export const Default: Story = {
	args: {
		className: '',
		testId: '',
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
	render: (args) => <NavigationMenuButtonWithHooks {...args} />
};

export const Active: Story = {
	args: {
		isActive: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'The active state of the component',
			},
		},
	},
};

export const EventCallbacks: Story = {
	args: {
		className: '',
		testId: '',
	},
	parameters: {
		docs: {
			description: {
				story: 'When you click on the button, a callback is called',
			},
		},
	},
	render: (args) => <NavigationMenuButtonWithHooks {...args} />
};