import Carousel from '@/components/Carousel/Carousel';
import ThemedImage from '@/components/ThemedImage/ThemedImage';
import Title from '@/components/Title/Title';
import { getGenreById } from '@/helpers/getGenreById/getGenreById';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { fetchNowPlayingMovies } from '@/services/fetchNowPlayingMovies/fetchNowPlayingMovies';
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

    </main>
  )
}

