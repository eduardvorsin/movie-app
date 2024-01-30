import { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import Search, { Props } from './Search';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof Search> = {
	title: 'components/Search',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the Search'
		},
		testId: {
			description: 'Id for testing the component',
		},
		label: {
			description: 'Text description for the input field',
		},
		isDisabled: {
			description: 'Disabling the input and the button makes it non-functional',
		},
		isInvalid: {
			description: 'Visually highlights the input in red when incorrectly entered data',
		},
		isReadOnly: {
			description: 'Makes the input read-only',
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
		onFocus: {
			description: 'The callback is executed when the focus hits the input',
			control: false,
		},
		onBlur: {
			description: 'The callback is executed when the input loses focus',
			control: false,
		},
		onSubmit: {
			description: 'The callback is executed when the search form is submitted',
			control: false,
		},
		value: {
			description: 'Input value',
		},
		labelHidden: {
			description: 'Makes the label visible only to screen readers',
		},
		error: {
			description: 'Error Message',
		},
		id: {
			description: 'Component id',
		}
	},
	component: Search,
	parameters: {
		docs: {
			description: {
				component: 'The search component with hints is an interactive element that helps users find information quickly and conveniently. As you enter a query into the search bar, the component offers automatically generated search suggestions based on previous queries or popular queries.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Search>;

const SearchWithHooks = (props: Omit<Props, 'onChange' | 'value' | 'dictionary'>) => {
	const [value, setValue] = useState<string>('');
	const { t } = useTranslation('common');
	const dictionary = { button: t('search.button') };

	const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.currentTarget.value);
		action('Changed')(e);
	}

	const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		if (props.onSubmit) props.onSubmit(e);
	}

	return (
		<Search
			{...props}
			dictionary={dictionary}
			className={`max-w-[13rem] ${props.className}`}
			value={value}
			onChange={changeHandler}
			onSubmit={submitHandler}
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
				story: 'Default state of the search input',
			},
		},
	},
	render: (args) => (<SearchWithHooks {...args} />),
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
	render: (args) => (<SearchWithHooks {...args} />)
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
	render: (args) => (<SearchWithHooks {...args} />)
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
	render: (args) => (<SearchWithHooks {...args} />)
};

export const EventCallbacks: Story = {
	argTypes: {
		onFocus: {
			action: 'Focused',
		},
		onBlur: {
			action: 'Blured',
		},
		onSubmit: {
			action: 'Submitted',
		},
	},
	args: {
		name: 'event callbacks',
		id: 'event callbacks',
		label: 'submit, focus, blur event',
		value: '',
	},
	parameters: {
		docs: {
			description: {
				story: 'The callback function can be provided to the onFocus, onBlur onSubmit event',
			},
		},
	},
	render: (args) => (<SearchWithHooks {...args} />)
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
	render: (args) => (<SearchWithHooks {...args} />)
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
	render: (args) => (<SearchWithHooks {...args} />)
};

type Variant = {
	label: Props['label']
	isDisabled?: boolean,
	isInvalid?: boolean,
	isReadOnly?: boolean,
	labelHidden?: boolean,
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
		label: 'label hidden',
		labelHidden: true,
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
				story: 'All possible variants of input states are presented here',
			},
		},
	},
	render: () => (
		<>
			{variants.map((variant) => (
				<SearchWithHooks
					className='mb-6 last:mb-0'
					key={variant.label}
					id={variant.label}
					name={variant.label}
					label={variant.label}
					isDisabled={variant.isDisabled}
					isInvalid={variant.isInvalid}
					isReadOnly={variant.isReadOnly}
					labelHidden={variant.labelHidden}
					error={variant.error}
					onSubmit={() => { }}
					placeholder={variant.placeholder}
				/>
			))}
		</>
	),
};