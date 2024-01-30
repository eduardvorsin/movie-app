import type { Meta, StoryObj } from '@storybook/react';
import Footer, { Props } from './Footer';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof Footer> = {
	title: 'Layout/Footer',
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
	component: Footer,
	parameters: {
		docs: {
			description: {
				component: 'The Footer component is an important part of a web application, placing information about the site, links to social networks, as well as other important elements at the bottom of the page, providing a good user experience. This component serves as a navigation point for additional resources, and also decorates the design of the page, creating a complete and professional appearance.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Footer>;

const FooterWithHooks = (props: Omit<Props, 'dictionary'>) => {
	const { t } = useTranslation('common');
	const dictionary = {
		aboutTitle: t('footer.aboutTitle'),
		description: t('footer.description'),
		sectionsTitle: t('footer.sectionsTitle'),
		basedOnTitle: t('footer.basedOnTitle'),
		logo: {
			altText: t('logo.altText'),
			linkText: t('logo.linkText')
		},
		navigation: {
			movies: t('navigation.movies'),
			persons: t('navigation.persons'),
			tv: t('navigation.tv'),
			new: t('navigation.new'),
			collections: t('navigation.collections'),
		}
	};

	return (
		<Footer
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
	render: (args) => <FooterWithHooks {...args} />
};
