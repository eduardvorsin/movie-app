import type { Meta, StoryObj } from '@storybook/react';
import Button, { Props } from './Button';
import Add from '../../assets/icons/add.svg';
import Minus from '../../assets/icons/minus.svg';

type Sizes = Exclude<Props['size'], 'custom' | undefined>;

const sizes: Sizes[] = ['micro', 'slim', 'medium', 'large'];

type Variant = {
	appearance: Exclude<Props['appearance'], undefined>,
	children: string,
	isLoading?: Exclude<Props['isLoading'], undefined>,
	isDisabled?: Exclude<Props['isDisabled'], undefined>,
	hasIcon?: boolean,
};

type AllVariants = Record<Sizes | 'fullWidth', Variant[]>;

const all: AllVariants = {
	micro: [
		{
			appearance: 'primary',
			children: 'micro primary',
			isLoading: false,
		},
		{
			appearance: 'secondary',
			children: 'micro secondary',
		},
		{
			appearance: 'warning',
			children: 'micro warning',
		},
		{
			appearance: 'danger',
			children: 'micro danger',
		},
		{
			appearance: 'success',
			children: 'micro success',
		},
		{
			appearance: 'discovery',
			children: 'micro discovery',
		},
		{
			appearance: 'ghost',
			children: 'micro ghost',
		},
		{
			appearance: 'primary',
			children: 'micro loading',
			isLoading: true,
		},
		{
			appearance: 'secondary',
			children: 'micro disabled',
			isDisabled: true,
		},
		{
			appearance: 'warning',
			children: 'micro icon',
			hasIcon: true,
		}
	],
	slim: [
		{
			appearance: 'primary',
			children: 'slim primary',
		}, {
			appearance: 'secondary',
			children: 'slim secondary',
		},
		{
			appearance: 'warning',
			children: 'slim warning',
		},
		{
			appearance: 'danger',
			children: 'slim danger',
		},
		{
			appearance: 'success',
			children: 'slim success',
		},
		{
			appearance: 'discovery',
			children: 'slim discovery',
		},
		{
			appearance: 'ghost',
			children: 'slim ghost',
		},
		{
			appearance: 'primary',
			children: 'slim loading',
			isLoading: true,
		},
		{
			appearance: 'secondary',
			children: 'slim disabled',
			isDisabled: true,
		},
		{
			appearance: 'warning',
			children: 'slim icon',
			hasIcon: true,
		}
	],
	medium: [
		{
			appearance: 'primary',
			children: 'medium primary',
		}, {
			appearance: 'secondary',
			children: 'medium secondary',
		},
		{
			appearance: 'warning',
			children: 'medium warning',
		},
		{
			appearance: 'danger',
			children: 'medium danger',
		},
		{
			appearance: 'success',
			children: 'medium success',
		},
		{
			appearance: 'discovery',
			children: 'medium discovery',
		},
		{
			appearance: 'ghost',
			children: 'medium ghost',
		},
		{
			appearance: 'primary',
			children: 'medium loading',
			isLoading: true,
		},
		{
			appearance: 'secondary',
			children: 'medium disabled',
			isDisabled: true,
		},
		{
			appearance: 'warning',
			children: 'medium icon',
			hasIcon: true,
		}
	],
	large: [
		{
			appearance: 'primary',
			children: 'large primary',
		}, {
			appearance: 'secondary',
			children: 'large secondary',
		},
		{
			appearance: 'warning',
			children: 'large warning',
		},
		{
			appearance: 'danger',
			children: 'large danger',
		},
		{
			appearance: 'success',
			children: 'large success',
		},
		{
			appearance: 'discovery',
			children: 'large discovery',
		},
		{
			appearance: 'ghost',
			children: 'large ghost',
		},
		{
			appearance: 'primary',
			children: 'large loading',
			isLoading: true,
		},
		{
			appearance: 'secondary',
			children: 'large disabled',
			isDisabled: true,
		},
		{
			appearance: 'warning',
			children: 'large icon',
			hasIcon: true,
		}
	],
	fullWidth: [
		{
			appearance: 'primary',
			children: 'full width primary',
		}, {
			appearance: 'secondary',
			children: 'full width secondary',
		},
		{
			appearance: 'warning',
			children: 'full width warning',
		},
		{
			appearance: 'danger',
			children: 'full width danger',
		},
		{
			appearance: 'success',
			children: 'full success',
		},
		{
			appearance: 'discovery',
			children: 'full discovery',
		},
		{
			appearance: 'ghost',
			children: 'full ghost',
		},
		{
			appearance: 'primary',
			children: 'full width loading',
			isLoading: true,
		},
		{
			appearance: 'secondary',
			children: 'full width disabled',
			isDisabled: true,
		},
		{
			appearance: 'warning',
			children: 'full width icon',
			hasIcon: true,
		}
	],
};

