import { render, screen } from "@testing-library/react";
import Popup, { Props } from "./Popup";

const placements: NonNullable<Props['placement']>[] = ['left-start', 'left', 'left-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-start', 'bottom', 'bottom-end'];

describe('Popup tests', () => {
	it('is rendered correctly', () => {
		const mockFn = jest.fn();
		render(
			<Popup
				id='test-popup'
				isOpen={true}
				trigger={<button onClick={mockFn}>test trigger</button>}
				testId='test-popup'
			>
				test content
			</Popup>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-popup')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		const mockFn = jest.fn();
		render(
			<Popup
				id='test-popup'
				isOpen={true}
				trigger={<button onClick={mockFn}>test trigger</button>}
				testId='test-popup'
			>
				test content
			</Popup>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-popup')).toMatchSnapshot();
	});

	it.each(placements)('a snapshot with placement equal to %s', (placement) => {
		const mockFn = jest.fn();
		render(
			<Popup
				id='test-popup'
				isOpen={true}
				placement={placement}
				trigger={<button onClick={mockFn}>test trigger</button>}
				testId='test-popup'
			>
				test content
			</Popup>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-popup')).toMatchSnapshot();
	});

	it('is a snapshot with lockScroll set to true', () => {
		const mockFn = jest.fn();
		render(
			<Popup
				id='test-popup'
				isOpen={true}
				lockScroll
				trigger={<button onClick={mockFn}>test trigger</button>}
				testId='test-popup'
			>
				test content
			</Popup>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-popup')).toMatchSnapshot();
	});

	it('is a snapshot with the specified offsetX and offsetY', () => {
		const mockFn = jest.fn();
		render(
			<Popup
				id='test-popup'
				isOpen={true}
				offsetX={50}
				offsetY={100}
				trigger={<button onClick={mockFn}>test trigger</button>}
				testId='test-popup'
			>
				test content
			</Popup>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-popup')).toMatchSnapshot();
	});
});