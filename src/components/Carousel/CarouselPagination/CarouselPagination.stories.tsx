import type { Meta, StoryObj } from '@storybook/react';
import CarouselPagination, { Props } from './CarouselPagination';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof CarouselPagination> = {
	title: 'UI/Carousel/CarouselPagination',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the component'
		},
		testId: {
			description: 'Id for testing the component',
		},
		activeIndex: {
			description: 'Index of the active pagination element',
		},
		totalCount: {
			description: 'The total number of pagination elements',
		},
		paginationType: {
			description: 'Type of pagination',
		},
		onDotClick: {
			control: false,
			description: 'Allows you to send a callback that will be called when clicked',
		},
		dictionary: {
			control: false,
			description: 'An object with keys for localization of the component',
		},
	},
	component: CarouselPagination,
	parameters: {
		docs: {
			description: {
				component: 'The CarouselPagination component is a control used to display and select specific pages in the carousel component. This component allows users to quickly navigate between different sets of content inside the carousel.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof CarouselPagination>;

const CarouselPaginationWithHooks = (props: Omit<Props, 'dictionary' | 'onDotClick'>) => {
	const { t } = useTranslation('common');
	const dictionary = { label: t('carouselPagination.label') };
	const dotClickHandler = () => action('Clicked')();

	if (props.paginationType === 'dots') {
		return (
			<CarouselPagination
				{...props}
				paginationType={'dots'}
				dictionary={dictionary}
				onDotClick={dotClickHandler}
			/>
		);
	}

	return (
		<CarouselPagination
			{...props}
			paginationType={props.paginationType === 'progress' ? 'progress' : 'fraction'}
		/>
	);
}

export const Default: Story = {
	args: {
		activeIndex: 3,
		totalCount: 10,
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
	render: (args) => (<CarouselPaginationWithHooks {...args} />),
};

export const PaginationType: Story = {
	args: {
		activeIndex: 2,
		totalCount: 5,
	},
	parameters: {
		docs: {
			description: {
				story: 'The type of pagination. There are 3 types of pagination available: "dots", "fraction", "progress".',
			},
		},
	},
	render: (args) => (
		<div className='flex flex-col gap-5 max-w-[200px]'>
			<CarouselPaginationWithHooks {...args} paginationType='dots' />
			<CarouselPaginationWithHooks {...args} paginationType='progress' />
			<CarouselPaginationWithHooks {...args} paginationType='fraction' />
		</div>
	),
};

export const EventCallbacks: Story = {
	args: {
		paginationType: 'dots',
		activeIndex: 4,
		totalCount: 7,
	},
	parameters: {
		docs: {
			description: {
				story: 'The callback that is called when clicking on the pagination element',
			},
		},
	},
	render: (args) => (<CarouselPaginationWithHooks {...args} />),
};