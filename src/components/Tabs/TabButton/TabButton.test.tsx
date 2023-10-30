import { render, screen } from '@testing-library/react';
import TabButton from './TabButton';
import userEvent from '@testing-library/user-event';

describe('TabButton tests', () => {
	it('is rendered correctly', () => {
		render(
			<TabButton
				id='test-tab-button'
				label='test-tab-button'
				ariaControls='tab-panel-0'
				index={0}
				isActive={false}
				onClick={() => { }}
				onKeyDown={() => { }}
			/>
		);

		expect(screen.getByRole<HTMLButtonElement>('tab')).toBeInTheDocument();
	});

	it('when you click on the button, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<TabButton
				id='test-tab-button'
				label='test-tab-button'
				ariaControls='tab-panel-0'
				index={0}
				isActive={false}
				onClick={mockFn}
				onKeyDown={() => { }}
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('tab'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('when you press any key, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<TabButton
				id='test-tab-button'
				label='test-tab-button'
				ariaControls='tab-panel-0'
				index={0}
				isActive={true}
				onClick={() => { }}
				onKeyDown={mockFn}
			/>
		);

		await user.tab();
		await user.keyboard('[ArrowUp]');

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('if isDisabled is true, then the button becomes inactive', async () => {
		const user = userEvent.setup();
		const clickMockFn = jest.fn();
		const keyDownMockFn = jest.fn();
		render(
			<TabButton
				id='test-tab-button'
				label='test-tab-button'
				ariaControls='tab-panel-0'
				index={0}
				isActive={true}
				onClick={clickMockFn}
				onKeyDown={keyDownMockFn}
				isDisabled
			/>
		);
		await user.tab();
		await user.keyboard('[ArrowUp]');
		await user.click(screen.getByRole<HTMLButtonElement>('tab'));

		expect(clickMockFn).toHaveBeenCalledTimes(0);
		expect(keyDownMockFn).toHaveBeenCalledTimes(0);
	});

	it('is a basic snapshot', () => {
		render(
			<TabButton
				id='test-tab-button'
				label='test-tab-button'
				ariaControls='tab-panel-0'
				index={0}
				isActive={false}
				onClick={() => { }}
				onKeyDown={() => { }}
			/>
		);

		expect(screen.getByRole<HTMLButtonElement>('tab')).toMatchSnapshot();
	});

	it('snapshot with isDisabled set to true', () => {
		render(
			<TabButton
				id='test-tab-button'
				label='test-tab-button'
				ariaControls='tab-panel-0'
				index={0}
				isActive={false}
				isDisabled
				onClick={() => { }}
				onKeyDown={() => { }}
			/>
		);

		expect(screen.getByRole<HTMLButtonElement>('tab')).toMatchSnapshot();
	});

	it('snapshot with isActive equal to true', () => {
		render(
			<TabButton
				id='test-tab-button'
				label='test-tab-button'
				ariaControls='tab-panel-0'
				index={0}
				isActive={true}
				onClick={() => { }}
				onKeyDown={() => { }}
			/>
		);

		expect(screen.getByRole<HTMLButtonElement>('tab')).toMatchSnapshot();
	});
});