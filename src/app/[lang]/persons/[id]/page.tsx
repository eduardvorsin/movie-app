import { notFound } from 'next/navigation'
import Title from '@/components/Title/Title';
import Image from 'next/image';
import Link from '@/components/Link/Link';
import CharacteristicList from '@/components/CharacteristicList/CharacteristicList';
import ExpandableText from '@/components/ExpandableText/ExpandableText';
import { createCharacteristicsArray, createSocialNetworksArray } from '@/helpers';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { getLocalizedDate } from '@/i18n/utils/getLocalizedDate/getLocalizedDate';
import { fetchActor } from '@/services/fetchActor/fetchActor';
import { fetchImageWithPlaceholder } from 'src/helpers/fetchImageWithPlaceholder/fetchImageWithPlaceholder';

const characteristicFields = new Set([
	'known_for_department',
	'place_of_birth',
	'gender',
	'birthday',
	'deathday',
	'popularity',
]);

const socialNetworkIcons = {
	imdb: '/assets/icons/imdb.svg#imdb',
	twitter: '/assets/icons/twitter.svg#twitter',
	youtube: '/assets/icons/youtube.svg#youtube',
	tiktok: '/assets/icons/tiktok.svg#tiktok',
	facebook: '/assets/icons/facebook.svg#facebook',
	instagram: '/assets/icons/instagram.svg#instagram',
} as const;

type Props = {
	params: {
		id: string
		lang: Locales,
	}
};

export default async function Page({ params: { id, lang } }: Props) {
	const { t } = await fetchTranslation(lang, ['personsPage', 'common']);
	const actor = await fetchActor(id, { lang });

	if (actor instanceof Error) {
		return notFound();
	}

	const imageUrl = `https://image.tmdb.org/t/p/w342/${actor.profile_path}`;
	const socialNetworks = createSocialNetworksArray(actor.external_ids);
	const biography = actor.biography.split('\n').filter((str) => str !== '');

	const characteristicData = createCharacteristicsArray(actor)
		.filter((item) => characteristicFields.has(item.name))
		.map(({ name, value }) => {
			let currentValue = value;
			if (name === 'gender') {
				currentValue = t(`genderValues.${value}`, { ns: 'common' });
			} else if (name === 'known_for_department' && lang !== 'en') {
				currentValue = t(`department.${value.toLowerCase()}`, { ns: 'personsPage' });
			} else if (name === 'birthday' || name === 'deathday') {
				currentValue = getLocalizedDate(value, lang);
			}

			return {
				name: t(`personCharacteristics.${name}`, { ns: 'personsPage' }),
				value: currentValue,
			}
		});

	return (
		<div
			className='max-w-[77rem] mx-auto my-0 py-4 px-4 bg-neutral-0 dark:bg-dark-neutral-250 grid items-start grid-rows-[min-content_min-content] grid-cols-1 sm:grid-cols-[16.25rem_1fr] md:grid-cols-[18.75rem_1fr] lg:grid-cols-[21.375rem_1fr] gap-y-5 md:gap-y-6 lg:gap-y-8 gap-x-8 md:gap-x-10 lg:gap-x-12'
		>
			<Image
				className='object-cover rounded-2 max-w-[14.375rem] bg-neutral-300 dark:bg-dark-neutral-100 sm:max-w-[16.25rem] md:max-w-[18.75rem] lg:max-w-[21.375rem] justify-self-center'
				width={342}
				height={513}
				src={imageUrl}
				alt={actor.name}
				sizes='(min-width: 1024px) 342px, (min-width: 768px) 300px, (min-width: 640px) 260px, 230px'
				priority
			/>

			<div className='flex flex-col'>
				<Title
					className='mb-2 text-neutral-1000 dark:text-dark-neutral-1000 sm:mb-3 md:mb-4 lg:mb-6'
					weight={500}
					level={1}
				>
					{actor.name}
				</Title>

				<Title
					className='text-neutral-1000 dark:text-dark-neutral-1000 mb-1 xs:mb-2'
					level={4}
					weight={500}
					as='h2'
				>
					{t('aboutPerson', { ns: 'personsPage' })}
				</Title>

				<CharacteristicList
					className='max-w-[36.25rem]'
					data={characteristicData}
				/>
			</div>

			<div>
				{actor.homepage && (
					<p className='flex items-center flex-wrap'>
						<span className='text-dark-neutral-250 dark:text-neutral-300 mr-2'>
							{t('personalWebsite', { ns: 'personsPage' })}
						</span>
						<Link
							className='flex items-center'
							href={actor.homepage}
							target='_blank'
							isExternal
						>
							{actor.homepage}
							<svg className='w-4 h-4 ml-2 fill-current' viewBox='0 0 32 32'>
								<use href={'/assets/icons/external-link.svg#external-link'}></use>
							</svg>
						</Link>
					</p>
				)}

				<div className='flex items-center flex-wrap -ml-[0.375rem]'>
					{socialNetworks.map((item) => (
						<div
							className='px-[0.375rem] pt-3'
							key={item.name}
						>
							<Link
								className='text-0 flex w-10 h-10 fill-neutral-300 text-dark-neutral-300 hover:fill-neutral-400 hover:text-dark-neutral-250 active:fill-dark-neutral-500 active:text-dark-neutral-200 dark:fill-dark-neutral-400 dark:text-neutral-300 dark:hover:fill-dark-neutral-500 dark:hover:text-neutral-200 dark:active:fill-dark-neutral-600 dark:active:text-neutral-100 transition-colors duration-150'
								href={item.url}
								isExternal
								target='_blank'
							>
								<svg viewBox='0 0 32 32'>
									<use href={socialNetworkIcons[item.name]}></use>
								</svg>
								{t('viewProfile', { ns: 'personsPage' })} {item.name}
							</Link>
						</div>
					))}
				</div>
			</div>
			{biography.length !== 0 && (
				<div className='col-span-full lg:col-span-1'>
					<Title
						className='text-neutral-1000 dark:text-dark-neutral-1000 mb-2'
						level={4}
						weight={500}
						as='h3'
					>
						{t('biography', { ns: 'personsPage' })}
					</Title>
					<ExpandableText
						className='text-neutral-900 dark:text-dark-neutral-900'
						visibleRowsCount={2}
					>
						{biography}
					</ExpandableText>
				</div>
			)}
		</div>
	);
}