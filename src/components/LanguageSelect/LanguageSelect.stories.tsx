import type { Meta, StoryObj } from '@storybook/react';
import LanguageSelect, { Props } from './LanguageSelect';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof LanguageSelect> = {
	title: 'components/LanguageSelect',
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
	component: LanguageSelect,
	parameters: {
		docs: {
			description: {
				component: 'The Language Select component is designed to provide users with the ability to select the language of the application interface, providing localization and personalization of the user experience. It allows you to easily switch between available languages, improving usability and adapting content to the preferences of the end user.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof LanguageSelect>;

const LanguageSelectWithHooks = (props: Omit<Props, 'dictionary'>) => {
	const { t } = useTranslation('common');
	const dictionary = { label: t('languageSelect.label') };

	return (
		<LanguageSelect
			{...props}
			dictionary={dictionary}
			className='max-w-[200px]'
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
	render: (args) => <LanguageSelectWithHooks {...args} />
};
