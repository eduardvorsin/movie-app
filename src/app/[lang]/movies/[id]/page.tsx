import CharacteristicList from '@/components/CharacteristicList/CharacteristicList';
import Container from '@/components/Container/Container';
import ExpandableText from '@/components/ExpandableText/ExpandableText';
import Link from '@/components/Link/Link';
import PersonCard from '@/components/PersonCard/PersonCard';
import { MovieRatingChart } from '@/components/PieChart/PieChart';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import ThemedImage from '@/components/ThemedImage/ThemedImage';
import Title from '@/components/Title/Title';
import { createCharacteristicsArray } from '@/helpers/createCharacteristicsArray/createCharacteristicsArray';
import { createSocialNetworksArray } from '@/helpers/createSocialNetworksArray/createSocialNetworksArray';
import { fetchImageWithPlaceholder } from '@/helpers/fetchImageWithPlaceholder/fetchImageWithPlaceholder';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { formatCurrency } from '@/i18n/utils/formatCurrency/formatCurrency';
import { getLanguageNameFromLocale } from '@/i18n/utils/getLanguageNameFromLocale/getLanguageNameFromLocale';
import { getLocalizedDate } from '@/i18n/utils/getLocalizedDate/getLocalizedDate';
import { fetchMovie } from '@/services/fetchMovie/fetchMovie';
import { notFound } from 'next/navigation';
import { authorsDepartments, authorsProfessions, imgPath, routes } from '@/constants';
import { HorizontalMovieCardsCarousel, PersonCardsCarousel, ReviewsCarousel } from '@/components/Carousel/Carousel';
import MovieCard from '@/components/MovieCard/MovieCard';
import { convertToTime } from '@/helpers/convertToTime/convertToTime';
import { fetchTrailersForMediaProject } from '@/services/fetchTrailersForMediaProject/fetchTrailersForMediaProject';
import YouTubeVideo from '@/components/YouTubeVideo/YouTubeVideo';
import Tabs from '@/components/Tabs/Tabs';
import TabPanel from '@/components/Tabs/TabPanel/TabPanel';
import Comment from '@/components/Comment/Comment';
import Avatar from '@/components/Avatar/Avatar';
import { nameToInitials } from '@/helpers/nameToInitials/nameToInitials';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { Metadata } from 'next';

export async function generateMetadata(
	{ params }: { params: { lang: Locales, id: string } },
): Promise<Metadata> {
	const movie = await fetchMovie(params.id, { lang: params.lang });

	if (!movie) notFound();

	return {
		title: movie.title,
		description: movie.overview,
	}
}

const characteristicFields = new Set([
	'production_countries',
	'genres',
	'original_title',
	'release_date',
	'runtime',
	'vote_average',
	'original_language',
	'budget',
	'revenue',
	'status'
]);

type Props = {
	params: {
		id: string,
		lang: Locales,
	}
}

