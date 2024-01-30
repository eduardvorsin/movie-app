import type { Meta, StoryObj } from '@storybook/react';
import Button, { Props } from './Button';

type Sizes = Exclude<Props['size'], undefined>;
type Apperances = Exclude<Props['appearance'], undefined>;

const sizes: Sizes[] = ['micro', 'slim', 'medium', 'large'];
const apperances: Apperances[] = ['primary', 'secondary', 'warning', 'danger', 'success', 'discovery', 'ghost'];

type Variant = {
	appearance: Apperances,
	children: string,
	isLoading?: Exclude<Props['isLoading'], undefined>,
	isDisabled?: Exclude<Props['isDisabled'], undefined>,
	hasIcon?: boolean,
};

type AllVariants = Record<Sizes, Variant[]>;

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
};

const meta: Meta<typeof Button> = {
	title: 'UI/Button',
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
		children: {
			description: 'The button\'s contents',
		},
		size: {
			description: 'Sets the size of the button. You can choose 1 of 4 ready-made options',
		},
		iconButton: {
			description: 'Allows you to show a button without text, consisting only of an icon',
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

export const Apperances: Story = {
	parameters: {
		docs: {
			description: {
				story: 'You can set one of 7 appearance types: primary, secondary, warning, danger, success, discovery, ghost. Primary - indicates the most important action. Secondary - used for less important actions. Warning - informs about potential risks. Danger - warns about the irreversibility of actions. Success - reports a positive result. Discovery - indicates changes in the interface. Ghost - a button without a background color, used to perform additional actions',
			},
		},
	},
	render: () => (
		<div className='flex items-start gap-3 flex-wrap'>
			{apperances.map((appearance) => (
				<Button
					key={appearance}
					appearance={appearance}
					size='medium'
				>
					{`${appearance[0].toUpperCase()}${appearance.slice(1)}`}
				</Button>
			))}
		</div>
	),
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

export const IconButton: Story = {
	args: {
		iconButton: true,
		children: (
			<svg className='w-5 h-5 fill-current' viewBox='0 0 32 32'>
				<use href={'/assets/icons/external-link.svg#external-link'}></use>
			</svg>
		)
	},
	parameters: {
		docs: {
			description: {
				story: 'This type of button can be used to represent actions or operations available to the user, such as calling, moving to the trash, adding to favorites, etc.',
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
				story: 'Using the children prop, you can add icons to the component',
			},
		},
	},
	render: () => (
		<div
			className='flex gap-3 flex-wrap'
		>
			<Button>
				<svg className='w-3 h-3 mr-2 fill-current' viewBox='0 0 32 32'>
					<use href={'/assets/icons/external-link.svg#external-link'}></use>
				</svg>
				<span>Left side icon</span>
			</Button>

			<Button>
				<span>Right side icon</span>
				<svg className='w-3 h-3 ml-2 fill-current' viewBox='0 0 32 32'>
					<use href={'/assets/icons/external-link.svg#external-link'}></use>
				</svg>
			</Button>

			<Button>
				<svg className='w-3 h-3 mr-2 fill-current' viewBox='0 0 32 32'>
					<use href={'/assets/icons/external-link.svg#external-link'}></use>
				</svg>
				<span>Both side icons</span>
				<svg className='w-3 h-3 ml-2 fill-current' viewBox='0 0 32 32'>
					<use href={'/assets/icons/external-link.svg#external-link'}></use>
				</svg>
			</Button>
		</div>
	)
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the size of the button. The default size is medium. There are 4 sizes: micro, slim, medium, large.',
			},
		},
	},
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
};

export const All: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Here are all possible button options, in size, appearance and condition',
			},
		},
	},
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
								size={size}
								appearance={variant.appearance}
								isDisabled={variant.isDisabled}
								isLoading={variant.isLoading}
							>
								{variant.hasIcon && (
									<svg className='w-3 h-3 mr-2 fill-current' viewBox='0 0 32 32'>
										<use href={'/assets/icons/external-link.svg#external-link'}></use>
									</svg>
								)}
								{variant.children}
							</Button>
						))}
					</div>
				))}
			</div>
		)
	},
};

