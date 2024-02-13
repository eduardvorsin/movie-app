import { render, screen } from "@testing-library/react";
import CollectionCard from "./CollectionCard";

describe('CollectionCard tests', () => {
	it('is rendered correctly', () => {
		render(
			<CollectionCard
				src='/assets/images/collection-marvel.webp'
				href='/'
				alt='collection image'
				title='collection title'
				testId='test-collection-card'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-collection-card')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(
			<CollectionCard
				src='/assets/images/collection-marvel.webp'
				href='/'
				alt='collection image'
				title='collection title'
				testId='test-collection-card'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-collection-card')).toMatchSnapshot();
	});
});