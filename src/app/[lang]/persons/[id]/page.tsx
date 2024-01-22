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
import { fetchPerson } from '@/services/fetchPerson/fetchPerson';
import { fetchImageWithPlaceholder } from 'src/helpers/fetchImageWithPlaceholder/fetchImageWithPlaceholder';
import Container from '@/components/Container/Container';
import { createFilmographyData } from '@/helpers/createFilmographyData/createFilmographyData';
import TabPanel from '@/components/Tabs/TabPanel/TabPanel';
import { Department, PlaceholderData } from '@/types/shared';
import Tabs from '@/components/Tabs/Tabs';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import { imgPath, routes } from 'src/constants';
import ThemedImage from '@/components/ThemedImage/ThemedImage';
import { fetchPopularPersons } from '@/services/fetchPopularPersons/fetchPopularPersons';
import PersonCard from '@/components/PersonCard/PersonCard';
import { FamousPersonProjectsCarousel, PersonCardsCarousel } from '@/components/Carousel/Carousel';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import MovieCard from '@/components/MovieCard/MovieCard';
import { Metadata } from 'next';

export async function generateMetadata(
	{ params }: { params: { lang: Locales, id: string } },
): Promise<Metadata> {
	const person = await fetchPerson(params.id, { lang: params.lang });

	if (!person) notFound();

	return {
		title: person.name,
		description: person.biography,
	}
}

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
	const { t } = await fetchTranslation(lang, ['personDetailsPage', 'common']);
	const person = await fetchPerson(id, { lang });
	const popularPersons = await fetchPopularPersons(1, { lang });

	if (!person) {
		return notFound();
	}

	const {
		profile_path,
		external_ids,
		biography,
		combined_credits,
		name,
		homepage,
		known_for_department,
	} = person;

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

	const characteristicData = createCharacteristicsArray(person)
		.filter((item) => characteristicFields.has(item.name))
		.map(({ name, value }) => {
			let currentValue = value;
			if (name === 'gender') {
				currentValue = t(`genderValues.${value}`);
			} else if (name === 'known_for_department' && lang !== 'en') {
				currentValue = t(`department.${value.toLowerCase()}`, { ns: 'personDetailsPage', context: person.gender });
			} else if (name === 'birthday' || name === 'deathday') {
				currentValue = getLocalizedDate(value, lang);
			}

			return {
				name: t(`characteristics.${name}`),
				value: currentValue,
			}
		});

	const filmography = createFilmographyData(combined_credits);

	const credits = known_for_department === 'Acting' ? combined_credits.cast : combined_credits.crew;
	const knownFor = credits
		.filter(({ vote_average }) => vote_average > 6)
		.sort((a, b) => (b.vote_average - a.vote_average) && (b.vote_count - a.vote_count))
		.slice(0, 20);

	return (
		<main className='mt-[5rem] flex-grow'>
			<Container className='[&]:px-0'>
				<Breadcrumbs
					className='px-4 xl:px-0 mb-[1.25rem]'
					label='breadcrumbs navigation'
					lastItemLabel={name}
				/>

				<div className='bg-neutral-0 dark:bg-dark-neutral-250 px-4 py-4 sm:py-6 md:py-8 lg:py-10 min-h-[calc(100vh-80px)] h-full grid grid-cols-[1fr] md:grid-cols-[16.875rem_1fr] lg:grid-cols-[21.375rem_1fr] gap-x-0 md:gap-x-6 lg:gap-x-12 gap-y-5 md:gap-y-6 lg:gap-y-8'>
					<div
						className='self-center md:self-start flex flex-col'
					>
						<ThemedImage
							className='self-center object-cover rounded-2 max-w-[14.375rem] mb-6 sm:mb-8 bg-neutral-300 dark:bg-dark-neutral-350 sm:max-w-[15.625rem] md:max-w-[16.875rem] lg:max-w-[21.375rem] border-1 border-neutral-300 dark:border-dark-neutral-300'
							width={342}
							height={513}
							alt={name}
							sizes='(min-width: 1024px) 342px, (min-width: 768px) 300px, (min-width: 640px) 260px, 230px'
							placeholder={profile_path ? 'blur' : 'empty'}
							blurDataURL={imageData?.base64}
							priority
							src={imageData?.img.src ?? ''}
							fallback={{
								light: '/assets/images/person-placeholder-l.svg',
								dark: '/assets/images/person-placeholder-d.svg'
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
								<p className='flex items-center flex-wrap mb-3'>
									<span className='text-dark-neutral-250 dark:text-neutral-300 mr-2'>
										{t('personalWebsite', { ns: 'personDetailsPage' })}
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

					<div className='flex flex-col overflow-hidden'>
						<Title
							className='mb-2 text-neutral-1000 dark:text-dark-neutral-1000 sm:mb-3 md:mb-4 lg:mb-6'
							weight={500}
							level={1}
						>
							{name}
						</Title>

						<section className='mb-4 md:mb-5 lg:mb-6'>
							<Title
								className='text-neutral-1000 dark:text-dark-neutral-1000 mb-1 xs:mb-2'
								level={4}
								weight={500}
								as='h2'
							>
								{t('aboutPerson', { ns: 'personDetailsPage' })}
							</Title>
							<CharacteristicList
								className='max-w-[36.25rem]'
								data={characteristicData}
							/>
						</section>

						{currentBiography.length !== 0 && (
							<section className='mb-4 md:mb-5 lg:mb-6'>
								<Title
									className='text-neutral-1000 dark:text-dark-neutral-1000 mb-2 sm:mb-3 md:mb-4'
									level={4}
									weight={500}
									as='h2'
								>
									{t('biography', { ns: 'personDetailsPage' })}
								</Title>
								<ExpandableText
									className='text-neutral-900 dark:text-dark-neutral-900'
									visibleRowsCount={2}
								>
									{currentBiography}
								</ExpandableText>
							</section>
						)}

						{knownFor && knownFor.length > 0 && (
							<section className='mb-4 md:mb-5 lg:mb-6'>
								<Title
									className='text-neutral-1000 dark:text-dark-neutral-1000 mb-2 sm:mb-3 md:mb-4'
									as='h2'
									level={4}
									weight={500}
								>
									{t('famousProjectsTitle')}
								</Title>
								<FamousPersonProjectsCarousel
									mousewheel
									spaceBetween={20}
									showPagination
									paginationType='fraction'
									showArrows
									breakpoints={{
										0: {
											slidesPerView: 1,
										},
										375: {
											slidesPerView: 2,
										},
										480: {
											slidesPerView: 3
										},
										640: {
											slidesPerView: 4
										},
										768: {
											slidesPerView: 3
										},
										1024: {
											slidesPerView: 4,
										},
										1232: {
											slidesPerView: 5,
										}
									}}
								>
									{knownFor.map(({
										id,
										poster_path,
										title,
										vote_average,
										release_date,
										first_air_date,
										genre_ids,
										media_type,
										name,

									}) => (
										<MovieCard
											mediaType={media_type}
											variant='vertical'
											className='max-w-[213px] xs:max-w-full mx-auto xs:mx-0 mb-2'
											movieId={id}
											key={id}
											src={poster_path ? `${imgPath['movieCard_v']}${poster_path}` : ''}
											alt={media_type === 'tv' ? name : title}
											title={media_type === 'tv' ? name : title}
											titleElement='h4'
											genres={genre_ids}
											releaseDate={getLocalizedDate(media_type === 'tv' ? (first_air_date ?? '') : (release_date ?? ''), lang)}
											titleLevel={5}
											showRating
											rating={vote_average * 10}
											sizes='(min-width: 1230px) 146px, (min-width: 1024px) 16.4vw, (min-width: 768px) 22.7vw, (min-width: 640px) 25vw, (min-width: 480px) 33.3vw, (min-width: 375px) 50vw, 213px'
										/>
									))}
								</FamousPersonProjectsCarousel>
							</section>
						)}

						<section>
							<Title
								className='text-neutral-1000 dark:text-dark-neutral-1000 mb-2 sm:mb-3 md:mb-4'
								level={4}
								weight={500}
								as='h2'
							>
								{t('filmography.title', { ns: 'personDetailsPage' })}
							</Title>
							<Tabs
								className='col-start-2 col-end-3 overflow-hidden'
								id='filmography'
							>
								{(Object.keys(filmography) as Lowercase<Department>[]).map((key) => (
									<TabPanel
										className='w-full'
										key={key}
										label={t(`filmography.tabs.${key}`, { ns: 'personDetailsPage', context: person.gender })}
									>
										<ul>
											{filmography[key].map(({
												id,
												media_type,
												name,
												first_air_date,
												release_date,
												character,
												vote_average,
												vote_count,
												title
											}, index) => (
												<li
													className='border-neutral-300 dark:border-dark-neutral-350 border-b-2 last:border-b-[0px]'
													key={`${id}-${index}`}
												>
													<NextLink
														className='flex px-2 py-3 justify-between items-center
														hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-dark-neutral-250 dark:active:bg-dark-neutral-300 transition-colors duration-150'
														href={media_type === 'tv' ? `${routes.tv}${id}` : `${routes.movies}${id}`}
													>
														<div>
															<Title
																className='line-clamp-2'
																weight={500}
																level={6}
																as='h3'
															>
																{media_type === 'tv' ? name : title}
																({media_type === 'tv' ? first_air_date : release_date})
															</Title>
															{character && (
																<p className='block mt-1 text-100 text-neutral-900 dark:text-dark-neutral-800'>
																	{character}
																</p>
															)}
														</div>
														<p className='flex flex-col flex-shrink-0 flex-grow-0 basis-16 text-center leading-none'>
															<span className='text-200 font-bold text-blue-700 dark:text-blue-400'>
																{vote_average}
															</span>
															<span className='text-100 mt-1 text-neutral-900 dark:text-dark-neutral-800'>
																{vote_count}
															</span>
														</p>
													</NextLink>
												</li>
											))}
										</ul>
									</TabPanel>
								))}
							</Tabs>
						</section>
					</div>

					<div className='md:col-span-full overflow-hidden'>
						<section>
							<Title
								className='text-neutral-1000 dark:text-dark-neutral-1000 mb-2 sm:mb-3 md:mb-4'
								level={4}
								weight={500}
								as='h2'
							>
								{t('personsTitle', { ns: 'personDetailsPage' })}
							</Title>
							<PersonCardsCarousel
								mousewheel
								spaceBetween={20}
								paginationType='fraction'
								showPagination
								breakpoints={{
									0: {
										slidesPerView: 1,
									},
									375: {
										slidesPerView: 2,
									},
									480: {
										slidesPerView: 3,
									},
									640: {
										slidesPerView: 4,
									},
									768: {
										slidesPerView: 5,
									},
									1024: {
										slidesPerView: 6,
									}
								}}
							>
								{popularPersons && popularPersons.results.map(({
									id,
									profile_path,
									name,
									popularity,
									known_for_department,
									gender,
								}) => (
									<PersonCard
										className='mb-2 mx-auto'
										personId={id}
										key={id}
										src={profile_path ? `${imgPath['profileCard']}${profile_path}` : ''}
										alt={name}
										title={name}
										titleElement='h4'
										titleLevel={6}
										showRating
										rating={popularity}
									>
										{t(`department.${known_for_department.toLowerCase()}`, { ns: 'personDetailsPage', context: gender })}
									</PersonCard>
								))}
							</PersonCardsCarousel>
						</section>
					</div>
				</div>
			</Container>
		</main>
	);
}