import type { Meta, StoryObj } from '@storybook/react';
import PersonCard, { Props } from './PersonCard';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof PersonCard> = {
	title: 'Layout/PersonCard',
	tags: ['autodocs'],
	argTypes: {
		appearance: {
			description: 'Appearance for the card',
		},
		className: {
			description: 'Additional classes for the PersonCard'
		},
		testId: {
			description: 'Id for testing the component',
		},
		personId: {
			description: 'Id for the link to the page with the person',
		},
		src: {
			description: 'The path to the picture',
		},
		alt: {
			description: 'Alternative text for the image',
		},
		title: {
			description: 'Title for the card',
		},
		showRating: {
			description: 'Allows you to hide/show the rating of a film project',
		},
		rating: {
			description: 'Rating value',
		},
		children: {
			description: 'The text content of the component',
		},
		titleElement: {
			description: 'The html element to be used for the header',
		},
		titleLevel: {
			description: 'Header level',
		},
		onClick: {
			control: false,
			description: 'Allows you to send a callback that is called when you click on the component',
		},
		dictionary: {
			control: false,
			description: 'An object with keys for localization of the component',
		},
		loading: {
			description: 'Allows you to add a lazy loading for an image',
		},
	},
	component: PersonCard,
	parameters: {
		docs: {
			description: {
				component: 'The PersonCard component is a key element of the user interface designed to display information about characters – actors, directors, producers and other participants in the cinematic process.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof PersonCard>;

const PersonCardWithHooks = (props: Omit<Props, 'dictionary'>) => {
	const { t } = useTranslation('common');
	const dictionary = { rating: t('personCard.rating') };

	return (
		<PersonCard
			{...props}
			dictionary={dictionary}
		/>
	);
}

export const Default: Story = {
	args: {
		className: 'max-w-[154px]',
		personId: 9999,
		src: '/assets/images/person-placeholder-l.svg',
		rating: 100,
		alt: '',
		title: 'Title',
		titleLevel: 6,
		children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
	render: (args) => (<PersonCardWithHooks {...args} />),
};

export const ShowRating: Story = {
	args: {
		className: 'max-w-[154px]',
		personId: 9999,
		src: '/assets/images/person-placeholder-l.svg',
		rating: 100,
		showRating: true,
		alt: '',
		title: 'Title',
		titleLevel: 6,
		children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to hide or show an item with a rating for a person',
			},
		},
	},
	render: (args) => (<PersonCardWithHooks {...args} />),
};

export const EventCallbacks: Story = {
	argTypes: {
		onClick: {
			action: 'Clicked',
		},
	},
	args: {
		className: 'max-w-[154px]',
		personId: 9999,
		src: '/assets/images/person-placeholder-l.svg',
		rating: 100,
		alt: '',
		title: 'Title',
		titleLevel: 6,
		children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
	},
	parameters: {
		docs: {
			description: {
				story: 'The callback that will be called when clicking on the component',
			},
		},
	},
	render: (args) => (<PersonCardWithHooks {...args} />),
};

export const Appearance: Story = {
	args: {
		personId: 9999,
		src: '/assets/images/person-placeholder-l.svg',
		rating: 100,
		alt: '',
		title: 'Title',
		titleLevel: 6,
		children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
	},
	parameters: {
		docs: {
			description: {
				story: 'The appearance of the card. There are 2 appearance options in total: primary, secondary',
			},
		},
	},
	render: (args) => (
		<div className='flex gap-6 items-start'>
			<PersonCardWithHooks
				{...args}
				className='basis-[154px] shrink-0 grow-0'
				appearance='primary'
			/>
			<PersonCardWithHooks
				{...args}
				className='basis-[154px] shrink-0 grow-0'
				appearance='secondary'
			/>
		</div>
	),
};