import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { VerticalMovieCardsCarousel } from '@/components/Carousel/Carousel';
import Container from '@/components/Container/Container';
import ExpandableText from '@/components/ExpandableText/ExpandableText';
import MovieCard from '@/components/MovieCard/MovieCard';
import Title from '@/components/Title/Title';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { getLocalizedDate } from '@/i18n/utils/getLocalizedDate/getLocalizedDate';
import { fetchTVSeriesByGenre } from '@/services/fetchTVSeriesByGenre/fetchTVSeriesByGenre';
import { fetchTopRatedTVSeries } from '@/services/fetchTopRatedTVSeries/fetchTopRatedTVSeries';
import { fetchUpcomingTVSeries } from '@/services/fetchUpcomingTVSeries/fetchUpcomingTVSeries';
import { Metadata } from 'next';
import { imgPath } from '@/constants';

export async function generateMetadata(
	{ params }: { params: { lang: Locales } },
): Promise<Metadata> {
	const { t } = await fetchTranslation(params.lang, 'tvSeriesPage');
	return {
		title: t('metaPageName'),
		description: t('metaPageDescription'),
	}
}

type Props = {
	params: {
		lang: Locales,
	}
};

export default async function Page({ params: { lang } }: Props) {
	const { t } = await fetchTranslation(lang, ['common', 'tvSeriesPage']);

	const [
		topRatedTVSeries,
		upcomingTVSeries,
		turkishTVSeries,
		russianTVSeries,
		koreanTVSeries,
		medicalTVSeries,
		historicalTVSeries,
		animeTVSeries,
		teenTVSeries,
		sportsTVSeries,
		familyTVSeries,
		crimeTVSeries,
		loveTVSeries,
		talkShowTVSeries,
		comedyTVSeries,
		mysteryTVSeries,
		militaryTVSeries,
	] = await Promise.all([
		fetchTopRatedTVSeries(1, { lang }),
		fetchUpcomingTVSeries(1, { lang }),
		fetchTVSeriesByGenre('any', 1, {
			lang,
			country: 'turkey',
		}),
		fetchTVSeriesByGenre('any', 1, {
			lang,
			country: 'russia',
		}),
		fetchTVSeriesByGenre('any', 1, {
			lang,
			country: 'south korea',
		}),
		fetchTVSeriesByGenre('medical', 1, { lang }),
		fetchTVSeriesByGenre('historical', 1, { lang }),
		fetchTVSeriesByGenre('anime', 1, { lang }),
		fetchTVSeriesByGenre('teen', 1, { lang }),
		fetchTVSeriesByGenre('sports', 1, { lang }),
		fetchTVSeriesByGenre('family', 1, { lang }),
		fetchTVSeriesByGenre('crime', 1, { lang }),
		fetchTVSeriesByGenre('love', 1, { lang }),
		fetchTVSeriesByGenre('talk', 1, { lang }),
		fetchTVSeriesByGenre('comedy', 1, { lang }),
		fetchTVSeriesByGenre('mystery', 1, { lang }),
		fetchTVSeriesByGenre('war & politics', 1, { lang }),
	]);

	return (
		<main className='mt-[3.75rem] flex-grow'>
			<section
				className='py-3 md:py-5'
			>
				<Container>
					<Breadcrumbs
						className='px-4 xl:px-0 mb-[1.25rem]'
						label='breadcrumbs navigation'
					/>

					<Title
						className='mb-2 lg:mb-3 text-neutral-1000 dark:text-dark-neutral-900'
						level={2}
						as='h1'
					>
						{t('mainTitle', { ns: 'tvSeriesPage' })}
					</Title>

					<ExpandableText
						dictionary={{
							collapseButton: t('expandableText.collapseButton'),
							expandButton: t('expandableText.expandButton'),
						}}
					>
						{[
							t('pageDescription_1', { ns: 'tvSeriesPage' }),
							t('pageDescription_2', { ns: 'tvSeriesPage' }),
						]}
					</ExpandableText>
				</Container>
			</section>

			{topRatedTVSeries && topRatedTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('topRatedTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{topRatedTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{upcomingTVSeries && upcomingTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('upcomingTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{upcomingTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{turkishTVSeries && turkishTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('turkishTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{turkishTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{russianTVSeries && russianTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('russianTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{russianTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{koreanTVSeries && koreanTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('koreanTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{koreanTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{medicalTVSeries && medicalTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('medicalTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{medicalTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{historicalTVSeries && historicalTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('historicalTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{historicalTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{animeTVSeries && animeTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('animeTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{animeTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{teenTVSeries && teenTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('teenTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{teenTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{sportsTVSeries && sportsTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('sportsTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{sportsTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{familyTVSeries && familyTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('familyTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{familyTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{crimeTVSeries && crimeTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('crimeTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{crimeTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{loveTVSeries && loveTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('loveTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{loveTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{talkShowTVSeries && talkShowTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('loveTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{talkShowTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{comedyTVSeries && comedyTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('comedyTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{comedyTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{mysteryTVSeries && mysteryTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('mysteryTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{mysteryTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}

			{militaryTVSeries && militaryTVSeries.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('militaryTVSeriesTitle', { ns: 'tvSeriesPage' })}
						</Title>
						<VerticalMovieCardsCarousel
							mousewheel
							spaceBetween={20}
							showPagination
							paginationType='fraction'
							showArrows
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
							{militaryTVSeries.results.slice(0, 14).map(({
								id,
								poster_path,
								name,
								vote_average,
								first_air_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='tv'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={name}
									title={name}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(first_air_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</VerticalMovieCardsCarousel>
					</Container>
				</section>
			)}
		</main>
	);
}