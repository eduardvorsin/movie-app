import { render, screen } from '@testing-library/react';
import Radio from './Radio';
import userEvent from '@testing-library/user-event';

describe('Radio tests', () => {
	it('is rendered correctly', () => {
		render(
			<Radio
				id='test-radio'
				name='test-radio'
				label='test-radio'
				value=''
				onChange={() => { }}
				isChecked={false}
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('radio')).toBeInTheDocument();
	});

	it('when you click on the radio button, the mock function is called', async () => {
		const mockFn = jest.fn();
		const user = userEvent.setup()
		render(
			<Radio
				id='test-radio'
				name='test-radio'
				label='test-radio'
				value=''
				onChange={mockFn}
				isChecked={false}
			/>
		);

		await user.click(screen.getByRole<HTMLInputElement>('radio'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('when the focus hits the radio button, the mock function is called', async () => {
		const mockFn = jest.fn();
		const user = userEvent.setup()
		render(
			<Radio
				id='test-radio'
				name='test-radio'
				label='test-radio'
				value=''
				onChange={() => { }}
				onFocus={mockFn}
				isChecked={false}
			/>
		);

		await user.tab();

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('if the focus is lost, the mock function is called from the radio button', async () => {
		const mockFn = jest.fn();
		const user = userEvent.setup()
		render(
			<Radio
				id='test-radio'
				name='test-radio'
				label='test-radio'
				value=''
				onChange={() => { }}
				onFocus={mockFn}
				isChecked={false}
			/>
		);

		await user.tab();
		await user.click(document.body);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('if isDisabled is true then the radio button becomes inactive', async () => {
		const mockFn = jest.fn();
		const user = userEvent.setup()
		render(
			<Radio
				id='test-radio'
				name='test-radio'
				label='test-radio'
				value=''
				isDisabled
				onChange={mockFn}
				isChecked={false}
			/>
		);

		await user.click(screen.getByRole<HTMLInputElement>('radio'));

		expect(mockFn).toHaveBeenCalledTimes(0);
	});
	it('is a basic snapshot', () => {
		render(
			<Radio
				id='test-radio'
				name='test-radio'
				label='test-radio'
				value=''
				onChange={() => { }}
				isChecked={false}
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('radio')).toMatchSnapshot();
	});

	it('is a snapshot with isDisabled set to true', () => {
		render(
			<Radio
				id='test-radio'
				name='test-radio'
				label='test-radio'
				isDisabled
				value=''
				onChange={() => { }}
				isChecked={false}
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('radio')).toMatchSnapshot();
	});

	it('is a snapshot with IsInvalid equal to true', () => {
		render(
			<Radio
				id='test-radio'
				name='test-radio'
				label='test-radio'
				isInvalid
				value=''
				onChange={() => { }}
				isChecked={false}
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('radio')).toMatchSnapshot();
	});
});