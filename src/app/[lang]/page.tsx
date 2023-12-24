import Carousel from '@/components/Carousel/Carousel';
import Container from '@/components/Container/Container';
import MovieCard from '@/components/MovieCard/MovieCard';
import ThemedImage from '@/components/ThemedImage/ThemedImage';
import Title from '@/components/Title/Title';
import { getGenreById } from '@/helpers/getGenreById/getGenreById';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { getLocalizedDate } from '@/i18n/utils/getLocalizedDate/getLocalizedDate';
import { fetchNowPlayingMovies } from '@/services/fetchNowPlayingMovies/fetchNowPlayingMovies';
import { fetchPopularTVSeries } from '@/services/fetchPopularTVSeries/fetchPopularTVSeries';
import { fetchTrendingMovies } from '@/services/fetchTrendingMovies/fetchTrendingMovies';
import { fetchUpcomingMovies } from '@/services/fetchUpcomingMovies/fetchUpcomingMovies';
import Link from 'next/link';
import { imgPath, routes } from 'src/constants';

type Props = {
  params: {
    lang: Locales,
  }
}

export default async function Home({ params: { lang } }: Props) {
  const { t } = await fetchTranslation(lang, ['homePage', 'common']);
  const nowPlayingMovies = await fetchNowPlayingMovies(lang);
  const trendingMovies = await fetchTrendingMovies(lang);
  const upcomingReleases = await fetchUpcomingMovies(1, { lang });
  const popularTVSeries = await fetchPopularTVSeries(1, { lang });

  const avaliableOngoingMovies = nowPlayingMovies?.results
    .filter((movie) => movie.backdrop_path !== null)
    .map((movie) => {
      const genres = movie.genre_ids
        .slice(0, 3)
        .map((genre) => t(`genres.${getGenreById(genre)}`))
        .join(', ');

      return {
        ...movie,
        genres,
      }
    });

  return (
    <main className='mt-[3.75rem]'>
      <Title
        level={1}
        as='h1'
        className='sr-only'
      >
        {t('mainTitle')}
      </Title>

      {avaliableOngoingMovies && avaliableOngoingMovies.length > 0 && (
        <section className='pb-5 md:pb-8'>
          <Title
            className='sr-only'
            as='h2'
            level={3}
          >
            {t('theaters')}
          </Title>

          <Carousel
            spaceBetween={20}
            showPagination
            paginationType='progress'
            showArrows
            slidesPerView={1}
            breakpoints={{
              0: {
                showArrows: false,
              },
              768: {
                showArrows: true,
              }
            }}
            autoplay
            autoplayInterval={5000}
          >
            {avaliableOngoingMovies.map(({
              id,
              backdrop_path,
              title,
              vote_average,
              overview,
              genres,
            }, index) => (
              <Link
                className='flex items-end relative w-full h-[320px] sm:h-[360px] md:h-[432px] lg:h-[576px] xl:h-[720px] after:w-full after:h-[80%] md:after:h-[60%] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-b after:from-neutral-300/0 after:to-neutral-300/80 dark:after:from-dark-neutral-200/0 dark:after:to-dark-neutral-200/80'
                key={id}
                href={`${routes.movies}${id}`}
                title={title}
              >
                <ThemedImage
                  className='object-cover object-top z-0 bg-neutral-200 dark:bg-dark-neutral-250'
                  fill
                  alt={title}
                  priority={index < 3}
                  loading={index >= 3 ? 'lazy' : undefined}
                  sizes='100vw'
                  src={{
                    light: `${imgPath['backdrop']}${backdrop_path}`,
                    dark: `${imgPath['backdrop']}${backdrop_path}`,
                  }}
                />

                <div className='relative z-100 p-4 sm:p-6 md:p-8 max-w-[620px]'>
                  <p className='flex flex-wrap xs:flex-nowrap gap-2 xs:gap-0 md:gap-x-0 leading-[1.25] text-neutral-1100 dark:text-dark-neutral-1100 font-medium mb-1'>
                    <span className='flex items-center after:hidden xs:after:inline-block after:content-["/"] after:ml-2 after:mr-2'>
                      <span className='sr-only'>{t('ratingLabel')}:</span>
                      <svg
                        className='w-4 h-4 text-neutral-700 dark:text-dark-neutral-700 mr-2'
                        viewBox='0 0 20 20'
                      >
                        <use href={'/assets/icons/star.svg#star'}></use>
                      </svg>
                      <span>{vote_average}</span>
                    </span>

                    <span>
                      <span className='sr-only'>{t('genresLabel')}:</span>
                      {genres}
                    </span>
                  </p>

                  <Title
                    className='text-300 sm:text-400 md:text-500 dark:text-dark-neutral-1100 text-neutral-1100 mb-1 xs:mb-2 sm:mb-3 md:mb-4 line-clamp-2'
                    level={3}
                    as='h3'
                  >
                    {title}
                  </Title>
                  {overview.length > 0 && (
                    <p className='text-100 xs:text-200 md:text-[1.125rem] line-clamp-3 dark:text-dark-neutral-1000 text-neutral-1000'>
                      {overview}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </Carousel>
        </section>
      )}

      {trendingMovies && trendingMovies.results.length > 0 && (
        <section className='py-5 md:py-8'>
          <Container className='flex flex-col'>
            <Title
              className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
              as='h2'
              level={3}
            >
              {t('trending')}
            </Title>
            <Carousel
              mousewheel
              spaceBetween={20}
              showPagination
              paginationType='progress'
              showArrows
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                375: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
                1280: {
                  slidesPerView: 6,
                }
              }}
            >
              {trendingMovies.results.map(({
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
                  className='mx-auto sm:mx-0 mb-2'
                  movieId={id}
                  key={id}
                  src={poster_path ? `${imgPath['movieCard']}${poster_path}` : ''}
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
      )}

      {upcomingReleases && upcomingReleases?.results.length > 0 && (
        <section className='py-5 md:py-8'>
          <Container className='flex flex-col'>
            <Title
              className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
              as='h2'
              level={3}
            >
              Upcoming Releases
            </Title>

            <ul className='grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-5 gap-x-4 lg:gap-x-8 md:[counter-reset:example]'>
              {upcomingReleases.results.slice(0, 10).map(({
                id,
                poster_path,
                title,
                release_date
              }) => (
                <li
                  key={id}
                  className='flex items-center gap-4 relative py-2 lg:p-3 [&:nth-child(-n+8)]:border-b-1 [&:nth-child(-n+8)]:border-neutral-300 dark:[&:nth-child(-n+8)]:border-dark-neutral-350 md:[counter-increment:example_1] before:hidden md:before:inline-block before:content-[counter(example,decimal-leading-zero)] before:text-500 lg:before:text-700 before:font-bold before:text-neutral-1000 dark:before:text-dark-neutral-900 before:leading-none transition-colors duration-150 hover:bg-neutral-100 active:bg-neutral-0 dark:hover:bg-dark-neutral-200 dark:active:bg-dark-neutral-250'
                >
                  <Link
                    className='grow flex items-center gap-3 before:absolute before:w-full before:h-full before:top-0 before:left-0'
                    href={`${routes.movies}${id}`}
                    title={title}
                  >
                    <ThemedImage
                      className='w-[50px] h-[75px] lg:w-[60px] lg:h-[90px] aspect-[2/3]'
                      width={60}
                      height={90}
                      alt={title}
                      src={{
                        light: poster_path ? `${imgPath.poster}${poster_path}` : '',
                        dark: poster_path ? `${imgPath.poster}${poster_path}` : '',
                      }}
                      fallback={{
                        light: '/assets/images/movie-placeholder-l.svg',
                        dark: '/assets/images/movie-placeholder-d.svg',
                      }}
                    />

                    <Title
                      className='text-neutral-1000 dark:text-dark-neutral-900 grow text-200 md:text-[1.125rem] line-clamp-3'
                      level={5}
                      as='h3'
                    >
                      {title}
                    </Title>

                    <p className='text-center text-neutral-900 dark:text-dark-neutral-800'>
                      <span className='block font-bold text-300 lg:text-400 leading-none'>
                        {getLocalizedDate(release_date, lang, {
                          day: '2-digit',
                        })}
                      </span>
                      <span className='block text-100 lg:text-200'>
                        {getLocalizedDate(release_date, lang, {
                          month: 'long',
                        })}
                      </span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {popularTVSeries && popularTVSeries.results.length > 0 && (
        <section className='py-5 md:py-8'>
          <Container className='flex flex-col'>
            <Title
              className='mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
              as='h2'
              level={3}
            >
              Popular TV series
            </Title>
            <Carousel
              mousewheel
              spaceBetween={20}
              showPagination
              paginationType='progress'
              showArrows
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                375: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
                1280: {
                  slidesPerView: 6,
                }
              }}
            >
              {popularTVSeries.results.map(({
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
                  className='mx-auto sm:mx-0 mb-2'
                  movieId={id}
                  key={id}
                  src={poster_path ? `${imgPath['movieCard']}${poster_path}` : ''}
                  alt={name}
                  title={name}
                  titleElement='h4'
                  genres={genre_ids}
                  releaseDate={getLocalizedDate(first_air_date ?? '', lang)}
                  titleLevel={5}
                  showRating
                  rating={vote_average * 10}
                />
              ))}
            </Carousel>
          </Container>
        </section>
      )}
    </main>
  )
}

