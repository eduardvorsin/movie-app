import CharacteristicList from '@/components/CharacteristicList/CharacteristicList';
import Container from '@/components/Container/Container';
import ExpandableText from '@/components/ExpandableText/ExpandableText';
import Link from '@/components/Link/Link';
import PersonCard from '@/components/PersonCard/PersonCard';
import PieChart from '@/components/PieChart/PieChart';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import ThemedImage from '@/components/ThemedImage/ThemedImage';
import Title from '@/components/Title/Title';
import { createAuthorsArray } from '@/helpers/createAuthorsArray/createAuthorsArray';
import { createCharacteristicsArray } from '@/helpers/createCharacteristicsArray/createCharacteristicsArray';
import { createSocialNetworksArray } from '@/helpers/createSocialNetworksArray/createSocialNetworksArray';
import { fetchImageWithPlaceholder } from '@/helpers/fetchImageWithPlaceholder/fetchImageWithPlaceholder';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { formatCurrency } from '@/i18n/utils/formatCurrency/formatCurrency';
import { getLanguageNameFromLocale } from '@/i18n/utils/getLanguageNameFromLocale/getLanguageNameFromLocale';
import { getLocalizedDate } from '@/i18n/utils/getLocalizedDate/getLocalizedDate';
import { fetchMovie } from '@/services/fetchMovie/fetchMovie';
import { PlaceholderData } from '@/types/shared';
import { notFound } from 'next/navigation';
import { imgPath } from 'src/constants';
import Carousel from '@/components/Carousel/Carousel';
import MovieCard from '@/components/MovieCard/MovieCard';
import { convertToTime } from '@/helpers/convertToTime/convertToTime';
import { fetchTrailers } from '@/services/fetchTrailers/fetchTrailers';
import YouTubeVideo from '@/components/YouTubeVideo/YouTubeVideo';
import Tabs from '@/components/Tabs/Tabs';
import TabPanel from '@/components/Tabs/TabPanel/TabPanel';
import Comment from '@/components/Comment/Comment';
import Avatar from '@/components/Avatar/Avatar';
import { nameToInitials } from '@/helpers/nameToInitials/nameToInitials';

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

const chartBarColors = {
	'low': {
		dark: '#FF9C8F',
		light: '#AE2A19',
	},
	'medium': {
		dark: '#F5CD47',
		light: '#946F00',
	},
	'high': {
		dark: '#7EE2B8',
		light: '#216E4E',
	},
};

type Props = {
	params: {
		id: string,
		lang: Locales,
	}
}

