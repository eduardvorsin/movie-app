import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import ExpandableText from '@/components/ExpandableText/ExpandableText';
import InfinitePersonFeed from '@/components/InfinitePersonFeed/InfinitePersonFeed';
import Title from '@/components/Title/Title';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { fetchPopularPersons } from '@/services/fetchPopularPersons/fetchPopularPersons';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(
	{ params }: { params: { lang: Locales } },
): Promise<Metadata> {
	const { t } = await fetchTranslation(params.lang, 'personsPage');
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
	const { t } = await fetchTranslation(lang, ['common', 'personsPage']);
	const popularPersons = await fetchPopularPersons(1, { lang });

	if (!popularPersons || popularPersons.results.length === 0) {
		notFound();
	}

	return (
		<main className='mt-[3.75rem] flex-grow'>
			<section className='py-3 md:py-5'>
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
						{t('mainTitle', { ns: 'personsPage' })}
					</Title>

					<ExpandableText
						dictionary={{
							collapseButton: t('expandableText.collapseButton'),
							expandButton: t('expandableText.expandButton'),
						}}
					>
						{[
							t('pageDescription_1', { ns: 'personsPage' }),
							t('pageDescription_2', { ns: 'personsPage' }),
						]}
					</ExpandableText>
				</Container>
			</section>

			<section className='py-3 md:py-5'>
				<Container className='flex flex-col'>
					<Title
						className='sr-only mb-2 lg:mb-3 text-neutral-1000 dark:text-dark-neutral-900'
						level={3}
						as='h2'
					>
						{t('personsTitle', { ns: 'personsPage' })}
					</Title>

					<InfinitePersonFeed
						initialData={popularPersons}
						dictionary={{
							errorTitle: t('infinitePersonFeed.errorTitle'),
							errorText: t('infinitePersonFeed.errorText'),
							loadMoreButton: t('infinitePersonFeed.loadMoreButton'),
							personCard: {
								rating: t('personCard.rating'),
							}
						}}
					/>
				</Container>
			</section>
		</main>
	);
}