const meta: Meta<typeof Button> = {
	title: 'components/Button',
	tags: ['autodocs'],
	argTypes: {
		appearance: {
			description: 'Button appearance option',
		},
		className: {
			description: 'Additional classes for the button'
		},
		isDisabled: {
			description: 'Disabling the button makes it non-functional',
		},
		isLoading: {
			description: 'Substitutes the button text with a loading indicator and deactivates the button',
		},
		fullWidth: {
			description: 'The button spans the entire width of its parent container',
		},
		children: {
			description: 'The button\'s contents',
		},
		size: {
			description: 'Sets the size of the button. You can choose a ready-made or choose a custom option and set your own styles for the sizes.',
		},
		iconBefore: {
			description: 'The icon that will be placed before the content of the button',
		},
		iconAfter: {
			description: 'The icon that will be placed after the content of the button',
		},
		onBlur: {
			control: false,
			description: 'The callback is executed when the button loses focus'
		},
		onFocus: {
			control: false,
			description: 'The callback is executed when the button gets focus'
		},
		onClick: {
			control: false,
			description: 'The callback is performed when the button is pressed'
		},
		testId: {
			description: 'Id for testing the component',
		}
	},
	component: Button,
	parameters: {
		docs: {
			description: {
				component: 'Buttons serve as initiators for various actions. They find utility within forms, toolbars, modal dialogs, and even function as independent action triggers. These actions predominantly take place within the confines of the same page.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		appearance: 'primary',
		children: 'Primary'
	},
	parameters: {
		docs: {
			description: {
				story: 'Applies to buttons with the primary importance of the action',
			},
		},
	},
};

export const Secondary: Story = {
	args: {
		appearance: 'secondary',
		children: 'Secondary'
	},
	parameters: {
		docs: {
			description: {
				story: 'Used for buttons that perform a secondary action',
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
				story: 'It is used to warn about the potential risk of interaction',
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
				story: 'It is used to warn the user about the irrevocability of actions when clicking',
			},
		},
	},
};

export const Success: Story = {
	args: {
		appearance: 'success',
		children: 'Success'
	},
	parameters: {
		docs: {
			description: {
				story: 'It is usually used to indicate the successful completion of an action or operation.',
			},
		},
	},
};

export const Discovery: Story = {
	args: {
		appearance: 'discovery',
		children: 'Discovery'
	},
	parameters: {
		docs: {
			description: {
				story: 'It is employed to notify users about changes in the user interface or to offer details about newly introduced features and their execution.',
			},
		},
	},
};

export const Ghost: Story = {
	args: {
		appearance: 'ghost',
		children: 'Ghost'
	},
	parameters: {
		docs: {
			description: {
				story: 'Button view without background color. It can be used to indicate additional actions, menus or navigation, cancel or clear, etc.',
			},
		},
	},
};

export const Loading: Story = {
	args: {
		isLoading: true,
		children: 'Loading'
	},
	parameters: {
		docs: {
			description: {
				story: 'Enabling the isLoading property as true will substitute the button text with a loading indicator and deactivate the button to avoid unintended submissions. The button\'s width will remain consistent to prevent any content from shifting.',
			},
		},
	},
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
		children: 'Disabled'
	},
	parameters: {
		docs: {
			description: {
				story: 'Apply this for actions that are presently unavailable, like right after submitting a form. The user interface should effectively convey why the button is inactive and what steps are necessary to activate it.',
			},
		},
	},
};

export const FullWidth: Story = {
	args: {
		fullWidth: true,
		children: 'Full Width'
	},
	parameters: {
		docs: {
			description: {
				story: 'Use the fullWidth property to allow the button to expand to the full width of its container',
			},
		},
	},
};

export const ReactRouterLink: Story = {
	args: {
		children: 'Router Link',
		href: '/',
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to use the button as a link for routing',
			},
		},
	},
};

export const EventCallbacks: Story = {
	argTypes: {
		onClick: {
			action: 'Clicked',
		},
		onFocus: {
			action: 'Focused',
		},
		onBlur: {
			action: 'Blured',
		}
	},
	args: {
		fullWidth: true,
		children: 'click, focus, blur events'
	},
	parameters: {
		docs: {
			description: {
				story: 'Callback functions can be supplied to onClick, onBlur, and onFocus events',
			},
		},
	},
};

export const WithIcons: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Through the iconBefore and IconAfter properties, you can add icons to the button',
			},
		},
	},
	render: () => (
		<div
			className='flex items-start'
		>
			<Button
				className='mr-3'
				iconBefore={<Add />}
			>
				Left side icon
			</Button>
			<Button
				className='mr-3'
				iconAfter={<Minus />}
			>
				Right side icon
			</Button>
			<Button
				iconBefore={<Add />}
				iconAfter={<Minus />}
			>
				Both side icons
			</Button>
		</div>
	)
};

export const Sizes: Story = {
	render: () => (
		<div className='flex items-start'>
			{sizes.map((size) => (
				<Button
					className='mr-3 last:mr-0'
					key={size}
					size={size}
				>
					{`${size[0].toUpperCase()}${size.slice(1)}`}
				</Button>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the size of the button. The default size is medium. There are 5 sizes: micro, slim, medium, large, custom. The first 4 sizes have an explicit size and custom allows you to set your own sizes through css classes',
			},
		},
	},
};

export const All: Story = {
	render: () => {
		return (
			<div className='flex flex-col items-start'>
				{(Object.keys(all) as Array<keyof typeof all>).map((size) => (
					<div
						key={size}
						className='flex flex-wrap items-start last:self-stretch mb-6 last:mb-6'
					>
						{all[size].map((variant) => (
							<Button
								className='mr-3 last:mr-0 mb-3 last:mb-0'
								key={variant.children}
								size={size === 'fullWidth' ? 'medium' : size}
								appearance={variant.appearance}
								isDisabled={variant.isDisabled}
								isLoading={variant.isLoading}
								fullWidth={size === 'fullWidth'}
								iconBefore={variant.hasIcon ? <Add /> : undefined}
								iconAfter={variant.hasIcon ? <Minus /> : undefined}
							>
								{variant.children}
							</Button>
						))}
					</div>
				))}
			</div>
		)
	},
	parameters: {
		docs: {
			description: {
				story: 'Here are all possible button options, in size, appearance and condition',
			},
		},
	},
};

