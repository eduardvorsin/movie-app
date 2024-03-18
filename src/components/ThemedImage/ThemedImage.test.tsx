import { render, screen } from "@testing-library/react";
import ThemedImage from "./ThemedImage";

describe('ThemedImage tests', () => {
	it('is rendered correctly', () => {
		render(
			<ThemedImage
				width={100}
				height={100}
				alt='test-themed-image'
				src='/assets/images/movie-card-placeholder-l-v.svg'
				testId='test-themed-image'
			/>
		);

		expect(screen.getByAltText<HTMLImageElement>('test-themed-image')).toBeInTheDocument();
	});

	it('if src.length is 0, then the image from the fallback property is rendered', () => {
		render(
			<ThemedImage
				width={100}
				height={100}
				alt='test-themed-image'
				src=''
				fallback={{
					light: '/assets/images/movie-card-placeholder-l-v.svg',
					dark: '/assets/images/movie-card-placeholder-d-v.svg',
				}}
				testId='test-themed-image'
			/>
		);

		expect(screen.getByAltText<HTMLImageElement>('test-themed-image').src).toMatch(/movie-card-placeholder/i);
	});

	it('if the dark theme is enabled, the image from the darkSrc property is rendered', () => {
		render(
			<ThemedImage
				width={100}
				height={100}
				alt='test-themed-image'
				src=''
				darkSrc='/assets/images/movie-card-placeholder-d-v.svg'
				testId='test-themed-image'
			/>
		);

		expect(screen.getByAltText<HTMLImageElement>('test-themed-image').src).toMatch(/movie-card-placeholder/i);
	})

	it('is a basic snapshot', () => {
		render(
			<ThemedImage
				width={100}
				height={100}
				alt='test-themed-image'
				src='/assets/images/movie-card-placeholder-l-v.svg'
				testId='test-themed-image'
			/>
		);

		expect(screen.getByAltText<HTMLImageElement>('test-themed-image')).toMatchSnapshot();
	});

	it('is a snapshot with a fallback', () => {
		render(
			<ThemedImage
				width={100}
				height={100}
				alt='test-themed-image'
				src=''
				fallback={{
					light: '/assets/images/movie-card-placeholder-l-v.svg',
					dark: '/assets/images/movie-card-placeholder-d-v.svg',
				}}
			/>
		);

		expect(screen.getByAltText<HTMLImageElement>('test-themed-image')).toMatchSnapshot();
	});

	it('is a snapshot with showSkeleton set to true', () => {
		render(
			<ThemedImage
				width={100}
				height={100}
				alt='test-themed-image'
				src='/'
				showSkeleton
				fallback={{
					light: '/assets/images/movie-card-placeholder-l-v.svg',
					dark: '/assets/images/movie-card-placeholder-d-v.svg',
				}}
			/>
		);

		expect(screen.getByAltText<HTMLImageElement>('test-themed-image')).toMatchSnapshot();
	});

	it('is a snapshot with darkSrc', () => {
		render(
			<ThemedImage
				width={100}
				height={100}
				alt='test-themed-image'
				src='/assets/images/movie-card-placeholder-d-v.svg'
				darkSrc='/assets/images/movie-card-placeholder-d-v.svg'
				testId='test-themed-image'
			/>
		);

		expect(screen.getByAltText<HTMLImageElement>('test-themed-image')).toMatchSnapshot();
	});
});