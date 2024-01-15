import CharacteristicList from '@/components/CharacteristicList/CharacteristicList';
import Container from '@/components/Container/Container';
import ExpandableText from '@/components/ExpandableText/ExpandableText';
import Link from '@/components/Link/Link';
import PersonCard from '@/components/PersonCard/PersonCard';
import PieChart from '@/components/PieChart/PieChart';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import ThemedImage from '@/components/ThemedImage/ThemedImage';
import Title from '@/components/Title/Title';
import { createCharacteristicsArray } from '@/helpers/createCharacteristicsArray/createCharacteristicsArray';
import { createSocialNetworksArray } from '@/helpers/createSocialNetworksArray/createSocialNetworksArray';
import { fetchImageWithPlaceholder } from '@/helpers/fetchImageWithPlaceholder/fetchImageWithPlaceholder';
import { fetchTranslation } from '@/i18n/server';
import { Locales, regionsByLocales } from '@/i18n/settings';
import { getLanguageNameFromLocale } from '@/i18n/utils/getLanguageNameFromLocale/getLanguageNameFromLocale';
import { getLocalizedDate } from '@/i18n/utils/getLocalizedDate/getLocalizedDate';
import { notFound } from 'next/navigation';
import { authorsDepartments, authorsProfessions, imgPath, routes } from 'src/constants';
import Carousel from '@/components/Carousel/Carousel';
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
import { fetchTVSeries } from '@/services/fetchTVSeries/fetchTVSeries';

const characteristicFields = new Set([
	'production_countries',
	'genres',
	'original_name',
	'first_air_date',
	'last_air_date',
	'vote_average',
	'original_language',
	'number_of_episodes',
	'number_of_seasons',
	'status',
]);

type Props = {
	params: {
		id: string,
		lang: Locales,
	}
}

