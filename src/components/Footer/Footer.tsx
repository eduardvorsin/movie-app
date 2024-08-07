import { GeneralProps } from '@/types/shared';
import Logo from '../Logo/Logo';
import Container from '../Container/Container';
import SocialLinks from '../SocialLinks/SocialLinks';
import { createSocialNetworksArray } from '@/helpers/createSocialNetworksArray/createSocialNetworksArray';
import { NavigationRoutes, navigationRoutes } from '@/constants';
import Link from '../Link/Link';
import Title from '../Title/Title';
import ThemedImage from '../ThemedImage/ThemedImage';

const socialNetworks = createSocialNetworksArray({
	imdb_id: null,
	facebook_id: ' ',
	instagram_id: ' ',
	tiktok_id: ' ',
	twitter_id: ' ',
	youtube_id: ' ',
});

export type Props = {
	dictionary: {
		aboutTitle: string,
		description: string,
		sectionsTitle: string,
		basedOnTitle: string,
		logo: Record<'altText' | 'linkText', string>,
		navigation: Record<'movies' | 'persons' | 'tv' | 'new' | 'collections', string>,
	},
} & GeneralProps;

export default function Footer({
	className,
	testId,
	dictionary,
}: Props) {
	const classes = [
		'flex-shrink relative z-100 bg-neutral-300 dark:bg-dark-neutral-300 py-5 lg:py-8 transition-colors duration-150',
		className,
	].join(' ');

	return (
		<footer
			className={classes}
			data-testid={testId}
		>
			<Container className='flex flex-wrap sm:flex-nowrap justify-between gap-5 sm:gap-6 md:gap-10'>
				<section className='basis-full sm:basis-[360px] grow-0 shrink'>
					<Title
						className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
						level={3}
						as='h2'
					>
						{dictionary.aboutTitle}
					</Title>

					<Logo
						size='large'
						className='max-w-[80px] lg:max-w-[110px] h-auto mb-3'
						dictionary={dictionary.logo}
					/>

					<p className='text-neutral-1000 dark:text-dark-neutral-900 mb-5 transition-colors duration-150'>
						{dictionary.description}
					</p>

					<SocialLinks
						data={socialNetworks}
						isRounded
					/>
				</section>

				<section className='basis-full xs:basis-[calc(50%-10px)] sm:basis-[200px] grow-0 shrink'>
					<Title
						className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
						level={3}
						as='h2'
					>
						{dictionary.sectionsTitle}
					</Title>

					<nav>
						<ul className='flex flex-col gap-2'>
							{(Object.keys(navigationRoutes) as Array<keyof NavigationRoutes>).map((route) => (
								<li key={route}>
									<Link
										appearance='secondary'
										className={'inline-flex text-200 font-medium lowercase break-all'}
										href={navigationRoutes[route]}
									>
										{dictionary.navigation[route]}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</section>

				<section className='basis-full xs:basis-[calc(50%-10px)] sm:basis-[280px] grow-0 shrink'>
					<Title
						className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
						level={3}
						as='h2'
					>
						{dictionary.basedOnTitle}
					</Title>

					<Link
						href='https://www.themoviedb.org/'
						isExternal
					>
						<ThemedImage
							className='max-w-[140px] lg:max-w-[185px] h-auto'
							width={185}
							height={133}
							alt='tmdb logo'
							src={'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'}
						/>
					</Link>
				</section>
			</Container>
		</footer >
	);
}