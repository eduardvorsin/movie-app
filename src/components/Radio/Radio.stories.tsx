import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import Radio, { Props } from './Radio';
import { ChangeEvent, useState } from 'react';
import Button from '@/components/Button/Button';

const meta: Meta<typeof Radio> = {
	title: 'UI/Radio',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for radio buttons'
		},
		testId: {
			description: 'Id for testing the component',
		},
		label: {
			description: 'Text description for the input',
		},
		value: {
			description: 'Value for the radio button',
		},
		name: {
			description: 'Name for the input',
		},
		id: {
			description: 'Radio button id',
		},
		isChecked: {
			description: 'Determines whether the radio button is marked or not',
		},
		isDisabled: {
			description: 'Disabling the radio button makes it non-functional',
		},
		isInvalid: {
			description: 'Visually highlights the radio button if it does not pass validation',
		},
		isRequired: {
			description: 'Marks the radio button as mandatory',
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
			description: 'A callback is called when the radio button changes state from marked to unmarked and vice versa',
			control: false,
		},
	},
	component: Radio,
	parameters: {
		docs: {
			description: {
				component: 'A Radio is an individual element within a RadioGroup. It\'s highly advised to utilize Radio elements within a RadioGroup for proper functionality. Nonetheless, you can also use them independently: if multiple Radio items share the same name attribute, they will be considered as belonging to the same group.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Radio>;

const RadioWithHooks = (props: Omit<Props, 'onChange' | 'isChecked'>) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const setChecked = (e: ChangeEvent<HTMLInputElement>): void => {
		setIsChecked(true);
		action('Changed')(e);
	};

	const clearChecked = (): void => setIsChecked(false);

	return (
		<div className='flex flex-col items-start'>
			<Radio
				{...props}
				isChecked={isChecked}
				onChange={setChecked}
			/>

			<Button
				className='mt-4'
				onClick={clearChecked}
			>
				Clear
			</Button>
		</div>
	)
};

export const Default: Story = {
	args: {
		id: 'option',
		name: 'option',
		label: 'option',
		value: 'value',
	},
	parameters: {
		docs: {
			description: {
				story: 'Default state of the radio button',
			},
		},
	},
	render: (args) => (<RadioWithHooks {...args} />),
};

export const Disabled: Story = {
	args: {
		id: 'disabled',
		name: 'disabled',
		label: 'disabled',
		value: 'value',
		isDisabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Implement this for actions that are presently inaccessible. The user interface should clearly communicate why the input is inactive and provide guidance on the necessary steps to activate it.',
			},
		},
	},
	render: (args) => (<RadioWithHooks {...args} />),
};

export const Invalid: Story = {
	args: {
		id: 'invalid',
		name: 'invalid',
		label: 'invalid',
		value: 'value',
		isInvalid: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'It is utilized to visually emphasize the input by turning it red when it fails validation.',
			},
		},
	},
	render: (args) => (<RadioWithHooks {...args} />),
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
		id: 'event-callbacks',
		name: 'event-callbacks',
		label: 'focus, blur event',
		value: 'value',
	},
	parameters: {
		docs: {
			description: {
				story: 'The callback function can be provided to the onFocus, onBlur event.',
			},
		},
	},
	render: (args) => (<RadioWithHooks {...args} />),
};