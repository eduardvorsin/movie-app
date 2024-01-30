import type { Meta, StoryObj } from '@storybook/react';
import Navigation, { Props } from './Navigation';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof Navigation> = {
	title: 'Layout/Navigation',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the button'
		},
		testId: {
			description: 'Id for testing the component',
		},
		dictionary: {
			control: false,
			description: 'An object with keys for localization of the component',
		},
	},
	component: Navigation,
	parameters: {
		docs: {
			description: {
				component: 'The Navigation component in the documentation is a key tool for managing user navigation in the application. It provides transparent and convenient access to various sections and functions by providing intuitive controls such as menus, links and buttons.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Navigation>;

const NavigationWithHooks = (props: Omit<Props, 'dictionary'>) => {
	const { t } = useTranslation('common');
	const dictionary = {
		movies: t('navigation.movies'),
		persons: t('navigation.persons'),
		tv: t('navigation.tv'),
		new: t('navigation.new'),
		collections: t('navigation.collections'),
	};

	return (
		<Navigation
			{...props}
			dictionary={dictionary}
		/>);
}

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
	render: (args) => <NavigationWithHooks {...args} />
};
