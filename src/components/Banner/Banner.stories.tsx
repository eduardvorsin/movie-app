import type { Meta, StoryObj } from '@storybook/react';
import Banner, { Props } from './Banner';
import Button from '@/components/Button/Button';
import { useTranslation } from 'react-i18next';

const appearances: NonNullable<Props['appearance']>[] = ['success', 'info', 'warning', 'danger', 'discovery'];

const meta: Meta<typeof Banner> = {
	title: 'Layout/Banner',
	tags: ['autodocs'],
	argTypes: {
		appearance: {
			description: 'Banner appearance',
		},
		className: {
			description: 'Additional classes for the banner'
		},
		children: {
			description: 'Banner content',
		},
		testId: {
			description: 'Id for testing the component',
		},
		title: {
			description: 'Banner title',
		},
		hideIcon: {
			description: 'Show or hide the icon in front of the content',
		},
		onClose: {
			control: false,
			description: 'A callback that is triggered when the close button is clicked',
		},
		closeButton: {
			description: 'Show or hide the banner close button',
		},
		titleElement: {
			description: 'Header element from h1 to h6',
		},
		actions: {
			control: false,
			description: 'Array of action buttons for the banner',
		},
		dictionary: {
			control: false,
			description: 'An object with keys for localization of the component',
		},
	},
	component: Banner,
	parameters: {
		docs: {
			description: {
				component: 'This component is utilized to apprise merchants of significant alterations or ongoing situations. Employ this element when you want to convey important messages to merchants in a noticeable manner. Banners are positioned at the upper part of the relevant page or section, just beneath the page or section heading.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Banner>;

const BannerWithHooks = (props: Omit<Props, 'dictionary'>) => {
	const { t } = useTranslation('common');
	const dictionary = { closeButton: t('banner.closeButton') };

	if (props.closeButton) {
		return (
			<Banner
				{...props}
				closeButton={true}
				dictionary={dictionary}
			/>
		);
	}

	return (
		<Banner
			{...props}
			closeButton={false}
		/>
	);
}

export const Default: Story = {
	args: {
		title: 'Default banner',
		children: 'Default banner Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non repellendus ullam quam dolore inventore deleniti reiciendis esse dolor sed.'
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
	render: (args) => (<BannerWithHooks {...args} />),
};

export const Appearances: Story = {
	parameters: {
		docs: {
			description: {
				story: 'The appearance property can take 5 values: success, info, warning, danger, discovery. Info - indicates a status change or the transmission of important information. Success - a message about the completed action or event. Warning - warning users about potential errors or dangerous actions. Danger - a message about errors and dangerous actions. Discovery - a message about updates and the introduction of new features',
			},
		},
	},
	render: () => (
		<div
			className='flex flex-col gap-3'
		>
			{appearances.map((appearance) => (
				<BannerWithHooks
					closeButton={false}
					key={appearance}
					title={appearance}
					appearance={appearance}
				>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non repellendus ullam quam dolore.
				</BannerWithHooks>
			))}
		</div>
	),
};

export const CloseButton: Story = {
	argTypes: {
		onClose: {
			action: 'Closed',
		},
	},
	args: {
		appearance: 'info',
		title: 'Close Button',
		closeButton: true,
		children: 'Close button banner Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non repellendus ullam quam dolore inventore deleniti reiciendis esse dolor sed.'
	},
	parameters: {
		docs: {
			description: {
				story: 'Adds a button with which this banner can be hidden',
			},
		},
	},
	render: (args) => (<BannerWithHooks {...args} />),
};

export const HideIcon: Story = {
	args: {
		appearance: 'success',
		title: 'Hide Icon',
		hideIcon: true,
		children: 'Hide icon banner Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non repellendus ullam quam dolore inventore deleniti reiciendis esse dolor sed.'
	},
	parameters: {
		docs: {
			description: {
				story: 'Hides the icon to the left of the content',
			},
		},
	},
	render: (args) => (<BannerWithHooks {...args} />),
};

export const WithoutTitle: Story = {
	args: {
		children: 'Without Title banner Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non repellendus ullam quam dolore inventore deleniti reiciendis esse dolor sed.'
	},
	parameters: {
		docs: {
			description: {
				story: 'If you do not pass the value to the property for the header, it will not be displayed in the banner',
			},
		},
	},
	render: (args) => (<BannerWithHooks {...args} />),
};

export const WithActions: Story = {
	args: {
		appearance: 'discovery',
		title: 'With Actions',
		children: 'With actions banner Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non repellendus ullam quam dolore inventore deleniti reiciendis esse dolor sed.',
		actions: [
			<Button key={0} appearance='discovery'>Add</Button>,
			<Button key={1} appearance='discovery'>Remove</Button>
		]
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to add your own buttons or links inside the banner',
			},
		},
	},
	render: (args) => (<BannerWithHooks {...args} />),
};