import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import MovieCard from '@/components/MovieCard/MovieCard';
import ThemedImage from '@/components/ThemedImage/ThemedImage';
import Title from '@/components/Title/Title';
import { fetchImageWithPlaceholder } from '@/helpers/fetchImageWithPlaceholder/fetchImageWithPlaceholder';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { getLocalizedDate } from '@/i18n/utils/getLocalizedDate/getLocalizedDate';
import { fetchMoviesByCollection } from '@/services/fetchMovieByCollection/fetchMovieByCollection';
import { PlaceholderData } from '@/types/shared';
import { notFound } from 'next/navigation';
import { Collections, imgPath } from 'src/constants';

type Props = {
	params: {
		id: Collections,
		lang: Locales,
	}
};

export default async function Page({ params: { id, lang } }: Props) {
	const { t } = await fetchTranslation(lang, ['common', 'collectionsPage']);
	const movies = await fetchMoviesByCollection(id, 1, { lang });

	if (!movies || movies.results.length === 0) {
		notFound();
	}

	const imageData: PlaceholderData | null = await fetchImageWithPlaceholder(
		`/assets/images/collection-${id}.webp`);

	return (
			{imageData && (
				<ThemedImage
					className='absolute top-0 left-0 aspect-[5/4] lg:aspect-video -z-100 opacity-[0.25] dark:brightness-[0.25] dark:opacity-100 object-cover'
					src={imageData.img.src}
					placeholder='blur'
					blurDataURL={imageData.base64}
					width={1920}
					height={960}
					sizes='100vw'
					priority
					alt={t(`collections.${id}`)}
				/>
			)}

				<Container>
					<Breadcrumbs
						className='mb-2'
						label='breadcrumbs navigation'
						lastItemLabel={t(`collections.${id}`)}
					/>

					<Title
						className='mb-3 lg:mb-5 text-neutral-1000 dark:text-dark-neutral-900'
						level={2}
						as='h1'
					>
						{t(`collections.${id}`)}
					</Title>

					<div className='mx-auto xs:mx-0 max-w-[320px] xs:max-w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-5'>
						{movies.results.map(({
							backdrop_path,
							id,
							title,
							genre_ids,
							release_date,
							vote_average
						}) => (
							<MovieCard
								mediaType='movie'
								movieId={id}
								key={id}
								src={backdrop_path ? `${imgPath['backdrop']}${backdrop_path}` : ''}
								alt={title}
								title={title}
								titleElement='h4'
								appearance='secondary'
								genres={genre_ids}
								showRating
								rating={vote_average * 10}
								releaseDate={getLocalizedDate(release_date, lang)}
								titleLevel={5}
								sizes='(min-width: 1230px) 286px, (min-width: 1024px) 25vw, (min-width: 650px) 33.3vw, (min-width: 480px) 50vw, 320px'
							/>
						))}
					</div>
				</Container>
			</section>
		</main>
	);
}