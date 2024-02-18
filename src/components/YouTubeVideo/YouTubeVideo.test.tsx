import { render, screen } from "@testing-library/react";
import YouTubeVideo from "./YouTubeVideo";
import i18next from "@/i18n/client";
import I18nextWrapper from "@/test-utils/I18nextWrapper";
import userEvent from "@testing-library/user-event";

describe('YouTubeVideo tests', () => {
	it('is rendered correctly', async () => {
		const dictionary = { playButton: 'To watch' };
		render(
			<YouTubeVideo
				width={386}
				height={217}
				key={'KLuTLF3x9sA'}
				videoId={'KLuTLF3x9sA'}
				title='test title'
				loading='lazy'
				posterAlt='test-youtube-video'
				dictionary={dictionary}
				testId='test-youtube-video'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-youtube-video')).toBeInTheDocument();
	});

	it('is a basic snapshot', async () => {
		const dictionary = { playButton: 'To watch' };
		render(
			<YouTubeVideo
				width={386}
				height={217}
				key={'KLuTLF3x9sA'}
				videoId={'KLuTLF3x9sA'}
				title='test title'
				loading='lazy'
				posterAlt='test-youtube-video'
				dictionary={dictionary}
				testId='test-youtube-video'
			/>
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-youtube-video')).toMatchSnapshot();
	});

	it('is a snapshot of when the video uploaded', async () => {
		const user = userEvent.setup();

		const dictionary = { playButton: 'To watch' };
		render(
			<YouTubeVideo
				width={386}
				height={217}
				key={'KLuTLF3x9sA'}
				videoId={'KLuTLF3x9sA'}
				title='test title'
				loading='lazy'
				posterAlt='test-youtube-video'
				dictionary={dictionary}
				testId='test-youtube-video'
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button'));

		expect(await screen.findByTestId<HTMLDivElement>('test-youtube-video')).toMatchSnapshot();
	});

	it('is a snapshot when showControls is false', async () => {
		const user = userEvent.setup();

		const dictionary = { playButton: 'To watch' };
		render(
			<YouTubeVideo
				width={386}
				height={217}
				key={'KLuTLF3x9sA'}
				videoId={'KLuTLF3x9sA'}
				title='test title'
				loading='lazy'
				posterAlt='test-youtube-video'
				showControls={false}
				dictionary={dictionary}
				testId='test-youtube-video'
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button'));

		expect(await screen.findByTestId<HTMLDivElement>('test-youtube-video')).toMatchSnapshot();
	});

	it('is a snapshot when muted is true', async () => {
		const user = userEvent.setup();

		const dictionary = { playButton: 'To watch' };
		render(
			<YouTubeVideo
				width={386}
				height={217}
				key={'KLuTLF3x9sA'}
				videoId={'KLuTLF3x9sA'}
				title='test title'
				loading='lazy'
				posterAlt='test-youtube-video'
				muted
				dictionary={dictionary}
				testId='test-youtube-video'
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button'));

		expect(await screen.findByTestId<HTMLDivElement>('test-youtube-video')).toMatchSnapshot();
	});

	it('is a snapshot when the value for startTime is set', async () => {
		const user = userEvent.setup();

		const dictionary = { playButton: 'To watch' };
		render(
			<YouTubeVideo
				width={386}
				height={217}
				key={'KLuTLF3x9sA'}
				videoId={'KLuTLF3x9sA'}
				title='test title'
				loading='lazy'
				posterAlt='test-youtube-video'
				startTime={50}
				dictionary={dictionary}
				testId='test-youtube-video'
			/>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button'));

		expect(await screen.findByTestId<HTMLDivElement>('test-youtube-video')).toMatchSnapshot();
	});
});

describe('YouTubeVideo integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('youTubeVideo.playButton'));
		const dictionary = { playButton: i18next.t('youTubeVideo.playButton') };

		render(
			<YouTubeVideo
				width={386}
				height={217}
				key={'KLuTLF3x9sA'}
				videoId={'KLuTLF3x9sA'}
				title='test title'
				loading='lazy'
				posterAlt='test-youtube-video'
				dictionary={dictionary}
				testId='test-youtube-video'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByRole<HTMLButtonElement>('button', { name: translation })).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('youTubeVideo.playButton'));
		const dictionary = { playButton: i18next.t('youTubeVideo.playButton') };

		render(
			<YouTubeVideo
				width={386}
				height={217}
				key={'KLuTLF3x9sA'}
				videoId={'KLuTLF3x9sA'}
				title='test title'
				loading='lazy'
				posterAlt='test-youtube-video'
				dictionary={dictionary}
				testId='test-youtube-video'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByRole<HTMLButtonElement>('button', { name: translation })).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');
		const dictionary = { playButton: i18next.t('youTubeVideo.playButton') };

		render(
			<YouTubeVideo
				width={386}
				height={217}
				key={'KLuTLF3x9sA'}
				videoId={'KLuTLF3x9sA'}
				title='test title'
				loading='lazy'
				posterAlt='test-youtube-video'
				dictionary={dictionary}
				testId='test-youtube-video'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-youtube-video')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');
		const dictionary = { playButton: i18next.t('youTubeVideo.playButton') };

		render(
			<YouTubeVideo
				width={386}
				height={217}
				key={'KLuTLF3x9sA'}
				videoId={'KLuTLF3x9sA'}
				title='test title'
				loading='lazy'
				posterAlt='test-youtube-video'
				dictionary={dictionary}
				testId='test-youtube-video'
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-youtube-video')).toMatchSnapshot();
	});
});