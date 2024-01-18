import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Carousel from '@/components/Carousel/Carousel';
import Container from '@/components/Container/Container';
import ExpandableText from '@/components/ExpandableText/ExpandableText';
import MovieCard from '@/components/MovieCard/MovieCard';
import Title from '@/components/Title/Title';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { getLocalizedDate } from '@/i18n/utils/getLocalizedDate/getLocalizedDate';
import { fetchMoviesByGenre } from '@/services/fetchMoviesByGenre/fetchMoviesByGenre';
import { fetchTopRatedMovies } from '@/services/fetchTopRatedMovies/fetchTopRatedMovies';
import { imgPath } from 'src/constants';

type Props = {
	params: {
		lang: Locales,
	}
};

export default async function Page({ params: { lang } }: Props) {
	const { t } = await fetchTranslation(lang, ['common', 'moviesPage']);

	const [
		topRatedMovies,
		animeMovies,
		romanceMovies,
		fantasyMovies,
		dramaMovies,
		thrillerMovies,
		actionMovies,
		animationMovies,
		adventureMovies,
		horrorMovies,
		mysteryMovies,
		comedyMovies,
		historyMovies,
		musicMovies,
		militaryMovies,
		westernMovies,
		familyMovies,
		documentaryMovies,
		scienceFictionMovies,
	] = await Promise.all([
		fetchTopRatedMovies(1, { lang }),
		fetchMoviesByGenre('anime', 1, { lang }),
		fetchMoviesByGenre('romance', 1, { lang }),
		fetchMoviesByGenre('fantasy', 1, { lang }),
		fetchMoviesByGenre('drama', 1, { lang }),
		fetchMoviesByGenre('thriller', 1, { lang }),
		fetchMoviesByGenre('action', 1, { lang }),
		fetchMoviesByGenre('animation', 1, { lang }),
		fetchMoviesByGenre('adventure', 1, { lang }),
		fetchMoviesByGenre('horror', 1, { lang }),
		fetchMoviesByGenre('mystery', 1, { lang }),
		fetchMoviesByGenre('comedy', 1, { lang }),
		fetchMoviesByGenre('history', 1, { lang }),
		fetchMoviesByGenre('music', 1, { lang }),
		fetchMoviesByGenre('war', 1, { lang }),
		fetchMoviesByGenre('western', 1, { lang }),
		fetchMoviesByGenre('family', 1, { lang }),
		fetchMoviesByGenre('documentary', 1, { lang }),
		fetchMoviesByGenre('science fiction', 1, { lang }),
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
						{t('mainTitle', { ns: 'moviesPage' })}
					</Title>

					<ExpandableText>
						{[
							t('pageDescription_1', { ns: 'moviesPage' }),
							t('pageDescription_2', { ns: 'moviesPage' }),
						]}
					</ExpandableText>
				</Container>
			</section>

			{topRatedMovies && topRatedMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('topRatedMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{topRatedMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{romanceMovies && romanceMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('romanceMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{romanceMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{fantasyMovies && fantasyMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('fantasyMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{fantasyMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{dramaMovies && dramaMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('dramaMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{dramaMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{thrillerMovies && thrillerMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('thrillerMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{thrillerMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{actionMovies && actionMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('actionMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{actionMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{animationMovies && animationMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('animationMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{animationMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{adventureMovies && adventureMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('adventureMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{adventureMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{horrorMovies && horrorMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('horrorMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{horrorMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{mysteryMovies && mysteryMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('mysteryMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{mysteryMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{animeMovies && animeMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('animeMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{animeMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{comedyMovies && comedyMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('comedyMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{comedyMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{historyMovies && historyMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('historyMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{historyMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{musicMovies && musicMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('musicMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{musicMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{scienceFictionMovies && scienceFictionMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('scienceFictionMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{scienceFictionMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{militaryMovies && militaryMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('militaryMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{militaryMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{westernMovies && westernMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('westernMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{westernMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{familyMovies && familyMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('familyMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{familyMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}

			{documentaryMovies && documentaryMovies.results.length > 0 && (
				<section className='py-3 md:py-5'>
					<Container className='flex flex-col'>
						<Title
							className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
							as='h2'
							level={3}
						>
							{t('documentaryMoviesTitle', { ns: 'moviesPage' })}
						</Title>
						<Carousel
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
							{documentaryMovies.results.slice(0, 14).map(({
								id,
								poster_path,
								title,
								vote_average,
								release_date,
								genre_ids,
							}) => (
								<MovieCard
									mediaType='movie'
									variant='vertical'
									className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
									movieId={id}
									key={id}
									src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
									alt={title}
									title={title}
									titleElement='h3'
									genres={genre_ids}
									releaseDate={getLocalizedDate(release_date, lang)}
									titleLevel={5}
									showRating
									rating={vote_average * 10}
									sizes='(min-width: 1230px) 183px, (min-width: 1024px) 16.6vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
									loading='lazy'
								/>
							))}
						</Carousel>
					</Container>
				</section>
			)}
		</main>
	);
}