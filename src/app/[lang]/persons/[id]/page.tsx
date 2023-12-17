import { notFound } from 'next/navigation'
import Title from '@/components/Title/Title';
import Link from '@/components/Link/Link';
import NextLink from 'next/link'
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
import { createFilmographyData } from '@/helpers/createFilmographyData/createFilmographyData';
import TabPanel from '@/components/Tabs/TabPanel/TabPanel';
import { Department, PlaceholderData } from '@/types/shared';
import Tabs from '@/components/Tabs/Tabs';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import { imgPath } from 'src/constants';
import ThemedImage from '@/components/ThemedImage/ThemedImage';
import { fetchPopularPersons } from '@/services/fetchPopularPersons/fetchPopularPersons';
import PersonCard from '@/components/PersonCard/PersonCard';
import Carousel from '@/components/Carousel/Carousel';

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

	const socialNetworks = createSocialNetworksArray({
		...external_ids,
		imdb_id: `name/${external_ids.imdb_id}`,
	});
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

	const filmography = createFilmographyData(combined_credits);

	const popularPersons = await fetchPopularPersons(1, { lang });

	return (
		<main className='mt-[5rem]'>
		</main>
	);
}