export default async function Page({ params: { id, lang } }: Props) {
	const { t } = await fetchTranslation(lang);
	const [movie, trailers] = await Promise.all([
		await fetchMovie(id, { lang }),
		await fetchTrailersForMediaProject(Number(id), {
			type: 'movie',
			lang,
		}),
	]);

	if (!movie) {
		notFound();
	}

	const {
		production_countries,
		production_companies,
		runtime,
		backdrop_path,
		poster_path,
		release_date,
		genres,
		vote_average,
		tagline,
		overview,
		homepage,
		external_ids,
		credits,
		similar,
		recommendations,
		reviews,
		title,
		certification,
	} = movie;

	const [backgroundData, posterData] = await Promise.all([
		await fetchImageWithPlaceholder(
			`${imgPath['backdrop']}${backdrop_path}`,
			true
		),
		await fetchImageWithPlaceholder(
			`${imgPath['poster']}${poster_path}`,
			true,
		),
	]);

	const releaseYear = release_date?.slice(0, 4);
	const currentGenres = genres.slice(0, 3).map((genre) => genre.name.toLowerCase()).join(', ');
	const movieDuration = `${t('duration', { time: runtime })} | ${convertToTime(runtime)}`;
	const rating = Math.floor(vote_average * 10);

	const socialNetworks = createSocialNetworksArray({
		...external_ids,
		imdb_id: `title/${external_ids.imdb_id}`,
	});

	const characteristicData = createCharacteristicsArray({
		...movie,
		production_countries: production_countries[0]?.name ?? '-',
	})
		.filter((charateristic) => characteristicFields.has(charateristic.name))
		.map(({ name, value }) => {
			let currentValue = value;
			if (name === 'genres') {
				currentValue = currentGenres;
			} else if (name === 'release_date') {
				currentValue = getLocalizedDate(value, lang);
			} else if (name === 'original_language') {
				currentValue = getLanguageNameFromLocale(value, lang) ?? t('unknown');
			} else if (name === 'vote_average') {
				currentValue = `${rating.toString()}%`;
			} else if (name === 'runtime') {
				currentValue = movieDuration;
			} else if (name === 'budget' || name === 'revenue') {
				currentValue = formatCurrency(+value, lang);
			} else if (name === 'status') {
				currentValue = t(`characteristics.statusValue.${value.toLowerCase()}`);
			}

			return {
				name: t(`characteristics.${name}`),
				value: currentValue,
			}
		});

	const authors = credits.crew.filter(({ known_for_department, job }) => {
		return authorsDepartments.includes(known_for_department) && authorsProfessions.includes(job);
	});
	const availableTrailers = trailers?.results.filter(({ site }) => site === 'YouTube');
	const productionCompanies = production_companies
		.filter(({ logo_path }) => logo_path !== null && logo_path !== '');

	return (
		<main className='mt-[3.75rem] flex-grow'>
			<section
				className='overflow-hidden relative py-5 md:py-8'
			>
				{backdrop_path && (
					<ThemedImage
						className='aspect-[5/4] xs:aspect-video sm:w-full sm:h-full absolute top-0 left-0 -z-100 opacity-[0.25] dark:brightness-[0.25] dark:opacity-100 object-cover object-top transition-[filter,opacity] duration-150'
						src={backgroundData?.img.src ?? ''}
						placeholder={backdrop_path ? 'blur' : 'empty'}
						blurDataURL={backgroundData?.base64}
						width={1920}
						height={720}
						sizes='100vw'
						priority
						alt={title}
					/>
				)}

				<Container className='grid grid-cols-1 sm:grid-cols-[15.625rem_1fr] md:grid-cols-[16.875rem_1fr] lg:grid-cols-[18.75rem_1fr] sm:gap-x-6 md:gap-x-8 lg:gap-x-10'>
					<Breadcrumbs
						className='col-span-full mb-5 md:mb-8'
						label='breadcrumbs navigation'
						lastItemLabel={title}
					/>

					<ThemedImage
						className='mb-8 sm:mb-0 justify-self-center  overflow-hidden sm:justify-self-start object-cover rounded-2 max-w-[14.375rem] sm:max-w-full bg-neutral-300 dark:bg-dark-neutral-300 border-1 border-neutral-300 dark:border-dark-neutral-300 transition-colors duration-150'
						width={300}
						height={450}
						alt={`${title} poster`}
						placeholder={poster_path ? 'blur' : 'empty'}
						blurDataURL={posterData?.base64}
						priority
						sizes='(min-width: 1024px) 300px, (min-width: 768px) 270px, (min-width: 640px) 250px, 230px'
						src={posterData?.img.src ?? ''}
						fallback={{
							light: '/assets/images/movie-card-placeholder-l-v.svg',
							dark: '/assets/images/movie-card-placeholder-d-v.svg',
						}}
					/>

					<div>
						<div className='mb-5 lg:mb-6'>
							<Title
								className='mb-1'
								level={2}
								as='h1'
							>
								<Link
									href={homepage}
									isExternal
									target='_blank'
								>
									{title}
								</Link>
								<span
									className='text-neutral-900 dark:text-dark-neutral-800'
								>
									{releaseYear && releaseYear.length > 0 && (`(${releaseYear})`)}
								</span>
							</Title>

							<ul
								className='flex flex-wrap gap-y-1 text-neutral-900 dark:text-dark-neutral-900 transition-colors duration-150'
							>
								{release_date && release_date.length > 0 && (
									<li
										className='flex items-center after:content-["/"] after:mx-2 last:after:hidden last:after:mx-0'
									>
										{certification && (
											<span
												className='text-75 leading-none font-bold p-1 mr-2 uppercase border-1 border-neutral-900 dark:border-dark-neutral-800 text-neutral-900 dark:text-dark-neutral-800'
											>
												{certification}
											</span>
										)}
										{getLocalizedDate(release_date, lang)}
									</li>
								)}
								{currentGenres.length > 0 && (
									<li
										className='after:content-["/"] after:mx-2 last:after:hidden last:after:mx-0'
									>
										{currentGenres}
									</li>
								)}
								{movieDuration.length > 0 && (
									<li>
										{movieDuration}
									</li>
								)}
							</ul>
						</div>

						<div className='flex flex-wrap mb-4 gap-x-4 gap-y-3 md:gap-y-4 lg:gap-y-5'>
							<div className='flex items-center'>
								<span
									className='text-neutral-1000 dark:text-dark-neutral-900 font-medium mr-2 transition-colors duration-150'
								>
									{t('ratingLabel')}
								</span>
								<MovieRatingChart
									appearance='rating'
									size={60}
									value={rating}
								/>
							</div>

							<SocialLinks
								data={socialNetworks}
							/>
						</div>

						<div>
							{tagline && (
								<p
									className='text-neutral-900 dark:text-dark-neutral-700 italic mb-[0.625rem] transition-colors duration-150'
								>
									{tagline}
								</p>
							)}
							{overview.length > 0 && (
								<>
									<Title
										className='mb-2 text-neutral-900 dark:text-dark-neutral-800'
										level={3}
										as='h2'
									>
										{t('reviewTitle')}
									</Title>
									<ExpandableText
										className='mb-4 lg:mb-5'
										dictionary={{
											collapseButton: t('expandableText.collapseButton'),
											expandButton: t('expandableText.expandButton'),
										}}
									>
										{overview}
									</ExpandableText>
								</>
							)}

							<Title
								className='mb-2 text-neutral-900 dark:text-dark-neutral-800'
								level={3}
								as='h2'
							>
								{t('authors.title')}
							</Title>

							<ul
								className='text-neutral-1000 dark:text-dark-neutral-900'
							>
								{authors.slice(0, 4).map(({ job, name, id }) => (
									<li
										key={id}
										className='mb-1'
									>
										<Link
											className='font-bold'
											href={`${routes.persons}${id}`}
										>
											{name}
										</Link>
										<span className='mx-2'>—</span>
										<span>{t(`authors.jobs.${job.toLowerCase()}`)}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</Container>
			</section>

			<section className='py-5 md:py-8'>
				<Container className='flex flex-col gap-5 sm:gap-10 sm:flex-row'>
					<div className='grow shrink-0 lg:basis-1/2'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('aboutMovieTitle',)}
						</Title>
						<CharacteristicList
							data={characteristicData}
						/>
					</div>

					<div className='lg:basis-1/2'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('sponsorsTitle')}
						</Title>

						<div className='flex gap-4 flex-wrap'>
							{productionCompanies.map(({
								id,
								name,
								logo_path,
							}) => (
								<div
									key={id}
									className='basis-[8.125rem] lg:basis-[11.5625rem] relative h-[3.125rem] lg:h-[6.25rem]'
								>
									<ThemedImage
										className='object-contain'
										alt={t('companyLogo', { company_name: name })}
										sizes='185px'
										fill
										src={`${imgPath.logo}${logo_path}`}
									/>
								</div>
							))}
						</div>
					</div>
				</Container>
			</section>

			{credits.cast.length > 0 && (
				<section className='py-5 md:py-8'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('starringTitle')}
						</Title>

						<PersonCardsCarousel
							mousewheel
							spaceBetween={20}
							showScrollShadow
							showPagination
							paginationType='fraction'
							breakpoints={{
								0: {
									slidesPerView: 1,
								},
								375: {
									slidesPerView: 2,
								},
								480: {
									slidesPerView: 3,
								},
								640: {
									slidesPerView: 4,
								},
								768: {
									slidesPerView: 5,
								},
								1024: {
									slidesPerView: 6,
								}
							}}
						>
							{credits.cast.slice(0, 20).map(({
								id,
								profile_path,
								name,
								popularity,
								character
							}) => (
								<PersonCard
									className='mb-2 mx-auto'
									personId={id}
									key={id}
									src={profile_path ? `${imgPath['profileCard']}${profile_path}` : ''}
									alt={name}
									title={name}
									titleElement='h4'
									titleLevel={6}
									showRating
									rating={popularity}
									loading='lazy'
									dictionary={{ rating: t('personCard.rating') }}
								>
									{character}
								</PersonCard>
							))}
						</PersonCardsCarousel>
					</Container>
				</section>
			)}

			{availableTrailers && availableTrailers.length > 0 && (
				<section className='py-5 md:py-8'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('trailersTitle')}
						</Title>

						<Tabs id='trailers'>
							{availableTrailers.map((trailer) => (
								<TabPanel
									className='md:p-5'
									key={trailer.id}
									label={trailer.name}
								>
									<YouTubeVideo
										className='mx-auto'
										width={1156}
										height={650}
										videoId={trailer.key}
										title={trailer.name}
										loading='lazy'
										posterAlt={trailer.name}
										posterSizes='(min-width: 1230px) 1156px, 100vw'
										dictionary={{
											playButton: t('youTubeVideo.playButton'),
										}}
									/>
								</TabPanel>
							))}
						</Tabs>
					</Container>
				</section>
			)}

			{reviews.results.length > 0 && (
				<section className='py-5 md:py-8'>
					<Container>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('reviewsTitle')}
						</Title>

						<ReviewsCarousel
							mousewheel
							showPagination
							paginationType='progress'
							spaceBetween={20}
							showArrows
							breakpoints={{
								0: {
									slidesPerView: 1,
								},
								640: {
									slidesPerView: 2,
								},
								1024: {
									slidesPerView: 3,
								}
							}}
						>
							{reviews.results.map(({
								id,
								author,
								content,
								created_at,
								author_details,
							}) => (
								<Comment
									className='h-full xs:min-h-[241px]'
									key={id}
									id={id}
									author={author}
									content={content}
									type={'user review'}
									titleElement='h3'
									highlighted
									time={getLocalizedDate(created_at, lang)}
									rating={author_details.rating}
									dictionary={{
										ratingLabel: t('comment.ratingLabel'),
										edited: t('comment.edited'),
										savingText: t('comment.savingText'),
										expandableText: {
											expandButton: t('comment.expandButton'),
											collapseButton: t('comment.collapseButton'),
										}
									}}
									avatar={
										<Avatar
											size='large'
											src={author_details.avatar_path ? `${imgPath.avatar}${author_details.avatar_path}` : ''}
											initials={nameToInitials(author_details.name)}
											label={author_details.name}
										/>
									}
								/>
							))}
						</ReviewsCarousel>
					</Container>
				</section>
			)}

			{similar.results.length > 0 && (
				<section className='py-5 md:py-8'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('relatedMoviesTitle')}
						</Title>
						<HorizontalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='progress'
							breakpoints={{
								0: {
									slidesPerView: 1,
								},
								480: {
									slidesPerView: 2,
								},
								768: {
									slidesPerView: 3,
								},
								1024: {
									slidesPerView: 4,
								}
							}}
						>
							{similar.results.map(({
								id,
								backdrop_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									className='mx-auto md:mx-0'
									movieId={id}
									key={id}
									src={backdrop_path ? `${imgPath['movieCard_h']}${backdrop_path}` : ''}
									alt={title}
									title={title}
									titleElement='h4'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									loading='lazy'
									sizes='(min-width: 1230px) 285px, (min-width: 1024px) 25vw, (min-width: 768px) 33.3vw, (min-width: 480px) 50vw, 100vw'
								/>
							))}
						</HorizontalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{recommendations.results.length > 0 && (
				<section className='py-5 md:py-8'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('recommendationsTitle')}
						</Title>
						<HorizontalMovieCardsCarousel
							mousewheel
							slidesPerView={4}
							spaceBetween={20}
							showPagination
							paginationType='progress'
							breakpoints={{
								0: {
									slidesPerView: 1,
								},
								480: {
									slidesPerView: 2,
								},
								768: {
									slidesPerView: 3,
								},
								1024: {
									slidesPerView: 4,
								}
							}}
						>
							{recommendations.results.map(({
								id,
								backdrop_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									className='mx-auto md:mx-0'
									movieId={id}
									key={id}
									src={backdrop_path ? `${imgPath['backdrop']}${backdrop_path}` : ''}
									alt={title}
									title={title}
									titleElement='h4'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									loading='lazy'
									sizes='(min-width: 1230px) 285px, (min-width: 1024px) 25vw, (min-width: 768px) 33.3vw, (min-width: 480px) 50vw, 100vw'
								/>
							))}
						</HorizontalMovieCardsCarousel>
					</Container>
				</section>
			)}
		</main>
	);
}