export default async function Page({ params: { id, lang } }: Props) {
	const { t } = await fetchTranslation(lang, ['tvSeriesDetailsPage', 'common']);
	const [tvSeries, trailers] = await Promise.all([
		await fetchTVSeries(id, {
			lang,
			includeAdditionalData: true,
		}),
		await fetchTrailersForMediaProject(Number(id), {
			type: 'tv',
			lang,
		}),
	]);

	if (!tvSeries) {
		notFound();
	}

	const {
		production_countries,
		production_companies,
		backdrop_path,
		poster_path,
		first_air_date,
		genres,
		vote_average,
		tagline,
		overview,
		homepage,
		last_episode_to_air,
		name,
		seasons,
		reviews,
		aggregate_credits,
		external_ids,
		similar,
		recommendations,
		content_ratings,
	} = tvSeries;

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

	const releaseYear = first_air_date.slice(0, 4);
	const currentGenres = genres.slice(0, 3).map((genre) => genre.name.toLowerCase()).join(', ');
	const tvSeriesDuration = `${t('duration', {
		time: last_episode_to_air.runtime
	})} | ${convertToTime(last_episode_to_air?.runtime ?? 0)}`;
	const rating = Math.floor(vote_average * 10);

	const socialNetworks = createSocialNetworksArray({
		...external_ids,
		imdb_id: `title/${external_ids.imdb_id}`,
	});

	const characteristicData = createCharacteristicsArray({
		...tvSeries,
		production_countries: production_countries[0]?.name ?? '-',
	}).filter((charateristic) => characteristicFields.has(charateristic.name))
		.map(({ name, value }) => {
			let currentValue = value;
			if (name === 'genres') {
				currentValue = currentGenres;
			} else if (name === 'first_air_date' || name === 'last_air_date') {
				currentValue = getLocalizedDate(value, lang);
			} else if (name === 'original_language') {
				currentValue = getLanguageNameFromLocale(value, lang) ?? t('unknown');
			} else if (name === 'vote_average') {
				currentValue = `${rating.toString()}%`;
			} else if (name === 'status') {
				currentValue = t(`characteristics.statusValue.${value.toLowerCase()}`);
			}

			return {
				name: t(`characteristics.${name}`),
				value: currentValue,
			}
		});

	const authors = aggregate_credits.crew.filter(({
		known_for_department,
		jobs,
	}) => {
		return authorsDepartments.includes(known_for_department) && authorsProfessions.includes(jobs[0].job);
	});

	const availableTrailers = trailers?.results.filter(({ site }) => site === 'YouTube');

	const productionCompanies = production_companies
		.filter(({ logo_path }) => logo_path !== null && logo_path !== '');

	const contentRating = content_ratings.results.find(({ iso_3166_1 }) => {
		return iso_3166_1.toLowerCase() === regionsByLocales[lang];
	});

	return (
		<main className='mt-[3.75rem] flex-grow'>
			<section
				className='overflow-hidden relative py-5 md:py-8'
			>
				{backdrop_path && (
					<ThemedImage
						className='aspect-[5/4] xs:aspect-video sm:w-full sm:h-full absolute top-0 left-0 -z-100 opacity-[0.25] dark:brightness-[0.25] dark:opacity-100 object-cover object-top'
						src={{
							light: backgroundData?.img.src ?? '',
							dark: backgroundData?.img.src ?? '',
						}}
						placeholder={backdrop_path ? 'blur' : 'empty'}
						blurDataURL={backgroundData?.base64}
						width={1920}
						height={720}
						sizes='100vw'
						priority
						alt={name}
					/>
				)}

				<Container className='grid grid-cols-1 sm:grid-cols-[15.625rem_1fr] md:grid-cols-[16.875rem_1fr] lg:grid-cols-[18.75rem_1fr] sm:gap-x-6 md:gap-x-8 lg:gap-x-10'>
					<Breadcrumbs
						className='col-span-full mb-5 md:mb-8'
						label='breadcrumbs navigation'
						lastItemLabel={name}
					/>

					<ThemedImage
						className='mb-8 sm:mb-0 justify-self-center  overflow-hidden sm:justify-self-start object-cover rounded-2 max-w-[14.375rem] sm:max-w-full bg-neutral-300 dark:bg-dark-neutral-300 border-1 border-neutral-300 dark:border-dark-neutral-300'
						width={300}
						height={450}
						alt={`${name} poster`}
						placeholder={poster_path ? 'blur' : 'empty'}
						blurDataURL={posterData?.base64}
						priority
						sizes='(min-width: 1024px) 300px, (min-width: 768px) 270px, (min-width: 640px) 250px, 230px'
						src={{
							light: posterData?.img.src ?? '',
							dark: posterData?.img.src ?? '',
						}}
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
									{name}
								</Link>
								<span
									className='text-neutral-900 dark:text-dark-neutral-800'
								>
									{releaseYear.length > 0 && (`(${releaseYear})`)}
								</span>
							</Title>

							<ul
								className='flex flex-wrap gap-y-1 text-neutral-900 dark:text-dark-neutral-900'
							>
								{first_air_date.length > 0 && (
									<li
										className='flex items-center after:content-["/"] after:mx-2 last:after:hidden last:after:mx-0'
									>
										{contentRating && (
											<span
												className='text-75 leading-none font-bold p-1 mr-2 uppercase border-1 border-neutral-900 dark:border-dark-neutral-800 text-neutral-900 dark:text-dark-neutral-800'
											>
												{contentRating.rating}
											</span>
										)}
										{getLocalizedDate(first_air_date, lang)}
									</li>
								)}
								{currentGenres.length > 0 && (
									<li
										className='after:content-["/"] after:mx-2 last:after:hidden last:after:mx-0'
									>
										{currentGenres}
									</li>
								)}
								{tvSeriesDuration.length > 0 && (
									<li>
										{tvSeriesDuration}
									</li>
								)}
							</ul>
						</div>

						<div className='flex flex-wrap'>
							<div className='mr-4 mb-3 md:mb-4 lg:mb-5'>
								<span
									className='text-neutral-1000 dark:text-dark-neutral-900 font-medium mr-2'
								>
									{t('ratingLabel')}
								</span>
								<PieChart
									size={60}
									value={rating}
									appearance='rating'
								/>
							</div>

							<SocialLinks
								className='mb-1 md:mb-2 lg:mb-3'
								data={socialNetworks}
							/>
						</div>

						<div>
							{tagline && (
								<p
									className='text-neutral-900 dark:text-dark-neutral-700 italic mb-[0.625rem]'
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
									<ExpandableText className='mb-4 lg:mb-5'>
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
								{authors.slice(0, 4).map(({ jobs, name, id }) => (
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
										<span>{t(`authors.jobs.${jobs[0].job.toLowerCase()}`)}</span>
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
							{t('aboutMovieTitle')}
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
										alt={t('logo', { company_name: name })}
										sizes='185px'
										fill
										src={{
											light: `${imgPath.logo}${logo_path}`,
											dark: `${imgPath.logo}${logo_path}`
										}}
									/>
								</div>
							))}
						</div>
					</div>
				</Container>
			</section>

			{aggregate_credits.cast.length > 0 && (
				<section className='py-5 md:py-8'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('starringTitle')}
						</Title>

						<Carousel
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
							{aggregate_credits.cast.slice(0, 20).map(({
								id,
								profile_path,
								name,
								popularity,
								roles
							}) => (
								<PersonCard
									className='mb-2 mx-auto xs:mx-0'
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
								>
									{roles[0].character}
								</PersonCard>
							))}
						</Carousel>
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
									/>
								</TabPanel>
							))}
						</Tabs>
					</Container>
				</section>
			)}

			<section className='py-5 md:py-8'>
				<Container>
					<Title
						className='mb-4 lg:mb-5'
						as='h2'
						level={3}
					>
						<Link
							className='flex items-center gap-3 text-neutral-900 dark:text-dark-neutral-800 [&]:hover:no-underline [&]:hover:text-neutral-1000 [&]:active:text-neutral-1100 dark:[&]:hover:text-dark-neutral-900 dark:[&]:active:text-dark-neutral-1000'
							href={`/tv/${id}/seasons`}
						>
							{t('seasonAndEpisodesTitle', { ns: 'tvSeriesDetailsPage' })}
							<svg
								className='w-6 h-6 sm:w-[1.75rem] sm:h-[1.75rem]'
								viewBox='0 0 20 20'
							>
								<use href={'/assets/icons/forward-arrow.svg#forward-arrow'}></use>
							</svg>
						</Link>
					</Title>
					<ul>
						{seasons.map(({
							air_date,
							id,
							episode_count,
							name,
							overview,
							poster_path,
							season_number,
							vote_average,
						}) => (
							<li
								className='flex flex-col xs:flex-row gap-6 md:gap-8 pb-4 last:pb-0 pt-4 first:pt-0 border-b-1 border-neutral-300 dark:border-dark-neutral-350 last:border-none'
								key={id}
							>
								<ThemedImage
									className='basis-[195px] xs:basis-[100px] md:basis-[130px] aspect-[2/3] grow-0 shrink-0 self-center xs:self-start'
									width={130}
									height={195}
									src={{
										light: `${imgPath['poster_2']}${poster_path}`,
										dark: `${imgPath['poster_2']}${poster_path}`,
									}}
									fallback={{
										light: `/assets/images/movie-card-placeholder-l-v.svg`,
										dark: `/assets/images/movie-card-placeholder-d-v.svg`
									}}
									alt={`${name} poster`}
								/>

								<div className='text-neutral-1000 dark:text-dark-neutral-900 flex-grow'>
									<Title
										level={4}
										as='h3'
									>
										{name}

										<p className='mt-1 flex flex-wrap gap-y-2 text-200'>
											<span
												className='flex items-center font-medium after:content-["/"] after:ml-2 after:mr-2'
												aria-label={t('ratingLabel')}
											>
												<svg
													className='w-4 h-4 text-neutral-600 dark:text-dark-neutral-600 mr-2'
													viewBox='0 0 20 20'
												>
													<use href={'/assets/icons/star.svg#star'}></use>
												</svg>
												{vote_average}
											</span>

											<span className='font-regular after:content-["/"] after:ml-2 after:mr-2'>
												{t('seasonAndEpisodes', {
													ns: 'tvSeriesDetailsPage',
													season_number,
													episode_count,
												})}
											</span>

											<span className='font-regular'>
												{getLocalizedDate(air_date ?? '', lang)}
											</span>
										</p>
									</Title>

									{overview.length > 0 && (
										<ExpandableText className='mt-3'>
											{overview}
										</ExpandableText>
									)}
								</div>
							</li>
						))}
					</ul>
				</Container>
			</section>

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

						<Carousel
							mousewheel
							showPagination
							paginationType='progress'
							showArrows
							spaceBetween={20}
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
									className='h-full'
									key={id}
									id={id}
									author={author}
									content={content}
									type={'user review'}
									titleElement='h3'
									highlighted
									time={getLocalizedDate(created_at, lang)}
									rating={author_details.rating}
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
						</Carousel>
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
						<Carousel
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
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									className='mx-auto md:mx-0'
									movieId={id}
									key={id}
									src={backdrop_path ? `${imgPath['backdrop']}${backdrop_path}` : ''}
									alt={name}
									title={name}
									titleElement='h4'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									loading='lazy'
									sizes='(min-width: 1230px) 285px, (min-width: 1024px) 25vw, (min-width: 768px) 33.3vw, (min-width: 480px) 50vw, 100vw'
								/>
							))}
						</Carousel>
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
						<Carousel
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
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									className='mx-auto md:mx-0'
									movieId={id}
									key={id}
									src={backdrop_path ? `${imgPath['backdrop']}${backdrop_path}` : ''}
									alt={name}
									title={name}
									titleElement='h4'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									loading='lazy'
									sizes='(min-width: 1230px) 285px, (min-width: 1024px) 25vw, (min-width: 768px) 33.3vw, (min-width: 480px) 50vw, 100vw'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}
		</main>
	);
}