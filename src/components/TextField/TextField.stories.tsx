import { Meta, StoryObj } from "@storybook/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import TextField, { Props } from "./TextField";
import { ChangeEventHandler, useState } from "react";

const meta: Meta<typeof TextField> = {
	title: 'components/TextField',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the TextField'
		},
		testId: {
			description: 'Id for testing the component',
		},
		label: {
			description: 'Text description for the input field',
		},
		onClear: {
			control: false,
			description: 'The callback is performed by pressing the clear button'
		},
		isDisabled: {
			description: 'Disabling input makes it non-functional',
		},
		isInvalid: {
			description: 'Visually highlights the input in red when incorrectly entered data',
		},
		isReadOnly: {
			description: 'Makes the input read-only',
		},
		isRequired: {
			description: 'Makes input mandatory and adds a red asterisk at the end of the label',
		},
		name: {
			description: 'Name for the input',
		},
		placeholder: {
			description: 'The filling text that is displayed when the input is empty',
		},
		onChange: {
			description: 'The callback is executed when the input value changes',
			control: false,
		},
		value: {
			description: 'Input value',
		},
		labelHidden: {
			description: 'Makes the label visible only to screen readers',
		},
		clearButton: {
			description: 'Allows you to show or hide the input value clearing button',
		},
		error: {
			description: 'Error Message',
		},
		id: {
			description: 'Component id',
		},
		autoComplete: {
			description: 'Allows you to set the type of autofill',
		},
		pattern: {
			description: 'Allows you to set a regular expression pattern for validation',
		},
		maxLength: {
			description: 'Allows you to set the maximum length of the value',
		},
		minLength: {
			description: 'Allows you to set the minimum length of the value',
		},
		onFocus: {
			description: 'The callback is executed when the focus hits the input',
			control: false,
		},
		onBlur: {
			description: 'The callback is executed when the input loses focus',
			control: false,
		},
		inputMode: {
			description: 'Allows you to set the keyboard type on mobile devices when entering a value',
		},
		type: {
			description: 'Input type',
		}
	},
	component: TextField,
	parameters: {
		docs: {
			description: {
				component: 'The input component is used to receive data or information from the user and then transmit it.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof TextField>;

const TextFieldWithHooks = (props: Omit<Props, 'onChange' | 'value'>) => {
	const [value, setValue] = useState<string>('');

	const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.currentTarget.value);
		action('Changed')(e);
	}

	const clearHandler = () => {
		if (props.onClear) props.onClear();
		setValue('');
	}

	return (
		<TextField
			{...props}
			value={value}
			onClear={clearHandler}
			onChange={changeHandler}
		/>
	)
};

export const Default: Story = {
	args: {
		label: 'Default',
		name: 'Default',
		id: 'Default',
	},
	parameters: {
		docs: {
			description: {
				story: 'Default state of the input',
			},
		},
	},
	render: (args) => (<TextFieldWithHooks {...args} />),
};

export const Disabled: Story = {
	args: {
		label: 'Disabled',
		name: 'Disabled',
		id: 'Disabled',
		isDisabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Apply this to actions that are currently unavailable. The user interface should effectively convey why the input is not active and what steps are needed to activate it.',
			},
		},
	},
	render: (args) => (<TextFieldWithHooks {...args} />)
};

export const Invalid: Story = {
	args: {
		label: 'Invalid',
		name: 'Invalid',
		id: 'Invalid',
		isInvalid: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'It is used to visually highlight the input in red when it does not pass validation.',
			},
		},
	},
	render: (args) => (<TextFieldWithHooks {...args} />)
};

export const Required: Story = {
	args: {
		label: 'Required',
		name: 'Required',
		id: 'Required',
		isRequired: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'It is used to indicate the input must be filled in.',
			},
		},
	},
	render: (args) => (<TextFieldWithHooks {...args} />)
};

export const Placeholder: Story = {
	args: {
		label: 'Placeholder',
		name: 'Placeholder',
		id: 'Placeholder',
		placeholder: 'Placeholder',
	},
	parameters: {
		docs: {
			description: {
				story: 'Used to show an example of a value that can be entered into an input',
			},
		},
	},
	render: (args) => (<TextFieldWithHooks {...args} />)
};

export const ClearButton: Story = {
	args: {
		label: 'ClearButton',
		name: 'ClearButton',
		id: 'ClearButton',
		clearButton: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Shows a button when clicked on which the contents of the input are cleared',
			},
		},
	},
	render: (args) => (<TextFieldWithHooks {...args} />)
};

export const EventCallbacks: Story = {
	argTypes: {
		onClear: {
			action: 'Cleared',
		},
		onFocus: {
			action: 'Focused',
		},
		onBlur: {
			action: 'Blured',
		},
	},
	args: {
		name: 'event callbacks',
		id: 'event callbacks',
		label: 'clear, focus, blur event',
		clearButton: true,
		value: '',
	},
	parameters: {
		docs: {
			description: {
				story: 'The callback function can be provided to the onFocus, onBlur event and when the clear button is clicked',
			},
		},
	},
	render: (args) => (<TextFieldWithHooks {...args} />)
};

export const LabelHidden: Story = {
	args: {
		label: 'LabelHidden',
		name: 'LabelHidden',
		id: 'LabelHidden',
		labelHidden: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Makes the label visible only to screen readers',
			},
		},
	},
	render: (args) => (<TextFieldWithHooks {...args} />)
};

export const Error: Story = {
	args: {
		label: 'Error',
		name: 'Error',
		id: 'Error',
		error: 'error messsage',
	},
	parameters: {
		docs: {
			description: {
				story: 'Displays an error message under the input',
			},
		},
	},
	render: (args) => (<TextFieldWithHooks {...args} />)
};

type Variant = {
	label: Props['label']
	isDisabled?: boolean,
	isInvalid?: boolean,
	isReadOnly?: boolean,
	isRequired?: boolean,
	labelHidden?: boolean,
	clearButton?: boolean,
	error?: Props['error'],
	placeholder?: Props['placeholder'],
}

const variants: Variant[] = [
	{
		label: 'disabled',
		isDisabled: true,
	},
	{
		label: 'invalid',
		isInvalid: true,
	},
	{
		label: 'read only',
		isReadOnly: true,
	},
	{
		label: 'required',
		isRequired: true,
	},
	{
		label: 'label hidden',
		labelHidden: true,
	},
	{
		label: 'clear button',
		clearButton: true,
	},
	{
		label: 'error',
		error: 'error',
	},
	{
		label: 'placeholder',
		placeholder: 'placeholder',
	},
]

export const All: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Here are all possible variants of inputs.',
			},
		},
	},
	render: () => (
		<div
			className='grid gap-8 grid-cols-4 grid-rows-2'
		>
			{variants.map((variant) => (
				<TextFieldWithHooks
					key={variant.label}
					id={variant.label}
					name={variant.label}
					label={variant.label}
					isDisabled={variant.isDisabled}
					isInvalid={variant.isInvalid}
					isReadOnly={variant.isReadOnly}
					isRequired={variant.isRequired}
					labelHidden={variant.labelHidden}
					clearButton={variant.clearButton}
					error={variant.error}
					placeholder={variant.placeholder}
				/>
			))}
		</div>
	),
};