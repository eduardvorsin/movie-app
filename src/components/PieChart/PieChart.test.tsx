import { render, screen } from "@testing-library/react";
import PieChart, { Props } from "./PieChart";

const appearances: NonNullable<Props['appearance']>[] = ['primary', 'rating'];

describe('PieChart tests', () => {
	it('is rendered correctly', () => {
		render(
			<PieChart
				value={50}
				size={50}
				testId='test-pie-chart'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-pie-chart')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(
			<PieChart
				value={50}
				size={50}
				testId='test-pie-chart'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-pie-chart')).toMatchSnapshot();
	});

	it.each(appearances)('a snapshot with appearance equal to %s', (appearance) => {
		render(
			<PieChart
				value={50}
				size={50}
				appearance={appearance}
				testId='test-pie-chart'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-pie-chart')).toMatchSnapshot();
	});
});