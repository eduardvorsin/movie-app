import type { Meta, StoryObj } from '@storybook/react';
import CarouselArrow, { Props } from './CarouselArrow';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof CarouselArrow> = {
	title: 'UI/Carousel/CarouselArrow',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the component'
		},
		testId: {
			description: 'Id for testing the component',
		},
		direction: {
			description: 'Allows you to set the direction of the arrow',
		},
		isDisabled: {
			description: 'Allows you to make the component inactive for interaction',
		},
		onClick: {
			control: false,
			description: 'Allows you to send a callback that will be called when clicked',
		},
		dictionary: {
			control: false,
			description: 'An object with keys for localization of the component',
		},
	},
	component: CarouselArrow,
	parameters: {
		docs: {
			description: {
				component: 'The CarouselArrow component is a control that provides navigation in the carousel component. This component provides arrows to move between the elements of the carousel, improving interactivity and user-friendliness.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof CarouselArrow>;

const CarouselArrowWithHooks = (props: Omit<Props, 'dictionary'>) => {
	const { t } = useTranslation('common');
	const dictionary = {
		direction: t('carouselArrow.direction', { context: props.direction })
	};

	return (
		<CarouselArrow
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
		<div className='flex gap-3 max-w-[150px] relative'>
			<CarouselArrowWithHooks {...args} direction='left' />
			<CarouselArrowWithHooks {...args} direction='right' />
		</div>
	),
};

export const Disabled: Story = {
	args: {
		direction: 'left',
		isDisabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Makes the component inactive for interaction',
			},
		},
	},
	render: (args) => (<CarouselArrowWithHooks {...args} />),
};

export const EventCallbacks: Story = {
	argTypes: {
		onClick: {
			action: 'Clicked',
		},
	},
	args: {
		direction: 'left',
	},
	parameters: {
		docs: {
			description: {
				story: 'Callback is a function that is called when clicking on a component',
			},
		},
	},
	render: (args) => (<CarouselArrowWithHooks {...args} />),
};