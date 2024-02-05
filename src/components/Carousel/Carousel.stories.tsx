import type { Meta, StoryObj } from '@storybook/react';
import Carousel, { Props } from './Carousel';
import ThemedImage from '../ThemedImage/ThemedImage';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Carousel> = {
	title: 'UI/Carousel',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the component'
		},
		testId: {
			description: 'Id for testing the component',
		},
		children: {
			description: 'The elements that will be sliders',
		},
		label: {
			description: 'A label for the slider that is visible only to screen readers',
		},
		slidesPerGroup: {
			description: 'The number of slides to scroll through at a time',
		},
		slidesPerView: {
			description: 'The number of slides shown on the screen',
		},
		spaceBetween: {
			description: 'The distance between slides in pixels',
		},
		pauseOnHover: {
			description: 'Stop automatic scrolling of slides when hovering over',
		},
		autoplay: {
			description: 'Enable automatic slide scrolling',
		},
		autoplayInterval: {
			description: 'The time interval after which the next slide will be shown',
		},
		showPagination: {
			description: 'Allows you to hide/show pagination for the slider',
		},
		showArrows: {
			description: 'Allows you to hide/show the arrows for the slider',
		},
		noSwiping: {
			description: 'Allows you to allow/disable swipe slides on phones',
		},
		mousewheel: {
			description: 'Allows you to turn on/off the scrolling of sliders through the mouse wheel',
		},
		paginationType: {
			description: 'Type of pagination',
		},
		showScrollShadow: {
			description: 'Show the shadow scroll indicator',
		},
		breakpoints: {
			description: 'Breakpoints where you can change the distance between slides, the number of slides shown at a time, etc.',
		},
		onSlideChange: {
			control: false,
			description: 'The callback that is called when changing slides',
		},
	},
	component: Carousel,
	parameters: {
		docs: {
			description: {
				component: 'The Carousel component is an important user interface element designed to display a collection of content elements such as images, slides, or flashcards in a convenient and interactive format.',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
	args: {
		slidesPerGroup: 1,
		slidesPerView: 4,
		spaceBetween: 20,
		showArrows: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the component',
			},
		},
	},
	render: (args) => (
		<Carousel
			{...args}
		>
			{(new Array(16).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full'
						alt=''
						width={402}
						height={201}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};

export const SlidesPerView: Story = {
	args: {
		slidesPerGroup: 1,
		slidesPerView: 6,
		spaceBetween: 20,
		showArrows: true,
		showPagination: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'The number of slides shown in the viewport',
			},
		},
	},
	render: (args) => (
		<Carousel
			{...args}
		>
			{(new Array(18).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full mb-3'
						alt=''
						width={261}
						height={130}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};

export const SlidesPerGroup: Story = {
	args: {
		slidesPerGroup: 5,
		slidesPerView: 5,
		spaceBetween: 20,
		showArrows: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'The number of slides to scroll through at a time',
			},
		},
	},
	render: (args) => (
		<Carousel
			{...args}
		>
			{(new Array(15).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full mb-3'
						alt=''
						width={261}
						height={130}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};

export const SpaceBetween: Story = {
	args: {
		slidesPerGroup: 1,
		slidesPerView: 4,
		spaceBetween: 50,
		showArrows: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'The distance between the slides',
			},
		},
	},
	render: (args) => (
		<Carousel
			{...args}
		>
			{(new Array(16).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full'
						alt=''
						width={380}
						height={190}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};

export const Autoplay: Story = {
	args: {
		slidesPerGroup: 1,
		slidesPerView: 4,
		spaceBetween: 20,
		autoplay: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Auto-switching slides',
			},
		},
	},
	render: (args) => (
		<Carousel
			{...args}
		>
			{(new Array(16).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full'
						alt=''
						width={402}
						height={201}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};

export const AutoplayInterval: Story = {
	args: {
		slidesPerGroup: 1,
		slidesPerView: 4,
		spaceBetween: 20,
		autoplay: true,
		autoplayInterval: 5000,
	},
	parameters: {
		docs: {
			description: {
				story: 'The time interval that controls autoplay',
			},
		},
	},
	render: (args) => (
		<Carousel
			{...args}
		>
			{(new Array(16).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full'
						alt=''
						width={402}
						height={201}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};

export const PauseOnHover: Story = {
	args: {
		slidesPerGroup: 1,
		slidesPerView: 4,
		spaceBetween: 20,
		showArrows: true,
		pauseOnHover: true,
		autoplay: true,
		autoplayInterval: 3000,
	},
	parameters: {
		docs: {
			description: {
				story: 'Stops auto-playback of slides on hover',
			},
		},
	},
	render: (args) => (
		<Carousel
			{...args}
		>
			{(new Array(16).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full'
						alt=''
						width={402}
						height={201}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};

export const ShowPagination: Story = {
	args: {
		slidesPerGroup: 1,
		slidesPerView: 4,
		spaceBetween: 20,
		showArrows: true,
		showPagination: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to hide/show slider pagination',
			},
		},
	},
	render: (args) => (
		<Carousel
			{...args}
		>
			{(new Array(16).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full mb-3'
						alt=''
						width={402}
						height={201}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};

export const ShowArrows: Story = {
	args: {
		slidesPerGroup: 1,
		slidesPerView: 4,
		spaceBetween: 20,
		showArrows: false,
		showPagination: true,
		paginationType: 'dots'
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to hide/show the slider arrows',
			},
		},
	},
	render: (args) => (
		<Carousel
			{...args}
		>
			{(new Array(16).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full mb-3'
						alt=''
						width={402}
						height={201}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};

export const NoSwiping: Story = {
	args: {
		slidesPerGroup: 1,
		slidesPerView: 4,
		spaceBetween: 20,
		showArrows: true,
		showPagination: false,
		noSwiping: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to allow/prohibit swiping on phones',
			},
		},
	},
	render: (args) => (
		<Carousel
			{...args}
		>
			{(new Array(16).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full mb-3'
						alt=''
						width={402}
						height={201}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};

export const Mousewheel: Story = {
	args: {
		slidesPerGroup: 1,
		slidesPerView: 4,
		spaceBetween: 20,
		showArrows: true,
		showPagination: false,
		mousewheel: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Allows you to turn on/off slide switching via the mouse wheel',
			},
		},
	},
	render: (args) => (
		<Carousel
			{...args}
		>
			{(new Array(16).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full mb-3'
						alt=''
						width={402}
						height={201}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};

const paginationTypes: Exclude<Props['paginationType'], undefined>[] = ['dots', 'progress', 'fraction'];

export const PaginationType: Story = {
	args: {
		slidesPerGroup: 1,
		slidesPerView: 4,
		spaceBetween: 20,
		showArrows: true,
		showPagination: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Types of pagination for sliders. There are 3 options in total, these are points that can be clickable, numeric fractions, and a progress bar',
			},
		},
	},
	render: (args) => (
		<>
			{paginationTypes.map((pagination) => (
				<Carousel
					className='mb-12'
					key={pagination}
					paginationType={pagination}
					{...args}
				>
					{(new Array(16).fill(null).map((_, index) => (
						<div
							key={index}
							className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
							data-index={index + 1}
						>
							<ThemedImage
								className={`w-full ${pagination === 'progress' ? '' : 'mb-3'}`}
								alt=''
								width={402}
								height={201}
								showSkeleton
								src='/assets/images/collection-marvel.webp'
							/>
						</div>
					)))}
				</Carousel>
			))}
		</>
	),
};

export const ShowScrollShadow: Story = {
	args: {
		slidesPerGroup: 1,
		slidesPerView: 4,
		spaceBetween: 20,
		showArrows: true,
		showPagination: false,
		showScrollShadow: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Show the shadow on the right to show that the slider can be scrolled',
			},
		},
	},
	render: (args) => (
		<Carousel
			{...args}
		>
			{(new Array(16).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full mb-3'
						alt=''
						width={402}
						height={201}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};

export const Breakpoints: Story = {
	args: {
		slidesPerGroup: 1,
		spaceBetween: 20,
		showArrows: true,
		showPagination: false,
		breakpoints: {
			1200: { slidesPerView: 4 },
			1024: { slidesPerView: 3 },
			640: { slidesPerView: 2 },
			0: { slidesPerView: 1 },
		},
	},
	parameters: {
		docs: {
			description: {
				story: 'Breakpoints with which you can change the number of slides shown and flipped at a certain width, and other properties',
			},
		},
	},
	render: (args) => (
		<Carousel
			{...args}
		>
			{(new Array(16).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full mb-3'
						alt=''
						width={402}
						height={201}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};

export const EventCallbacks: Story = {
	args: {
		slidesPerGroup: 1,
		slidesPerView: 4,
		spaceBetween: 20,
		showArrows: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'The callback that is called when the slide is changed',
			},
		},
	},
	render: (args) => (
		<Carousel
			onSlideChange={(e) => action('Slide Changed')(e)}
			{...args}
		>
			{(new Array(16).fill(null).map((_, index) => (
				<div
					key={index}
					className='relative before:flex before:items-center before:justify-center before:w-[40px] before:h-[40px] before:bg-lime-500 before:content-[attr(data-index)] before:text-400 before:font-bold before:absolute before:top-0 before:left-0 before:z-300'
					data-index={index + 1}
				>
					<ThemedImage
						className='w-full mb-3'
						alt=''
						width={402}
						height={201}
						showSkeleton
						src='/assets/images/collection-marvel.webp'
					/>
				</div>
			)))}
		</Carousel>
	),
};