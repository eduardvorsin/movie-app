import type { Meta, StoryObj } from '@storybook/react';
import RadioGroup, { Choice, Props } from './RadioGroup';
import { ChangeEventHandler, useId, useState } from 'react';

const choices: Choice[] = [
	{
		value: 'apple',
		label: 'apple',
		id: 'apple',
	},
	{
		value: 'orange',
		label: 'orange',
		id: 'orange',
	},
	{
		value: 'banana',
		label: 'banana',
		id: 'banana',
	},
	{
		value: 'pear',
		label: 'pear',
		id: 'pear',
	},
];

const meta: Meta<typeof RadioGroup> = {
	title: 'components/RadioGroup',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional buttons for a group of radio buttons'
		},
		title: {
			description: 'The group title that will be displayed before all radio buttons',
		},
		titleHidden: {
			description: 'Show or hide the group title',
		},
		error: {
			description: 'Shows an error message with the passed text',
		},
		choices: {
			control: false,
			description: 'Array of options for creating radio buttons',
		},
		testId: {
			description: 'Id for testing the component',
		},
		value: {
			control: false,
			description: 'The value of the selected radio button',
		},
		name: {
			description: 'Name for linking radio buttons to a group',
		},
		id: {
			description: 'id for the radio button group',
		},
		isDisabled: {
			description: 'Allows you to make all radio buttons in the group inactive',
		},
		isInvalid: {
			description: 'Visually highlights all radio buttons if the group does not pass validation',
		},
		isRequired: {
			description: 'Adds a * sign to the label indicating that the group of radio buttons is mandatory',
		},
		onChange: {
			description: 'The callback that is called when the marked radio button changes',
			control: false,
		},
	},
	component: RadioGroup,
	parameters: {
		docs: {
			description: {
				component: 'RadioGroup allows individuals to choose a single option from a set of two or more Radio items. Utilize RadioGroup when there is sufficient space to display all the available options. If you have more than five choices, it may be advisable to opt for an alternative component, like a Dropdown, for a better user experience.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const RadioGroupWithHooks = (props: Omit<Props, 'choices' | 'onChange' | 'value'>) => {
	const [value, setValue] = useState<string>(choices[0].value);

	const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.currentTarget.value);
	};

	const id = useId();

	return (
		<RadioGroup
			{...props}
			name={`${props.name}-${id}`}
			id={`${props.id}-${id}`}
			choices={choices}
			value={value}
			onChange={changeHandler}
		/>
	)
};

export const Default: Story = {
	args: {
		id: 'default-radio-group',
		name: 'default-radio-group',
		title: 'Favorite Fruit',
	},
	parameters: {
		docs: {
			description: {
				story: 'Default state of RadioGroup',
			},
		},
	},
	render: (args) => (<RadioGroupWithHooks {...args} />),
};

export const TitleHidden: Story = {
	args: {
		id: 'title-hidden-radio-group',
		name: 'title-hidden-radio-group',
		title: 'Favorite Fruit',
		titleHidden: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Hides the title displayed above the radio group',
			},
		},
	},
	render: (args) => (<RadioGroupWithHooks {...args} />),
};

export const Disabled: Story = {
	args: {
		id: 'disabled-radio-group',
		name: 'disabled-radio-group',
		title: 'Favorite Fruit',
		isDisabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Makes the entire group of radio buttons inactive, it may be useful if the user does not change his choice accidentally when sending data',
			},
		},
	},
	render: (args) => (<RadioGroupWithHooks {...args} />),
};

export const Required: Story = {
	args: {
		id: 'required-radio-group',
		name: 'required-radio-group',
		title: 'Favorite Fruit',
		isRequired: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Makes a group of radio buttons mandatory',
			},
		},
	},
	render: (args) => (<RadioGroupWithHooks {...args} />),
};

export const Invalid: Story = {
	args: {
		id: 'invalid-radio-group',
		name: 'invalid-radio-group',
		title: 'Favorite Fruit',
		isInvalid: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Visually highlights radio buttons, if they have not passed validation',
			},
		},
	},
	render: (args) => (<RadioGroupWithHooks {...args} />),
};

export const Error: Story = {
	args: {
		id: 'error-radio-group',
		name: 'error-radio-group',
		title: 'Favorite Fruit',
		error: 'Error',
	},
	parameters: {
		docs: {
			description: {
				story: 'Displays an error message for the entire group of radio buttons',
			},
		},
	},
	render: (args) => (<RadioGroupWithHooks {...args} />),
};
