import type { Meta, StoryObj } from '@storybook/react';
import UserSettingsButton, { Props } from './UserSettingsButton';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof UserSettingsButton> = {
	title: 'UI/UserSettingsButton',
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
	component: UserSettingsButton,
	parameters: {
		docs: {
			description: {
				component: 'The UserSettingsButton component is a web interface element that provides user access to their account settings or personal preferences in the application.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof UserSettingsButton>;

const UserSettingsButtonWithHooks = (props: Omit<Props, 'dictionary'>) => {
	const { t } = useTranslation('common');
	const dictionary = {
		button: t('userSettingsButton.button'),
		themeTitle: t('userSettingsButton.themeTitle'),
		languageTitle: t('userSettingsButton.languageTitle'),
		languageSelect: { label: t('languageSelect.label') },
		themeToggle: { label: t('themeToggle.label') },
	};

	return (
		<UserSettingsButton
			{...props}
			dictionary={dictionary}
		/>
	);
}

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
	render: (args) => (
		<div className='flex justify-center'>
			<UserSettingsButtonWithHooks {...args} />
		</div>
	),
};