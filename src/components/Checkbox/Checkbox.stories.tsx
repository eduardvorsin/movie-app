import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox, { Props } from './Checkbox';
import { ChangeEventHandler, useState } from 'react';

type Sizes = Exclude<Props['size'], undefined>;
type Variant = {
	id: string,
	isDisabled?: Props['isDisabled'],
	isRequired?: Props['isRequired'],
	isInvalid?: Props['isInvalid'],
	error?: Props['error'],
};

const sizes: Sizes[] = ['small', 'medium', 'large', 'xlarge'];
const variants: Variant[] = [
	{
		id: '0',
		isDisabled: true,
	},
	{
		id: '1',
		isInvalid: true,
	},
	{
		id: '2',
		isRequired: true,
	},
	{
		id: '3',
		error: 'error message',
	},
];

const meta: Meta<typeof Checkbox> = {
	title: 'components/Checkbox',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the Checkbox'
		},
		testId: {
			description: 'Id for testing the component',
		},
		label: {
			description: 'Text description for the input field',
		},
		value: {
			description: 'Input value',
		},
		name: {
			description: 'Name for the input',
		},
		error: {
			description: 'Error Message',
		},
		id: {
			description: 'Input id',
		},
		isChecked: {
			description: 'Determines whether the checkbox is marked or not',
		},
		size: {
			description: 'Allows you to set the sizes of the checkbox',
		},
		isDisabled: {
			description: 'Disabling input makes it non-functional',
		},
		isInvalid: {
			description: 'Visually highlights the input in red when incorrectly entered data',
		},
		isRequired: {
			description: 'Makes input mandatory and adds a red asterisk at the end of the label',
		},
		onFocus: {
			description: 'The callback is executed when the focus hits the input',
			control: false,
		},
		onBlur: {
			description: 'The callback is executed when the input loses focus',
			control: false,
		},
		onChange: {
			description: 'The callback is executed when the input value changes',
			control: false,
		},
	},
	component: Checkbox,
	parameters: {
		docs: {
			description: {
				component: 'Checkboxes provide individuals with a means to choose one or multiple items from a set, or toggle between two options that are mutually exclusive (either selected or unselected).',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Checkbox>;

const CheckboxWithHooks = (props: Omit<Props, 'onChange' | 'isChecked'>) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		setIsChecked(e.currentTarget.checked);
		action('Changed')(e);
	}

	return (
		<Checkbox
			{...props}
			isChecked={isChecked}
			onChange={changeHandler}
		/>
	)
};

export const Default: Story = {
	args: {
		id: 'default',
		name: 'default',
		label: 'default',
		value: 'default',
	},
	parameters: {
		docs: {
			description: {
				story: 'Utilize a CheckboxInput to enable users to make a variety of selections, including the option to choose zero, one, or multiple items.',
			},
		},
	},
	render: (args) => (<CheckboxWithHooks {...args} />),
};

export const Disabled: Story = {
	args: {
		id: 'disabled',
		name: 'disabled',
		label: 'disabled',
		value: 'disabled',
		isDisabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Implement this for actions that are presently inaccessible. The user interface should clearly communicate why the input is inactive and provide guidance on the necessary steps to activate it.',
			},
		},
	},
	render: (args) => (<CheckboxWithHooks {...args} />),
};

export const Required: Story = {
	args: {
		id: 'required',
		name: 'required',
		label: 'required',
		value: 'required',
		isRequired: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'This is employed to signify that the input must be completed or filled out.',
			},
		},
	},
	render: (args) => (<CheckboxWithHooks {...args} />),
};

export const Invalid: Story = {
	args: {
		id: 'invalid',
		name: 'invalid',
		label: 'invalid',
		value: 'invalid',
		isInvalid: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'It is utilized to visually emphasize the input by turning it red when it fails validation.',
			},
		},
	},
	render: (args) => (<CheckboxWithHooks {...args} />),
};

export const Error: Story = {
	args: {
		id: 'error',
		name: 'error',
		label: 'error',
		value: 'error',
		error: 'error message',
	},
	parameters: {
		docs: {
			description: {
				story: 'Shows an error message beneath the input field.',
			},
		},
	},
	render: (args) => (<CheckboxWithHooks {...args} />),
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
		name: 'event-callbacks',
		id: 'event-callbacks',
		value: 'event-callbacks',
		label: 'focus, blur event',
	},
	parameters: {
		docs: {
			description: {
				story: 'The callback function can be provided to the onFocus, onBlur event.',
			},
		},
	},
	render: (args) => (<CheckboxWithHooks {...args} />)
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Shows an error message beneath the input field.',
			},
		},
	},
	render: () => (
		<div className='flex items-center'>
			{sizes.map((size) => (
				<CheckboxWithHooks
					value={size}
					key={size}
					className='mr-4 last:mr-4'
					id={size}
					name={size}
					label={size}
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
			className='grid gap-x-4 gap-y-6 grid-cols-[repeat(4,_minmax(0,_150px))]'
		>
			{sizes.map((size) => (
				variants.map((variant) => (
					<CheckboxWithHooks
						key={`${size}-${variant.id}`}
						id={`${size}-${variant.id}`}
						name={`${size}-${variant.id}`}
						label={`${size}-${variant.id}`}
						value={`${size}-${variant.id}`}
						size={size}
						isDisabled={variant.isDisabled}
						isInvalid={variant.isInvalid}
						isRequired={variant.isRequired}
						error={variant.error}
					/>
				))))}
		</div>
	),
};