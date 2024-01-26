import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import InfiniteMovieFeed from '@/components/InfiniteMovieFeed/InfiniteMovieFeed';
import ThemedImage from '@/components/ThemedImage/ThemedImage';
import Title from '@/components/Title/Title';
import { fetchImageWithPlaceholder } from '@/helpers/fetchImageWithPlaceholder/fetchImageWithPlaceholder';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { fetchMoviesByCollection } from '@/services/fetchMovieByCollection/fetchMovieByCollection';
import { fetchTVSeriesByCollection } from '@/services/fetchTVSeriesByCollection/fetchTVSeriesByCollection';
import { PlaceholderData } from '@/types/shared';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Collections } from 'src/constants';

export async function generateMetadata(
	{ params }: { params: { lang: Locales, id: Collections } },
): Promise<Metadata> {
	const { t } = await fetchTranslation(params.lang, ['common', 'collectionDetailsPage']);
	return {
		title: t(`metaPageName.${params.id}`, {
			ns: ['common', 'collectionDetailsPage']
		}),
		description: t(`metaPageDescription.${params.id}`, {
			ns: ['common', 'collectionDetailsPage']
		}),
	}
}

type Props = {
	params: {
		id: Collections,
		lang: Locales,
	}
};

export default async function Page({ params: { id, lang } }: Props) {
	const { t } = await fetchTranslation(lang, ['common', 'collectionDetailsPage']);
	const movies = await fetchMoviesByCollection(id, 1, { lang });
	const tvSeries = await fetchTVSeriesByCollection(id, 1, { lang });

	if ((!movies || movies.results.length === 0) && (!tvSeries || tvSeries.results.length === 0)) {
		notFound();
	}

	const imageData: PlaceholderData | null = await fetchImageWithPlaceholder(
		`/assets/images/collection-${id}.webp`);

	return (
		<main className='mt-[3.75rem] flex-grow relative'>
			<Title
				className='sr-only mb-3 lg:mb-5 text-neutral-1000 dark:text-dark-neutral-900'
				level={2}
				as='h1'
			>
				{t(`collections.${id}`)}
			</Title>

			{imageData && (
				<ThemedImage
					className='absolute top-0 left-0 aspect-[5/4] lg:aspect-video -z-100 opacity-[0.25] dark:brightness-[0.25] dark:opacity-100 object-cover transition-[filter,opacity] duration-150'
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

			{movies && movies.results.length > 0 && (
				<section className='pt-3 sm:pt-[25%] pb-3 md:pb-5'>
					<Container>
						<Breadcrumbs
							className='mb-2'
							label='breadcrumbs navigation'
							lastItemLabel={t(`collections.${id}`)}
						/>

						<Title
							className='mb-3 lg:mb-5 text-neutral-1000 dark:text-dark-neutral-900'
							level={3}
							as='h2'
						>
							{t('moviesTitle', { ns: 'collectionDetailsPage' })}
						</Title>

						<InfiniteMovieFeed
							mediaType='movie'
							initialData={movies}
							contentType='collection'
							collectionName={id}
						/>
					</Container>
				</section>
			)}

			{tvSeries && tvSeries.results.length > 0 && (
				<section className='pt-3 md:pt-5 pb-3 md:pb-5'>
					<Container>
						<Title
							className='mb-3 lg:mb-5 text-neutral-1000 dark:text-dark-neutral-900'
							level={3}
							as='h2'
						>
							{t('tvSeriesTitle', { ns: 'collectionDetailsPage' })}
						</Title>

						<InfiniteMovieFeed
							mediaType='tv'
							contentType='collection'
							initialData={tvSeries}
							collectionName={id}
						/>

					</Container>
				</section>
			)}
		</main>
	);
}