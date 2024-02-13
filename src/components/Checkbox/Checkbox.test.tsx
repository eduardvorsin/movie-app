import { render, screen } from "@testing-library/react";
import Checkbox, { Props } from "./Checkbox";
import userEvent from "@testing-library/user-event";

const sizes: NonNullable<Props['size']>[] = ['small', 'medium', 'large', 'xlarge'];

describe('Checkbox tests', () => {
	it('is rendered correctly', () => {
		render(
			<Checkbox
				id='test-checkbox'
				name='test-checkbox'
				label='test-checkbox'
				value=''
				onChange={() => { }}
				isChecked={true}
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('checkbox')).toBeInTheDocument();
	});

	it('when the focus is received, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();

		render(
			<Checkbox
				id='test-checkbox'
				name='test-checkbox'
				label='test-checkbox'
				value=''
				onChange={() => { }}
				onFocus={mockFn}
				isChecked={true}
			/>
		);

		await user.tab();

		expect(mockFn).toHaveBeenCalledTimes(1);
	});


	it('when the focus is lost, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();

		render(
			<Checkbox
				id='test-checkbox'
				name='test-checkbox'
				label='test-checkbox'
				value=''
				onChange={() => { }}
				onBlur={mockFn}
				isChecked={true}
			/>
		);

		await user.tab();
		await user.click(document.body);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('when clicked, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();

		render(
			<Checkbox
				id='test-checkbox'
				name='test-checkbox'
				label='test-checkbox'
				value=''
				onChange={mockFn}
				isChecked={true}
			/>
		);

		await user.click(screen.getByRole<HTMLInputElement>('checkbox'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('if the value in the error sample is not empty, then the error element should be displayed.', () => {
		render(
			<Checkbox
				id='test-checkbox'
				name='test-checkbox'
				label='test-checkbox'
				value=''
				error='mock error'
				onChange={() => { }}
				isChecked={true}
			/>
		);

		expect(screen.getByText<HTMLParagraphElement>(/mock error/i)).toBeInTheDocument();
	});

	it('if isDisabled is true then the checkbox becomes inactive', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();

		render(
			<Checkbox
				id='test-checkbox'
				name='test-checkbox'
				label='test-checkbox'
				value=''
				onChange={() => { }}
				isChecked={true}
			/>
		);

		await user.click(screen.getByRole<HTMLInputElement>('checkbox'));

		expect(mockFn).toHaveBeenCalledTimes(0);
	});

	it('if isRequired is true then an asterisk should appear in the label', () => {

		render(
			<Checkbox
				id='test-checkbox'
				name='test-checkbox'
				label='test-checkbox'
				value=''
				isRequired
				onChange={() => { }}
				isChecked={true}
			/>
		);

		expect(screen.getByText<HTMLSpanElement>('*')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(
			<Checkbox
				id='test-checkbox'
				name='test-checkbox'
				label='test-checkbox'
				value=''
				onChange={() => { }}
				isChecked={true}
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('checkbox')).toMatchSnapshot();
	});

	it.each(sizes)('is a snapshot with the "%s" size type', (size) => {
		render(
			<Checkbox
				id='test-checkbox'
				name='test-checkbox'
				label='test-checkbox'
				value=''
				size={size}
				onChange={() => { }}
				isChecked={true}
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('checkbox')).toMatchSnapshot();
	});

	it('is a snapshot with error element', () => {
		render(
			<Checkbox
				id='test-checkbox'
				name='test-checkbox'
				label='test-checkbox'
				value=''
				error='mock error'
				onChange={() => { }}
				isChecked={true}
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('checkbox')).toMatchSnapshot();
	});

	it('is snapshot with isRequired equal to true', () => {
		render(
			<Checkbox
				id='test-checkbox'
				name='test-checkbox'
				label='test-checkbox'
				value=''
				isRequired
				onChange={() => { }}
				isChecked={true}
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('checkbox')).toMatchSnapshot();
	});

	it('is snapshot with isDisabled equal to true', () => {
		render(
			<Checkbox
				id='test-checkbox'
				name='test-checkbox'
				label='test-checkbox'
				value=''
				isDisabled
				onChange={() => { }}
				isChecked={true}
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('checkbox')).toMatchSnapshot();
	});

	it('is snapshot with isInvalid equal to true', () => {
		render(
			<Checkbox
				id='test-checkbox'
				name='test-checkbox'
				label='test-checkbox'
				isInvalid
				value=''
				onChange={() => { }}
				isChecked={true}
			/>
		);

		expect(screen.getByRole<HTMLInputElement>('checkbox')).toMatchSnapshot();
	});
});