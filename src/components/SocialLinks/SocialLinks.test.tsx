import { render, screen } from "@testing-library/react";
import SocialLinks from "./SocialLinks";
import { createSocialNetworksArray } from "@/helpers/createSocialNetworksArray/createSocialNetworksArray";

const mockData = createSocialNetworksArray({
	imdb_id: null,
	facebook_id: ' ',
	instagram_id: ' ',
	tiktok_id: ' ',
	twitter_id: ' ',
	youtube_id: ' ',
});

describe('SocialLinks tests', () => {
	it('is rendered correctly', () => {
		render(
			<SocialLinks
				data={mockData}
				testId='test-social-links'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-social-links')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(
			<SocialLinks
				data={mockData}
				testId='test-social-links'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-social-links')).toMatchSnapshot();
	});

	it('a snapshot with isRounded set to true', () => {
		render(
			<SocialLinks
				data={mockData}
				isRounded
				testId='test-social-links'
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-social-links')).toMatchSnapshot();
	});
});