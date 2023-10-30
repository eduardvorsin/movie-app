import { render, screen } from '@testing-library/react';
import TabPanel from './TabPanel';

describe('TabPanel tests', () => {
	it('is rendered correctly', () => {
		render(
			<TabPanel
				testId='test-tab-panel'
				label='test-label'
			>
				test content
			</TabPanel>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-tab-panel')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(
			<TabPanel
				testId='test-tab-panel'
				label='test-label'
			>
				test content
			</TabPanel>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-tab-panel')).toMatchSnapshot();
	});
});

