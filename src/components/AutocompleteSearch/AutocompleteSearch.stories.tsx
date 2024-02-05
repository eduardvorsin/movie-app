import type { Meta, StoryObj } from '@storybook/react';
import AutocompleteSearch, { Props } from './AutocompleteSearch';
import { useTranslation } from 'react-i18next';

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

const ThemeToggleWithHooks = (props: Omit<Props, 'dictionary'>) => {
	const { t } = useTranslation('common');
	const dictionary = {
		title: t('autocompleteSearch.title', { value: props.value }),
		text: t('autocompleteSearch.text'),
		search: {
			button: t('search.button'),
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
	render: (args) => (<ThemeToggleWithHooks {...args} />),
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
	render: (args) => (<ThemeToggleWithHooks {...args} />),
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
	render: (args) => (<ThemeToggleWithHooks {...args} />),
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
	render: (args) => (<ThemeToggleWithHooks {...args} />),
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
	render: (args) => (<ThemeToggleWithHooks {...args} />),
};