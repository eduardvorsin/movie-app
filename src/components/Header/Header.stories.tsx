import type { Meta, StoryObj } from '@storybook/react';
import Header, { Props } from './Header';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof Header> = {
	title: 'Layout/Header',
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
	component: Header,
	parameters: {
		docs: {
			description: {
				component: 'The Header component plays a key role in user interaction by providing important navigation, logo and basic controls, which provides easy access to the main sections of the web application and improves overall user navigation. This component also serves as the visual center of the web page, providing the user with context and identification.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Header>;

const HeaderWithHooks = (props: Omit<Props, 'dictionary'>) => {
	const { t } = useTranslation('common');
	const dictionary = {
		searchButton: t('header.searchButton'),
		logo: {
			altText: t('logo.altText'),
			linkText: t('logo.linkText'),
		},
		navigation: {
			movies: t('navigation.movies'),
			persons: t('navigation.persons'),
			tv: t('navigation.tv'),
			new: t('navigation.new'),
			collections: t('navigation.collections'),
		},
		userSettingsButton: {
			button: t('userSettingsButton.button'),
			themeTitle: t('userSettingsButton.themeTitle'),
			languageTitle: t('userSettingsButton.languageTitle'),
			languageSelect: { label: t('languageSelect.label') },
			themeToggle: { label: t('themeToggle.label') },
		},
		navigationMenuButton: {
			active: t('navigationMenuButton.active'),
			inactive: t('navigationMenuButton.inactive'),
		}
	};

	return (
		<Header
			{...props}
			className='[&]:static'
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
	render: (args) => <HeaderWithHooks {...args} />
};
