import type { Meta, StoryObj } from '@storybook/react';
import AutocompleteSearch, { Props } from './AutocompleteSearch';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof AutocompleteSearch> = {
	title: 'UI/AutocompleteSearch',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the component'
		},
		testId: {
			description: 'Id for testing the component',
		},
		isLoading: {
			description: 'Allows you to show the spinner while loading options',
		},
		options: {
			control: false,
			description: 'Search Result Options',
		},
		initialOptions: {
			control: false,
			description: 'The initial options that are shown before interacting with the search',
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
		onClear: {
			description: 'The callback is executed when you click on the "Clear" button',
			control: false,
		},
		onOptionLinkClick: {
			description: 'This callback is called when you click on the link inside the option',
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
		},
		dictionary: {
			control: false,
			description: 'An object with keys for localization of the component',
		},
	},
	component: AutocompleteSearch,
	parameters: {
		docs: {
			description: {
				component: 'The Autocomplete Search component is an interface element designed to create an autofill of the input in the search field. This component significantly improves the user experience by providing a quick and convenient way to search and select options from the suggested list.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof AutocompleteSearch>;

const AutocompleteSearchWithHooks = (props: Omit<Props, 'dictionary'>) => {

	const { t } = useTranslation('common');
	const dictionary = {
		emptyStateTitle: t('autocompleteSearch.emptyStateTitle', { value: props.value }),
		emptyStateText: t('autocompleteSearch.emptyStateText'),
		search: {
			button: t('search.button'),
			clearButton: t('search.clearButton'),
		},
	};

	return (
		<AutocompleteSearch
			{...props}
			dictionary={dictionary}
		/>
	);
}

export const Default: Story = {
	args: {
		options: [],
		initialOptions: [],
		value: '',
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
	render: (args) => (<AutocompleteSearchWithHooks {...args} />),
};

export const Loading: Story = {
	args: {
		isLoading: true,
		value: '',
	},
	parameters: {
		docs: {
			description: {
				story: 'Loading status for the list of options',
			},
		},
	},
	render: (args) => (<AutocompleteSearchWithHooks {...args} />),
};

export const EmptyState: Story = {
	args: {
		options: [],
		value: '',
		initialOptions: [],
	},
	parameters: {
		docs: {
			description: {
				story: 'The status displayed when 0 options are found',
			},
		},
	},
	render: (args) => (<AutocompleteSearchWithHooks {...args} />),
};

export const Options: Story = {
	args: {
		options: [{
			href: '/',
			label: 'first option',
		}, {
			href: '/',
			label: 'second option',
		}],
		value: 'first option',
	},
	parameters: {
		docs: {
			description: {
				story: 'The state when the desired options are found',
			},
		},
	},
	render: (args) => (<AutocompleteSearchWithHooks {...args} />),
};

export const InitialOptions: Story = {
	args: {
		initialOptions: [{
			href: '/',
			label: 'first option',
		}, {
			href: '/',
			label: 'second option',
		}],
		value: '',
	},
	parameters: {
		docs: {
			description: {
				story: 'The state when the options are displayed by default before the search was initiated',
			},
		},
	},
	render: (args) => (<AutocompleteSearchWithHooks {...args} />),
};

export const EventCallbacks: Story = {
	args: {
		initialOptions: [{
			href: '/',
			label: 'first option',
		}, {
			href: '/',
			label: 'second option',
		}],
		value: '',
	},
	parameters: {
		docs: {
			description: {
				story: 'The callback function can be provided to the onClear, onOptionLinkClick event',
			},
		},
	},
	render: (args) => (
		<AutocompleteSearchWithHooks
			{...args}
			onOptionLinkClick={() => action('Option link clicked')()}
			onClear={() => action('Cleared')()}
		/>
	)
};

export const WithIcons: Story = {
	args: {
		initialOptions: [{
			href: '/',
			label: 'first option',
			iconType: 'tv',
		}, {
			href: '/',
			label: 'second option',
			iconType: 'movie',
		}, {
			href: '/',
			label: 'third option',
			iconType: 'person',
		}],
		value: '',
	},
	parameters: {
		docs: {
			description: {
				story: 'If you pass the iconType property to the options or intialOptions object, icons will be displayed inside the option',
			},
		},
	},
	render: (args) => (<AutocompleteSearchWithHooks {...args} />),
};