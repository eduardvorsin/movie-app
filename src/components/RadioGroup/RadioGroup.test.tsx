import { render, screen } from '@testing-library/react';
import RadioGroup, { Choice } from './RadioGroup';
import userEvent from '@testing-library/user-event';

const choices: Choice[] = [
	{
		value: 'apple',
		label: 'apple',
		id: 'apple',
	},
	{
		value: 'orange',
		label: 'orange',
		id: 'orange',
	},
	{
		value: 'banana',
		label: 'banana',
		id: 'banana',
	},
	{
		value: 'pear',
		label: 'pear',
		id: 'pear',
	},
];

describe('RadioGroup tests', () => {
	it('is rendered correctly', () => {
		render(
			<RadioGroup
				name='fruits'
				id='fruits'
				value=''
				onChange={() => { }}
				choices={choices}
			/>
		);

		expect(screen.getByRole<HTMLFieldSetElement>('group')).toBeInTheDocument();
	});

	it('when you click on the radio button, the mock function is called', async () => {
		const mockFn = jest.fn();
		const user = userEvent.setup()
		render(
			<RadioGroup
				name='fruits'
				id='fruits'
				value=''
				onChange={mockFn}
				choices={choices}
			/>
		);

		await user.click(screen.getAllByRole<HTMLInputElement>('radio')[0]);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('if isDisabled is true then all radio buttons in the group become inactive', async () => {
		const mockFn = jest.fn();
		const user = userEvent.setup()
		render(
			<RadioGroup
				name='fruits'
				id='fruits'
				value=''
				onChange={mockFn}
				choices={choices}
				isDisabled
			/>
		);

		await user.click(screen.getAllByRole<HTMLInputElement>('radio')[0]);
		await user.click(screen.getAllByRole<HTMLInputElement>('radio')[1]);
		await user.click(screen.getAllByRole<HTMLInputElement>('radio')[2]);

		expect(mockFn).toHaveBeenCalledTimes(0);
	});

	it('if isRequired is true then the symbol should appear next to the label *', () => {
		render(
			<RadioGroup
				name='fruits'
				id='fruits'
				value=''
				onChange={() => { }}
				choices={choices}
				isRequired
			/>
		);

		expect(screen.getByText<HTMLSpanElement>('*')).toBeInTheDocument();
	});

	it('if the value in the error sample is not empty, then the error element should be displayed.', () => {
		render(
			<RadioGroup
				name='fruits'
				id='fruits'
				value=''
				onChange={() => { }}
				choices={choices}
				error='mock error'
			/>
		);

		expect(screen.getByText<HTMLParagraphElement>(/mock error/i)).toBeInTheDocument();
	});

	it('if titleHidden is true then the title should be visible only to screen readers', () => {
		render(
			<RadioGroup
				name='fruits'
				id='fruits'
				value=''
				title='title'
				titleHidden
				onChange={() => { }}
				choices={choices}
				error='mock error'
			/>
		);

		expect(screen.getByText<HTMLLegendElement>('title')).toHaveClass('sr-only');
	})

	it('is a basic snapshot', () => {
		render(
			<RadioGroup
				name='fruits'
				id='fruits'
				value=''
				onChange={() => { }}
				choices={choices}
			/>
		);

		expect(screen.getByRole<HTMLFieldSetElement>('group')).toBeInTheDocument();
	});

	it('is a snapshot with isDisabled set to true', () => {
		render(
			<RadioGroup
				name='fruits'
				id='fruits'
				value=''
				onChange={() => { }}
				choices={choices}
				isDisabled
			/>
		);

		expect(screen.getByRole<HTMLFieldSetElement>('group')).toBeInTheDocument();
	});

	it('is a snapshot with IsInvalid equal to true', () => {
		render(
			<RadioGroup
				name='fruits'
				id='fruits'
				value=''
				isInvalid
				onChange={() => { }}
				choices={choices}
			/>
		);

		expect(screen.getByRole<HTMLFieldSetElement>('group')).toBeInTheDocument();
	});

	it('is a snapshot when titleHidden is true', () => {
		render(
			<RadioGroup
				name='fruits'
				id='fruits'
				value=''
				title='title'
				titleHidden
				onChange={() => { }}
				choices={choices}
			/>
		);

		expect(screen.getByRole<HTMLFieldSetElement>('group')).toBeInTheDocument();
	});

	it('is a snapshot with error message', () => {
		render(
			<RadioGroup
				name='fruits'
				id='fruits'
				value=''
				error='mock error'
				onChange={() => { }}
				choices={choices}
			/>
		);

		expect(screen.getByRole<HTMLFieldSetElement>('group')).toBeInTheDocument();
	});

	it('is a snapshot when isRequired is true', () => {
		render(
			<RadioGroup
				name='fruits'
				id='fruits'
				value=''
				isRequired
				onChange={() => { }}
				choices={choices}
			/>
		);

		expect(screen.getByRole<HTMLFieldSetElement>('group')).toBeInTheDocument();
	});
});

