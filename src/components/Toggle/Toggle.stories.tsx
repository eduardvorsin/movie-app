import type { Meta, StoryObj } from '@storybook/react';
import Toggle, { Props } from './Toggle';
import { ChangeEventHandler, useState } from 'react';
import { action } from '@storybook/addon-actions';
import MoonIcon from '../../assets/icons/moon.svg';
import SunIcon from '../../assets/icons/sun.svg';

type Sizes = Exclude<Props['size'], undefined>;
type Appearances = Exclude<Props['appearance'], undefined>;
const sizes: Sizes[] = ['regular', 'large'];
const appearances: Appearances[] = ['primary', 'secondary', 'warning', 'danger', 'success'];

type Variant = {
	appearance: Exclude<Props['appearance'], undefined>,
	label: string,
	labelHidden?: Exclude<Props['labelHidden'], undefined>,
	isDisabled?: Exclude<Props['isDisabled'], undefined>,
	hasIcons?: boolean,
}
const all: Record<Sizes, Variant[]> = {
	regular: [
		{
			appearance: 'primary',
			label: 'regular primary',
		},
		{
			appearance: 'secondary',
			label: 'regular secondary',
		},
		{
			appearance: 'success',
			label: 'regular warning',
		},
		{
			appearance: 'warning',
			label: 'regular danger',
		},
		{
			appearance: 'danger',
			label: 'regular danger',
		},
		{
			appearance: 'primary',
			label: 'regular disabled',
			isDisabled: true,
		},
		{
			appearance: 'primary',
			label: 'regular with icons',
			hasIcons: true,
		},
		{
			appearance: 'primary',
			label: 'regular label hidden',
			labelHidden: true,
		},
	],
	large: [
		{
			appearance: 'primary',
			label: 'large primary',
		},
		{
			appearance: 'secondary',
			label: 'large secondary',
		},
		{
			appearance: 'success',
			label: 'large warning',
		},
		{
			appearance: 'warning',
			label: 'large danger',
		},
		{
			appearance: 'danger',
			label: 'large danger',
		},
		{
			appearance: 'primary',
			label: 'large disabled',
			isDisabled: true,
		},
		{
			appearance: 'success',
			label: 'large with icons',
			hasIcons: true,
		},
		{
			appearance: 'secondary',
			label: 'large label hidden',
			labelHidden: true,
		},
	],
};

const meta: Meta<typeof Toggle> = {
	title: 'components/Toggle',
	tags: ['autodocs'],
	argTypes: {
		appearance: {
			description: 'Appearance for the Toggle component',
		},
		className: {
			description: 'Additional classes for the Toggle component'
		},
		id: {
			description: 'Id for input'
		},
		label: {
			description: 'Text description for the input field'
		},
		name: {
			description: 'Name for the input'
		},
		value: {
			description: 'Value for the input'
		},
		isChecked: {
			description: 'Is the Toggle component in a checked or unchecked state'
		},
		onChange: {
			control: false,
			description: 'A callback that is triggered when switching the state of the component'
		},
		size: {
			description: 'Dimensions of the Toggle component'
		},
		uncheckedIcon: {
			control: false,
			description: 'The icon that will be displayed on the left in the Toggle component'
		},
		checkedIcon: {
			control: false,
			description: 'The icon that will be displayed on the right in the Toggle component'
		},
		onBlur: {
			control: false,
			description: 'A callback that is triggered when the input loses focus'
		},
		onFocus: {
			control: false,
			description: 'A callback that is triggered when an input receives a focus'
		},
		labelHidden: {
			description: 'Allows you to leave the label visible only for screen readers'
		},
		isDisabled: {
			description: 'Allows you to make the Toggle component inactive for user interaction'
		},
		defaultChecked: {
			description: 'Initial state of the input'
		},
		testId: {
			description: 'Id for testing the component',
		}
	},
	component: Toggle,
	parameters: {
		docs: {
			description: {
				component: 'Toggle is an interface element designed to switch between two states, usually on and off. It is used to manage options, settings, or functionality of applications and web services.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Toggle>;

const ToggleWithHooks = (props: Omit<Props, 'isChecked' | 'onChange'>) => {
	const [isChecked, setIsChecked] = useState<boolean>(props.defaultChecked ?? false);

	const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		setIsChecked((prevState) => !prevState);
		action('Changed')(e);
	};

	return (
		<Toggle
			{...props}
			isChecked={isChecked}
			onChange={changeHandler}
		/>
	);
}
export const Default: Story = {
	args: {
		label: 'default',
		id: 'default',
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
	render: (args) => (<ToggleWithHooks {...args} />),
};


export const Appearances: Story = {
	parameters: {
		docs: {
			description: {
				story: 'There are 5 values for the appearance property: primary, secondary, warning, success. Primary - for important actions. Secondary - for less important actions. Warning - to warn about potential risks. Danger - for reporting serious errors or irreversible actions. Success - to indicate successful actions',
			},
		},
	},
	render: () => (
		<div className='flex items-center gap-3 flex-wrap'>
			{appearances.map((appearance) => (
				<ToggleWithHooks
					key={appearance}
					id={appearance}
					label={appearance}
					value={appearance}
					name={appearance}
				/>
			))}
		</div>
	),
};


export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Size options for the Toggle component. There are 2 types of them in total these are regular and large',
			},
		},
	},
	render: () => (
		<div className='flex items-center'>
			{sizes.map((size) => (
				<ToggleWithHooks
					className='mr-2 last:mr-0'
					key={size}
					id={size}
					label={size}
					value={size}
					size={size}
					name={size}
				/>
			))}
		</div>
	),
};

