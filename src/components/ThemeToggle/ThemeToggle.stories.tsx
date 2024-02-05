import type { Meta, StoryObj } from '@storybook/react';
import ThemeToggle, { Props } from './ThemeToggle';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof ThemeToggle> = {
	title: 'UI/ThemeToggle',
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
	component: ThemeToggle,
	parameters: {
		docs: {
			description: {
				component: 'The ThemeToggle component is a visual interface tool designed to switch between different themes or display styles of a web application. This component provides users with the ability to choose the preferred appearance of the application.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

const ThemeToggleWithHooks = (props: Omit<Props, 'dictionary'>) => {
	const { t } = useTranslation('common');
	const dictionary = { label: t('themeToggle.label') };

	return (
		<ThemeToggle
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
	render: (args) => (<ThemeToggleWithHooks {...args} />),
};