import type { Meta, StoryObj } from '@storybook/react';
import Logo, { Props } from './Logo';
import { useTranslation } from 'react-i18next';

const sizes: NonNullable<Props['size']>[] = ['small', 'medium', 'large'];

const meta: Meta<typeof Logo> = {
	title: 'UI/Logo',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the Logo'
		},
		testId: {
			description: 'Id for testing the component',
		},
		size: {
			description: 'Logo Dimensions',
		},
		onClick: {
			control: false,
			description: 'A callback that is triggered when a component is clicked on',
		},
		dictionary: {
			control: false,
			description: 'An object with keys for localization of the component',
		},
	},
	component: Logo,
	parameters: {
		docs: {
			description: {
				component: 'The component responsible for displaying the project logo',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Logo>;

const LogoWithHooks = (props: Omit<Props, 'dictionary'>) => {
	const { t } = useTranslation('common');
	const dictionary = {
		altText: t('logo.altText'),
		linkText: t('logo.linkText'),
	};

	return (
		<Logo
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
	render: (args) => (<LogoWithHooks {...args} />),
};

export const EventCallbacks: Story = {
	argTypes: {
		onClick: {
			action: 'Clicked',
		},
	},
	parameters: {
		docs: {
			description: {
				story: 'When you click on the logo, a callback is triggered',
			},
		},
	},
	render: (args) => (<LogoWithHooks {...args} />),
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: 'There are 3 logo sizes: small, medium, large.',
			},
		},
	},
	render: () => (
		<div
			className='flex flex-col gap-5'
		>
			{sizes.map((size) => (
				<LogoWithHooks
					key={size}
					size={size}
				/>
			))}
		</div>
	)
};