export default async function Page({ params: { id, lang } }: Props) {
	const { t } = await fetchTranslation(lang, ['moviesPage', 'common']);
	const movie = await fetchMovie(id, { lang });
	const trailers = await fetchTrailers(id, { lang });

	if (movie instanceof Error) {
		notFound();
	}

	const {
		production_countries,
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
	} = movie;

	const backdropUrl = `${imgPath['backdrop']}${backdrop_path}`;
	let posterData: PlaceholderData | null = null;
	if (poster_path) {
		posterData = await fetchImageWithPlaceholder(
			`${imgPath['poster']}${poster_path}`,
			true,
		);
	}
	const releaseYear = release_date.slice(0, 4) || '-';
	const currentGenres = genres.slice(0, 3).map((genre) => genre.name.toLowerCase()).join(', ');
	const movieDuration = `${t('duration', { ns: 'moviesPage', time: runtime })} | ${convertToTime(runtime)}`;
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
				currentValue = getLanguageNameFromLocale(value, lang) ?? t('unknown', { ns: 'common' });
			} else if (name === 'vote_average') {
				currentValue = `${rating.toString()}%`;
			} else if (name === 'runtime') {
				currentValue = movieDuration;
			} else if (name === 'budget' || name === 'revenue') {
				currentValue = formatCurrency(+value, lang);
			} else if (name === 'status') {
				currentValue = t(`characteristics.statusValue.${value.toLowerCase()}`, { ns: 'moviesPage' });
			}

			return {
				name: t(`characteristics.${name}`, { ns: 'moviesPage' }),
				value: currentValue,
			}
		});

	let ratingType: keyof typeof chartBarColors;
	if (rating >= 0 && rating <= 40) {
		ratingType = 'low';
	} else if (rating >= 40 && rating <= 70) {
		ratingType = 'medium';
	} else {
		ratingType = 'high';
	}

	const authors = createAuthorsArray(credits.crew).slice(0, 6);

	let availableTrailers;
	if (!(trailers instanceof Error)) {
		availableTrailers = trailers.results.filter((trailer) => trailer.site === 'YouTube');
	}

	return (
		<main>
			<section
				className='py-5 md:py-8 bg-blend-overlay bg-cover bg-no-repeat bg-neutral-100/80 dark:bg-dark-neutral-0'
				style={{ backgroundImage: `url(${backdropUrl})` }}
			>
				<Container className='flex flex-col sm:flex-row'>
					<ThemedImage
						className='self-center sm:self-start mb-8 sm:mb-0 sm:mr-6 md:mr-8 lg:mr-10 object-cover rounded-2 max-w-[14.375rem] sm:max-w-[16.25rem] md:max-w-[17.5rem] lg:max-w-[18.75rem] w-full shrink-0 grow-0 bg-neutral-300 dark:bg-dark-neutral-300 border-1 border-neutral-300 dark:border-dark-neutral-300'
						width={300}
						height={450}
						alt='poster'
						placeholder='blur'
						blurDataURL={poster_path ? 'blur' : 'empty'}
						priority
						sizes='(min-width: 1024px) 300px, (min-width: 768px) 280px, (min-width: 640px) 260px, 230px'
						src={{
							light: posterData?.img.src ?? '',
							dark: posterData?.img.src ?? '',
						}}
						fallback={{
							light: '/assets/images/movie-placeholder-l.svg',
							dark: '/assets/images/movie-placeholder-d.svg',
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
									className='no-underline'
									href={homepage}
									isExternal
									target='_blank'
								>
									{movie.title}
								</Link>
								<span
									className='text-neutral-900 dark:text-dark-neutral-800'
								>
									({releaseYear})
								</span>
							</Title>
							<ul
								className='flex flex-wrap md:flex-nowrap text-neutral-900 dark:text-dark-neutral-900'
							>
								<li
									className='mr-2 md:mr-0 after:hidden md:after:inline-block md:after:content-["/"] after:ml-2 after:mr-2'
								>
									{movie.release_date || '-'}
								</li>
								<li
									className='mr-2 md:mr-0 after:hidden md:after:inline-block md:after:content-["/"] after:ml-2 after:mr-2'
								>
									{currentGenres}
								</li>
								<li>
									{movieDuration}
								</li>
							</ul>
						</div>
						<div className='flex flex-wrap'>
							<div className='mr-4 mb-3 md:mb-4 lg:mb-5'>
								<span
									className='text-neutral-1000 dark:text-dark-neutral-900 font-medium mr-2'
								>
									{t('rating', { ns: 'moviesPage' })}
								</span>
								<PieChart
									size={60}
									value={rating}
									barColor={chartBarColors[ratingType]}
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
										{t('review', { ns: 'moviesPage' })}
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
								{t('authors.title', { ns: 'moviesPage' })}
							</Title>

							<ul
								className='text-neutral-1000 dark:text-dark-neutral-900'
							>
								{authors.map(({ job, name, id }) => (
									<li
										key={id}
										className='mb-1'
									>
										<Link
											className='no-underline font-bold'
											href={`/persons/${id}`}
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
							{t('aboutMovie', { ns: 'moviesPage' })}
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
							{t('sponsors', { ns: 'moviesPage' })}
						</Title>

						<div className='flex gap-4 flex-wrap'>
							{movie.production_companies.map(({
								id,
								name,
								logo_path,
							}) => (
								<ThemedImage
									className='basis-[8.125rem] lg:basis-[11.5625rem]'
									key={id}
									alt={t('logo', { ns: 'common', company_name: name })}
									width={185}
									height={50}
									src={{
										light: `${imgPath.logo}${logo_path}`,
										dark: `${imgPath.logo}${logo_path}`
									}}
								/>
							))}
						</div>
					</div>
				</Container>
			</section>

			<section className='py-5 md:py-8'>
				<Container className='flex flex-col'>
					<Title
						className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
						as='h2'
						level={3}
					>
						{t('starring', { ns: 'moviesPage' })}
					</Title>

					<Carousel
						label='cast'
						mousewheel
						slidesPerView={8}
						spaceBetween={20}
						showScrollShadow
					>
						{credits.cast.map(({
							id,
							profile_path,
							name,
							popularity,
							character
						}) => (
							<PersonCard
								personId={id}
								key={id}
								src={profile_path ? `${imgPath['profileCard']}${profile_path}` : ''}
								alt={name}
								title={name}
								titleElement='h4'
								titleLevel={6}
								showRating
								rating={popularity}
							>
								{character}
							</PersonCard>
						))}
					</Carousel>

				</Container>
			</section>

			{availableTrailers && (
				<section className='py-5 md:py-8'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('trailers', { ns: 'moviesPage' })}
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
										width={960}
										height={540}
										videoId={trailer.key}
										title={trailer.name}
										loading='lazy'
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
							{t('reviews', { ns: 'moviesPage' })}
						</Title>

						<Carousel
							label='reviews'
							mousewheel
							showPagination
							paginationType='dots'
							slidesPerView={3}
							spaceBetween={20}
						>
							{reviews.results.map(({
								id,
								author,
								content,
								created_at,
								author_details,
							}) => (
								<Comment
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

			<section className='py-5 md:py-8'>
				<Container className='flex flex-col'>
					<Title
						className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
						as='h2'
						level={3}
					>
						{t('relatedMovies', { ns: 'moviesPage' })}
					</Title>
					<Carousel
						label={t('relatedMovies', { ns: 'moviesPage' })}
						mousewheel
						slidesPerView={4}
						spaceBetween={20}
						showPagination
						paginationType='dots'
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
							/>
						))}
					</Carousel>
				</Container>
			</section>

			<section className='py-5 md:py-8'>
				<Container className='flex flex-col'>
					<Title
						className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
						as='h2'
						level={3}
					>
						{t('recommendations', { ns: 'moviesPage' })}
					</Title>
					<Carousel
						label={t('recommendations', { ns: 'moviesPage' })}
						mousewheel
						slidesPerView={4}
						spaceBetween={20}
						showPagination
						paginationType='dots'
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
							/>
						))}
					</Carousel>
				</Container>
			</section>
		</main>
	);
}
