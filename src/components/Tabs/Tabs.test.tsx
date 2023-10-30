import { render, screen } from '@testing-library/react';
import Tabs from './Tabs';
import TabPanel from './TabPanel/TabPanel';
import userEvent from '@testing-library/user-event';

describe('Tabs tests', () => {
	it('is rendered correctly', () => {
		render(
			<Tabs
				id='tabs'
				onSelect={() => { }}
				testId='test-tabs'
			>
				<TabPanel label='apple'>apple</TabPanel>
				<TabPanel label='banana'>banana</TabPanel>
				<TabPanel label='orange'>orange</TabPanel>
			</Tabs>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-tabs')).toBeInTheDocument();
	});

	it('when you click on the tab button, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<Tabs
				id='tabs'
				onSelect={mockFn}
				testId='test-tabs'
			>
				<TabPanel label='apple'>apple</TabPanel>
				<TabPanel label='banana'>banana</TabPanel>
				<TabPanel label='orange'>orange</TabPanel>
			</Tabs>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('tab', { name: /orange/i }));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('if isDisabled is true then the tab buttons become inactive', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<Tabs
				id='tabs'
				onSelect={mockFn}
				isDisabled
				testId='test-tabs'
			>
				<TabPanel label='apple'>apple</TabPanel>
				<TabPanel label='banana'>banana</TabPanel>
				<TabPanel label='orange'>orange</TabPanel>
			</Tabs>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('tab', { name: /orange/i }));

		expect(mockFn).toHaveBeenCalledTimes(0);
	});

	it('switch to the next tab when arrow right is pressed', async () => {
		const user = userEvent.setup();

		render(
			<Tabs
				id='tabs'
				onSelect={() => { }}
				testId='test-tabs'
			>
				<TabPanel label='apple'>apple</TabPanel>
				<TabPanel label='banana'>banana</TabPanel>
				<TabPanel label='orange'>orange</TabPanel>
			</Tabs>
		);

		await user.tab();
		expect(screen.getByRole<HTMLButtonElement>('tab', { name: /apple/i })).toHaveFocus();

		await user.keyboard('[ArrowRight]');

		expect(screen.getByRole<HTMLButtonElement>('tab', { name: /banana/i })).toHaveFocus();
	});

	it('switch to the previous tab when arrow left is pressed', async () => {
		const user = userEvent.setup();

		render(
			<Tabs
				id='tabs'
				onSelect={() => { }}
				testId='test-tabs'
			>
				<TabPanel label='apple'>apple</TabPanel>
				<TabPanel label='banana'>banana</TabPanel>
				<TabPanel label='orange'>orange</TabPanel>
			</Tabs>
		);

		await user.tab();
		expect(screen.getByRole<HTMLButtonElement>('tab', { name: /apple/i })).toHaveFocus();

		await user.keyboard('[ArrowLeft]');

		expect(screen.getByRole<HTMLButtonElement>('tab', { name: /orange/i })).toHaveFocus();
	});

	it('switch to the first tab when home is pressed', async () => {
		const user = userEvent.setup();

		render(
			<Tabs
				id='tabs'
				onSelect={() => { }}
				testId='test-tabs'
				defaultSelected={2}
			>
				<TabPanel label='apple'>apple</TabPanel>
				<TabPanel label='banana'>banana</TabPanel>
				<TabPanel label='orange'>orange</TabPanel>
			</Tabs>
		);

		await user.tab();
		expect(screen.getByRole<HTMLButtonElement>('tab', { name: /orange/i })).toHaveFocus();

		await user.keyboard('[Home]');

		expect(screen.getByRole<HTMLButtonElement>('tab', { name: /apple/i })).toHaveFocus();
	});

	it('switch to the last tab when end is pressed', async () => {
		const user = userEvent.setup();

		render(
			<Tabs
				id='tabs'
				onSelect={() => { }}
				testId='test-tabs'
			>
				<TabPanel label='apple'>apple</TabPanel>
				<TabPanel label='banana'>banana</TabPanel>
				<TabPanel label='orange'>orange</TabPanel>
			</Tabs>
		);

		await user.tab();
		expect(screen.getByRole<HTMLButtonElement>('tab', { name: /apple/i })).toHaveFocus();

		await user.keyboard('[End]');

		expect(screen.getByRole<HTMLButtonElement>('tab', { name: /orange/i })).toHaveFocus();
	});

	it('is a basic shapshot', () => {
		render(
			<Tabs
				id='tabs'
				onSelect={() => { }}
				testId='test-tabs'
			>
				<TabPanel label='apple'>apple</TabPanel>
				<TabPanel label='banana'>banana</TabPanel>
				<TabPanel label='orange'>orange</TabPanel>
			</Tabs>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-tabs')).toMatchSnapshot();
	});

	it('is a snapshot with isDisabled set to true', () => {
		render(
			<Tabs
				id='tabs'
				onSelect={() => { }}
				testId='test-tabs'
				isDisabled
			>
				<TabPanel label='apple'>apple</TabPanel>
				<TabPanel label='banana'>banana</TabPanel>
				<TabPanel label='orange'>orange</TabPanel>
			</Tabs>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-tabs')).toMatchSnapshot();
	});

	it('is a snapshot with fitted set to true', () => {
		render(
			<Tabs
				id='tabs'
				onSelect={() => { }}
				testId='test-tabs'
				fitted
			>
				<TabPanel label='apple'>apple</TabPanel>
				<TabPanel label='banana'>banana</TabPanel>
				<TabPanel label='orange'>orange</TabPanel>
			</Tabs>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-tabs')).toMatchSnapshot();
	});
});