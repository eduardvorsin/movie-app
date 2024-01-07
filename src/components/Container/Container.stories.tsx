import type { Meta, StoryObj } from '@storybook/react';
import Container from './Container';

const meta: Meta<typeof Container> = {
	title: 'components/Container',
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes for the Container'
		},
		testId: {
			description: 'Id for testing the component',
		},
		children: {
			control: false,
			description: 'The component that will be wrapped in a container',
		},
		component: {
			control: false,
			description: 'The element that will serve as a container',
		}
	},
	component: Container,
	parameters: {
		docs: {
			description: {
				component: 'A component that serves as a bounding container when adapting pages',
			},
		},
	},
}

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
	args: {
		className: '',
		testId: '',
		children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dolore fugit expedita mollitia laboriosam, ut explicabo natus quas distinctio, cum dolorem sit est autem quaerat. Itaque enim vel accusamus quod! Pariatur, ratione! At nemo aut expedita suscipit obcaecati voluptatum voluptates enim dolorum autem accusantium sunt fuga facilis, ratione voluptatibus cupiditate itaque, placeat illo accusamus doloremque veniam et sint quisquam tempora!'
	},
};