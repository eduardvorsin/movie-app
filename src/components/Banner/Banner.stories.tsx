import type { Meta, StoryObj } from '@storybook/react';
import Banner from './Banner';
import Button from '../Button/Button';

const meta: Meta<typeof Banner> = {
	title: 'components/Banner',
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
		titleLevel: {
			description: 'Header level from 1 to 6',
		},
		actions: {
			control: false,
			description: 'Array of action buttons for the banner',
		}
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

export const Info: Story = {
	args: {
		appearance: 'info',
		title: 'Info',
		children: 'Info banner Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non repellendus ullam quam dolore inventore deleniti reiciendis esse dolor sed.'
	},
	parameters: {
		docs: {
			description: {
				story: 'The banner is the default presentation utilized to indicate a shift in status or convey vital information.',
			},
		},
	},
};

export const Success: Story = {
	args: {
		appearance: 'success',
		title: 'Success',
		children: 'Success banner Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non repellendus ullam quam dolore inventore deleniti reiciendis esse dolor sed.'
	},
	parameters: {
		docs: {
			description: {
				story: 'Utilize a success banner message to inform the user that an action or event has been successfully completed.',
			},
		},
	},
};

export const Warning: Story = {
	args: {
		appearance: 'warning',
		title: 'Warning',
		children: 'Warning banner Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non repellendus ullam quam dolore inventore deleniti reiciendis esse dolor sed.'
	},
	parameters: {
		docs: {
			description: {
				story: 'Use a warning banner message to help users avoid errors, manage authentication issues, take actions to prevent potentially dangerous actions, and feel confident in their decision-making, such as in confirmation modals.',
			},
		},
	},
};

export const Danger: Story = {
	args: {
		appearance: 'danger',
		title: 'Danger',
		children: 'Danger banner Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non repellendus ullam quam dolore inventore deleniti reiciendis esse dolor sed.'
	},
	parameters: {
		docs: {
			description: {
				story: 'Use an error banner message to communicate when something destructive or critical has occurred, access has been denied, or connectivity issues are present. It\'s worth noting that employing section messages for these scenarios is not a common practice.',
			},
		},
	},
};

export const Discovery: Story = {
	args: {
		appearance: 'discovery',
		title: 'Discovery',
		children: 'Discovery banner Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non repellendus ullam quam dolore inventore deleniti reiciendis esse dolor sed.'
	},
	parameters: {
		docs: {
			description: {
				story: 'Utilize a discovery banner message to indicate a UI update or deliver information regarding new features and the onboarding process.',
			},
		},
	},
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
};

export const WithActions: Story = {
	args: {
		appearance: 'discovery',
		title: 'With Actions',
		children: 'With actions banner Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non repellendus ullam quam dolore inventore deleniti reiciendis esse dolor sed.',
		actions: [
			<Button appearance='discovery'>Add</Button>,
			<Button appearance='discovery'>Remove</Button>
		]
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to add your own buttons or links inside the banner',
			},
		},
	},
};