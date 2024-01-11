import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import CollectionCard from '@/components/CollectionCard/CollectionCard';
import Container from '@/components/Container/Container';
import ExpandableText from '@/components/ExpandableText/ExpandableText';
import Title from '@/components/Title/Title';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { collections, navigationRoutes } from 'src/constants';

type Props = {
	params: {
		lang: Locales,
	}
};

export default async function Page({ params: { lang } }: Props) {
	const { t } = await fetchTranslation(lang, ['common', 'collectionsPage']);

	return (
		<main className='mt-[3.75rem]'>
			<section className='py-3 md:py-5'>
				<Container>
					<Breadcrumbs
						className='mb-[1.25rem]'
						label='breadcrumbs navigation'
					/>

					<Title
						className='mb-2 lg:mb-3 text-neutral-1000 dark:text-dark-neutral-900'
						level={2}
						as='h1'
					>
						{t('mainTitle', { ns: 'collectionsPage' })}
					</Title>

					<ExpandableText>
						{t('pageDescription', { ns: 'collectionsPage' })}
					</ExpandableText>
				</Container>
			</section>

			<section className='py-3 md:py-5'>
				<Container>
					<Title
						className='sr-only mb-2 lg:mb-3 text-neutral-1000 dark:text-dark-neutral-900'
						level={3}
						as='h2'
					>
						{t('collectionsTitle', { ns: 'collectionsPage' })}
					</Title>

					<div className='mx-auto xs:mx-0 max-w-[320px] xs:max-w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 grid-rows-[repeat(7,1fr)] gap-5'>
						{collections.map((collection, index) => (
							<CollectionCard
								key={collection}
								title={t(`collections.${collection}`)}
								src={`/assets/images/collection-${collection}.webp`}
								href={`${navigationRoutes.collections}/${collection}`}
								sizes='(min-width: 1230px) 386px, (min-width: 768px) 33.3vw, (min-width: 480px) 50vw, 320px'
								priority={index < 3}
								alt={collection}
							/>
						))}
					</div>
				</Container>
			</section>
		</main>
	);
}