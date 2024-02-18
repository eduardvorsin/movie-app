import { render, screen } from "@testing-library/react";
import RatingItem from "./RatingItem";

describe('RatingItem tests', () => {
	it('is rendered correctly', () => {
		render(
			<RatingItem
				src='/assets/images/movie-card-placeholder-l-v.svg'
				id={0}
				title='test rating item'
				testId='test-rating-item'
				element='div'
			>
				test content
			</RatingItem>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-rating-item')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(
			<RatingItem
				src='/assets/images/movie-card-placeholder-l-v.svg'
				id={0}
				title='test rating item'
				testId='test-rating-item'
				element='div'
			>
				test content
			</RatingItem>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-rating-item')).toMatchSnapshot();
	});

	it('a snapshot with isOrdered set to true', () => {
		render(
			<RatingItem
				src='/assets/images/movie-card-placeholder-l-v.svg'
				id={0}
				title='test rating item'
				testId='test-rating-item'
				isOrdered
				element='div'
			>
				test content
			</RatingItem>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-rating-item')).toMatchSnapshot();
	});
});