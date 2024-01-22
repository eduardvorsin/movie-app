import Banner from '@/components/Banner/Banner';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import CatalogFilters, { CatalogSortOptions } from '@/components/CatalogFilters/CatalogFilters';
import Container from '@/components/Container/Container';
import ExpandableText from '@/components/ExpandableText/ExpandableText';
import InfiniteMovieFeed from '@/components/InfiniteMovieFeed/InfiniteMovieFeed';
import Title from '@/components/Title/Title';
import { Countries } from '@/helpers/getCountryCodeFromName/getCountryCodeFromName';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { fetchMoviesByGenre } from '@/services/fetchMoviesByGenre/fetchMoviesByGenre';
import { MovieGenres } from '@/types/shared';
import { Metadata } from 'next';

export async function generateMetadata(
	{ params }: { params: { lang: Locales } },
): Promise<Metadata> {
	const { t } = await fetchTranslation(params.lang, 'moviesPage');
	return {
		title: t('metaPageName'),
		description: t('metaPageDescription'),
	}
}


type Props = {
	params: {
		lang: Locales,
	},
	searchParams?: {
		genre?: MovieGenres,
		country?: Countries,
		timePeriod?: string,
		sortBy?: CatalogSortOptions,
		[key: string]: string | string[] | undefined,
	},
};

export default async function Page({ params: { lang }, searchParams }: Props) {
	const { t } = await fetchTranslation(lang, ['common', 'moviesPage']);
	const currentGenre = searchParams?.genre ?? 'any';
	const currenSortBy = searchParams?.sortBy ?? 'vote_average.desc';
	const currentTimePeriod = searchParams?.timePeriod ?? '';
	const currentCountry = searchParams?.country ?? '';

	const movies = await fetchMoviesByGenre(currentGenre, 1, {
		lang,
		sortBy: currenSortBy,
		timePeriod: currentTimePeriod,
		country: searchParams?.country,
	});

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

					<ExpandableText className='mb-5'>
						{[
							t('pageDescription_1', { ns: 'moviesPage' }),
							t('pageDescription_2', { ns: 'moviesPage' }),
						]}
					</ExpandableText>

					<CatalogFilters />
				</Container>
			</section>

			<section className='py-3 md:py-5'>
				<Container className='flex flex-col'>
					<Title
						className='sr-only mb-4 lg:mb-5 text-neutral-900 dark:text-dark-neutral-800'
						as='h2'
						level={3}
					>
						{t('catalogTitle', { ns: 'moviesPage' })}
					</Title>

					{movies && movies.results.length > 0 ? (
						<InfiniteMovieFeed
							key={`${currentGenre}-${currentTimePeriod}-${currentCountry}-${currenSortBy}`}
							genreName={currentGenre}
							mediaType='movie'
							initialData={movies}
							contentType='genre'
							searchOptions={{
								sortBy: currenSortBy,
								timePeriod: currentTimePeriod,
								country: searchParams?.country,
							}}
						/>
					) : (
						<Banner
							title={t('infinitePersonFeed.errorTitle')}
							appearance='danger'
						>
							{t('catalogError', { ns: 'moviesPage' })}
						</Banner>
					)}
				</Container>
			</section>
		</main>
	);
}