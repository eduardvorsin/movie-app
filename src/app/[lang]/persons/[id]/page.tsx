import { notFound } from 'next/navigation'
import Title from '@/components/Title/Title';
import Image from 'next/image';
import Link from '@/components/Link/Link';
import CharacteristicList from '@/components/CharacteristicList/CharacteristicList';
import ExpandableText from '@/components/ExpandableText/ExpandableText';
import { createSocialNetworksArray } from '@/helpers/createSocialNetworksArray/createSocialNetworksArray';
import { createCharacteristicsArray } from '@/helpers/createCharacteristicsArray/createCharacteristicsArray';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { getLocalizedDate } from '@/i18n/utils/getLocalizedDate/getLocalizedDate';
import { fetchActor } from '@/services/fetchActor/fetchActor';
import { fetchImageWithPlaceholder } from 'src/helpers/fetchImageWithPlaceholder/fetchImageWithPlaceholder';
import Container from '@/components/Container/Container';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import { imgPath } from 'src/constants';
import ThemedImage from '@/components/ThemedImage/ThemedImage';

const characteristicFields = new Set([
	'known_for_department',
	'place_of_birth',
	'gender',
	'birthday',
	'deathday',
	'popularity',
]);

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

	const {
		profile_path,
		external_ids,
		biography,
		combined_credits,
		name,
		homepage,
	} = actor;

	let imageData: PlaceholderData | null = null;
	if (profile_path) {
		imageData = await fetchImageWithPlaceholder(
			`${imgPath['profile']}${profile_path}`,
			true
		);
	}

	const currentBiography = biography.split('\n').filter((str) => str !== '');

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
		<Container
			className='bg-neutral-0 dark:bg-dark-neutral-250 py-4 sm:py-6 md:py-8 lg:py-10 min-h-[100vh] h-full flex flex-col sm:flex-row items-start'
		>
			<div
				className='basis-full sm:basis-[16.25rem] md:basis-[18.75rem] lg:basis-[21.375rem] mr-0 sm:mr-8 md:mr-10 lg:mr-12 self-center sm:self-start flex flex-col items-center'
			>
				<ThemedImage
					className='self-center object-cover rounded-2 max-w-[14.375rem] mb-5 md:mb-6 lg:mb-8 bg-neutral-300 dark:bg-dark-neutral-350 sm:max-w-[16.25rem] md:max-w-[18.75rem] lg:max-w-[21.375rem]'
					width={342}
					height={513}
					alt={name}
					sizes='(min-width: 1024px) 342px, (min-width: 768px) 300px, (min-width: 640px) 260px, 230px'
					placeholder={profile_path ? 'blur' : 'empty'}
					blurDataURL={imageData?.base64}
					priority
					src={{
						light: imageData?.img.src ?? '',
						dark: imageData?.img.src ?? '',
					}}
					fallback={{
						light: '/assets/images/light-person-placeholder.svg',
						dark: '/assets/images/dark-person-placeholder.svg'
					}}
				/>

				<section>
					<Title
						className='sr-only'
						level={4}
						as='h2'
					>
						Links to social networks
					</Title>
					{homepage && (
						<p className='flex items-center flex-wrap'>
							<span className='text-dark-neutral-250 dark:text-neutral-300 mr-2'>
								{t('personalWebsite', { ns: 'personsPage' })}
							</span>
							<Link
								className='flex items-center'
								href={homepage}
								target='_blank'
								isExternal
							>
								{homepage}
								<svg className='w-4 h-4 ml-2 fill-current' viewBox='0 0 32 32'>
									<use href={'/assets/icons/external-link.svg#external-link'}></use>
								</svg>
							</Link>
						</p>
					)}
					<SocialLinks data={socialNetworks} />
				</section>
			</div>

			<div className='flex flex-col'>
				<Title
					className='mb-2 text-neutral-1000 dark:text-dark-neutral-1000 sm:mb-3 md:mb-4 lg:mb-6'
					weight={500}
					level={1}
				>
					{name}
				</Title>

				<section>
					<Title
						className='text-neutral-1000 dark:text-dark-neutral-1000 mb-1 xs:mb-2'
						level={4}
						weight={500}
						as='h2'
					>
						{t('aboutPerson', { ns: 'personsPage' })}
					</Title>

					<CharacteristicList
						className='max-w-[36.25rem] mb-4 md:mb-5 lg:mb-6'
						data={characteristicData}
					/>
				</section>

				{currentBiography.length !== 0 && (
					<section>
						<Title
							className='text-neutral-1000 dark:text-dark-neutral-1000 mb-2'
							level={4}
							weight={500}
							as='h2'
						>
							{t('biography', { ns: 'personsPage' })}
						</Title>
						<ExpandableText
							className='text-neutral-900 dark:text-dark-neutral-900'
							visibleRowsCount={2}
						>
							{currentBiography}
						</ExpandableText>
					</section>
				)}
			</div>
		</Container>
	);
}