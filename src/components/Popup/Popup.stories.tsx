import type { Meta, StoryObj } from '@storybook/react';
import Popup, { Props } from './Popup';
import { MouseEventHandler, useState } from 'react';
import Button from '../Button/Button';

const meta: Meta<typeof Popup> = {
	title: 'UI/Popup',
	tags: ['autodocs'],
	argTypes: {
		children: {
			description: 'The text content of the component',
		},
		placement: {
			description: 'Allows you to set the physical location along the vertical and horizontal axes relative to the anchor element.'
		},
		trigger: {
			description: 'The element that will show this component when interacting',
		},
		lockScroll: {
			description: 'Allows you to limit the ability to scroll the page when the popup is open',
		},
		testId: {
			description: 'Id for testing the component',
		},
		id: {
			description: 'A unique identifier for the component',
		},
		isOpen: {
			description: 'Reflects the open or closed state of the popup',
		},
		offsetX: {
			description: 'The displacement of the component along the X axis relative to the anchor element',
		},
		offsetY: {
			description: 'The displacement of the component along the Y axis relative to the anchor element',
		},
	},
	component: Popup,
	parameters: {
		docs: {
			description: {
				component: 'The Popup component refers to a popup window or element that appears on the screen on top of the main content. This component is usually used to display important information, additional settings, or dialog interaction with the user.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Popup>;

const PopupWithHooks = (props: Omit<Props, 'isOpen' | 'trigger'>) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
		setIsOpen((prevState) => !prevState);
	};

	return (
		<Popup
			{...props}
			className='w-[70px] h-[36px]'
			isOpen={isOpen}
			trigger={
				<Button
					onClick={clickHandler}
				>
					{isOpen ? 'Open' : 'Close'}
				</Button>
			}
		/>
	);
};

export const Default: Story = {
	args: {
		id: 'popup',
		placement: 'right-start',
		children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
	render: (args) => (<PopupWithHooks {...args} />),
};

const placements: Exclude<Props['placement'], undefined>[] = ['left-start', 'left', 'left-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-start', 'bottom', 'bottom-end'];
export const Placement: Story = {
	args: {
		id: 'popup',
		placement: 'right-start',
	},
	parameters: {
		docs: {
			description: {
				story: 'The property sets the position of the hit relative to the anchor element. There are a total of 12 destination options available. There are 4 main directions: left, right, top, bottom. The remaining options are additional for placement relative to the main direction',
			},
		},
	},
	render: (args) => (
		<div className='flex items-center justify-center min-h-[250px] h-[100vh]'>
			<div className='max-w-[226px] grid grid-cols-[repeat(3,70px)] grid-rows-4 gap-2'>
				{placements.map((placement) => (
					<PopupWithHooks
						{...args}
						key={placement}
						placement={placement}
					>
						[{placement}] Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</PopupWithHooks>
				))}
			</div>
		</div>
	),
};

export const LockScroll: Story = {
	args: {
		id: 'popup',
		placement: 'right-start',
		children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		lockScroll: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Restricts scrolling on the page when the popup is open',
			},
		},
	},
	render: (args) => (
		<div>
			<PopupWithHooks {...args} />

			<div className='mt-5'>
				{(new Array(15)).fill(null).map((_, index) => (
					<p
						key={index}
						className='mb-1 last:mb-0'
					>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque optio dolorum reiciendis maiores, tempore soluta error maxime commodi est incidunt cum recusandae at eum culpa cupiditate id eos? Molestias, vitae?
						Voluptatum dolore illum quisquam, dicta facere et. Ipsam temporibus tempore aperiam, laudantium quae expedita nesciunt quas quos aliquid iste alias, quisquam debitis? Impedit sed inventore voluptatum ducimus quae eius asperiores?
					</p>
				))}
			</div>
		</div>),
};

export const offsetX: Story = {
	args: {
		id: 'popup',
		placement: 'right-start',
		children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		offsetX: 100,
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the X-axis offset by a certain number of pixels. The property is available when left-, right- is set for the placement property.',
			},
		},
	},
	render: (args) => (<PopupWithHooks {...args} />),
};

export const offsetY: Story = {
	args: {
		id: 'popup',
		placement: 'bottom-start',
		children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		offsetY: 100,
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to set the Y-axis offset by a certain number of pixels. The property is available when top-, bottom- is set for the placement property.',
			},
		},
	},
	render: (args) => (<PopupWithHooks {...args} />),
};