export const WithIcons: Story = {
	args: {
		label: 'withIcons',
		appearance: 'secondary',
		checkedIcon: <MoonIcon />,
		uncheckedIcon: <SunIcon />,
	},
	parameters: {
		docs: {
			description: {
				story: 'You can add icons inside the Toggle component to indicate the checked and unchecked state',
			},
		},
	},
	render: (args) => (<ToggleWithHooks {...args} />),
};

export const LabelHidden: Story = {
	args: {
		label: 'label hidden',
		appearance: 'secondary',
		labelHidden: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'The label becomes visible only to screen readers',
			},
		},
	},
	render: (args) => (<ToggleWithHooks {...args} />),
};

export const Disabled: Story = {
	args: {
		label: 'disabled',
		appearance: 'primary',
		isDisabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Makes the Toggle component inactive for interaction. Useful when you need to temporarily restrict user actions to prevent accidental changes, for example when sending',
			},
		},
	},
	render: (args) => (<ToggleWithHooks {...args} />),
};

export const EventCallbacks: Story = {
	argTypes: {
		onFocus: {
			action: 'Focused',
		},
		onBlur: {
			action: 'Blured',
		},
	},
	args: {
		label: 'event callbacks',
		appearance: 'primary',
	},
	parameters: {
		docs: {
			description: {
				story: 'Callbacks are called when the state of the component changes, when the focus is received and lost',
			},
		},
	},
	render: (args) => (<ToggleWithHooks {...args} />),
};

export const All: Story = {
	parameters: {
		docs: {
			description: {
				story: '',
			},
		},
	},
	render: () => (
		<div className='flex items-start flex-wrap'>
			{(Object.keys(all) as Array<keyof typeof all>).map((size) => (
				<div
					key={size}
					className='flex flex-col items-end justify-start mr-6 last:mr-0'
				>
					{all[size].map((variant) => (
						<ToggleWithHooks
							className='mb-4 last:mb-0'
							key={`${size}-${variant.appearance}`}
							id={variant.label}
							name={variant.label}
							label={variant.label}
							value={variant.label}
							appearance={variant.appearance}
							size={size}
							isDisabled={variant.isDisabled}
							labelHidden={variant.labelHidden}
							checkedIcon={variant.hasIcons ? <MoonIcon></MoonIcon> : undefined}
							uncheckedIcon={variant.hasIcons ? <SunIcon></SunIcon> : undefined}
						/>
					))}
				</div>
			))}
		</div>
	),
};
