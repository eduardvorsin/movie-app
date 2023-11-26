import { render, screen } from '@testing-library/react';
import Toggle from './Toggle';
import userEvent from '@testing-library/user-event';
import AddIcon from '../../assets/icons/add.svg';
import MinusIcon from '../../assets/icons/minus.svg';

describe('Toggle tests', () => {
	it('is rendered correctly', () => {
		const mockChangeHandler = jest.fn();
		render(<Toggle
			id='toggle'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			onChange={mockChangeHandler}
		/>);

		expect(screen.getByTestId<HTMLDivElement>('toggle')).toBeInTheDocument();
	});

	it('when clicking on the toggler, the mock function is called', async () => {
		const mockChangeHandler = jest.fn();
		const user = userEvent.setup();
		render(<Toggle
			id='toggle'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			onChange={mockChangeHandler}
		/>);

		await user.click(screen.getByRole<HTMLInputElement>('switch'));

		expect(mockChangeHandler).toHaveBeenCalledTimes(1);
	});

	it('when the focus hits the toggler, the mock function is called', async () => {
		const mockChangeHandler = jest.fn();
		const mockFocusHandler = jest.fn();
		const user = userEvent.setup();
		render(<Toggle
			id='toggle'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			onFocus={mockFocusHandler}
			onChange={mockChangeHandler}
		/>);

		await user.tab();

		expect(mockFocusHandler).toHaveBeenCalledTimes(1);
	});

	it('when the toggler loses focus, the mock function is called', async () => {
		const mockChangeHandler = jest.fn();
		const mockBlurHandler = jest.fn();
		const user = userEvent.setup();
		render(<Toggle
			id='toggle'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			onBlur={mockBlurHandler}
			onChange={mockChangeHandler}
		/>);

		await user.tab();
		await user.tab();

		expect(mockBlurHandler).toHaveBeenCalledTimes(1);
	});

	it('when isDisabled toggler becomes inactive', async () => {
		const mockChangeHandler = jest.fn();
		const user = userEvent.setup();
		render(<Toggle
			id='toggle'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			isDisabled
			onChange={mockChangeHandler}
		/>);

		await user.click(screen.getByRole<HTMLInputElement>('switch'));

		expect(mockChangeHandler).toHaveBeenCalledTimes(0);
	});

	it('if labelHidden is true then the label is shown only for screen readers', () => {
		const mockChangeHandler = jest.fn();
		render(<Toggle
			id='toggle'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			labelHidden
			onChange={mockChangeHandler}
		/>);

		expect(screen.getByText<HTMLLabelElement>('toggle')).toHaveClass('sr-only');
	});

	it('is a basic snapshot', () => {
		const mockChangeHandler = jest.fn();
		render(<Toggle
			id='toggle'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			onChange={mockChangeHandler}
		/>);

		expect(screen.getByTestId<HTMLDivElement>('toggle')).toMatchSnapshot();
	});

	it('snapshot with size equal to "regular"', () => {
		const mockChangeHandler = jest.fn();
		render(<Toggle
			id='toggle'
			size='regular'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			onChange={mockChangeHandler}
		/>);

		expect(screen.getByTestId<HTMLDivElement>('toggle')).toMatchSnapshot();
	});

	it('snapshot with size equal to "large"', () => {
		const mockChangeHandler = jest.fn();
		render(<Toggle
			id='toggle'
			size='large'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			onChange={mockChangeHandler}
		/>);

		expect(screen.getByTestId<HTMLDivElement>('toggle')).toMatchSnapshot();
	});

	it('snapshot with appearance equal to "primary"', () => {
		const mockChangeHandler = jest.fn();
		render(<Toggle
			id='toggle'
			appearance='primary'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			onChange={mockChangeHandler}
		/>);

		expect(screen.getByTestId<HTMLDivElement>('toggle')).toMatchSnapshot();
	});

	it('snapshot with appearance equal to "secondary"', () => {
		const mockChangeHandler = jest.fn();
		render(<Toggle
			id='toggle'
			appearance='secondary'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			onChange={mockChangeHandler}
		/>);

		expect(screen.getByTestId<HTMLDivElement>('toggle')).toMatchSnapshot();
	});

	it('snapshot with appearance equal to "warning"', () => {
		const mockChangeHandler = jest.fn();
		render(<Toggle
			id='toggle'
			appearance='warning'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			onChange={mockChangeHandler}
		/>);

		expect(screen.getByTestId<HTMLDivElement>('toggle')).toMatchSnapshot();
	});

	it('snapshot with appearance equal to "danger"', () => {
		const mockChangeHandler = jest.fn();
		render(<Toggle
			id='toggle'
			appearance='danger'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			onChange={mockChangeHandler}
		/>);

		expect(screen.getByTestId<HTMLDivElement>('toggle')).toMatchSnapshot();
	});

	it('snapshot with appearance equal to "success"', () => {
		const mockChangeHandler = jest.fn();
		render(<Toggle
			id='toggle'
			appearance='success'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			onChange={mockChangeHandler}
		/>);

		expect(screen.getByTestId<HTMLDivElement>('toggle')).toMatchSnapshot();
	});

	it('snapshot with labelHidden set to true', () => {
		const mockChangeHandler = jest.fn();
		render(<Toggle
			id='toggle'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			labelHidden
			onChange={mockChangeHandler}
		/>);

		expect(screen.getByTestId<HTMLDivElement>('toggle')).toMatchSnapshot();
	});

	it('snapshot with isDisabled set to true', () => {
		const mockChangeHandler = jest.fn();
		render(<Toggle
			id='toggle'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			isDisabled
			onChange={mockChangeHandler}
		/>);

		expect(screen.getByTestId<HTMLDivElement>('toggle')).toMatchSnapshot();
	});

	it('snapshot with icons', () => {
		const mockChangeHandler = jest.fn();
		render(<Toggle
			id='toggle'
			name='toggle'
			label='toggle'
			value='value'
			testId='toggle'
			isChecked={false}
			labelHidden
			onChange={mockChangeHandler}
			checkedIcon={<AddIcon />}
			uncheckedIcon={<MinusIcon />}
		/>);

		expect(screen.getByTestId<HTMLDivElement>('toggle')).toMatchSnapshot();
	});
});