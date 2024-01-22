import Container from '@/components/Container/Container';
import ExpandableText from '@/components/ExpandableText/ExpandableText';
import Title from '@/components/Title/Title';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { notFound } from 'next/navigation';
import { fetchTVSeries } from '@/services/fetchTVSeries/fetchTVSeries';
import { TVSeriesSeasonDetails, fetchSeasonsForTVSeries } from '@/services/fetchSeasonsForTVSeries/fetchSeasonsForTVSeries';
import { createCharacteristicsArray } from '@/helpers/createCharacteristicsArray/createCharacteristicsArray';
import { getLocalizedDate } from '@/i18n/utils/getLocalizedDate/getLocalizedDate';
import CharacteristicList from '@/components/CharacteristicList/CharacteristicList';
import { Metadata } from 'next';

export async function generateMetadata(
	{ params }: { params: { lang: Locales, id: string } },
): Promise<Metadata> {
	const { t } = await fetchTranslation(params.lang, 'tvSeriesSeasonsPage');
	const tvSeries = await fetchTVSeries(params.id, {
		lang: params.lang,
		includeAdditionalData: false,
	});

	if (!tvSeries) notFound();

	return {
		title: t('metaPageName', { name: tvSeries.name }),
		description: t('metaPageDescription', { name: tvSeries.name }),
	}
}

const characteristicFields = new Set([
	'last_air_date',
	'first_air_date',
	'number_of_episodes',
	'number_of_seasons',
]);

type Props = {
	params: {
		id: string,
		lang: Locales,
	}
}

export default async function Page({ params: { id, lang } }: Props) {
	const { t } = await fetchTranslation(lang, ['tvSeriesSeasonsPage', 'common']);
	const tvSeries = await fetchTVSeries(id, {
		lang,
		includeAdditionalData: false,
	});

	if (!tvSeries) {
		notFound();
	}

	const {
		seasons,
		name,
	} = tvSeries;

	const seasonsData = await Promise.all(
		seasons.map(({ season_number }) => fetchSeasonsForTVSeries({
			id,
			seasonNumber: season_number,
			lang
		}))
	);

	const characteristicData = createCharacteristicsArray(tvSeries)
		.filter((charateristic) => characteristicFields.has(charateristic.name))
		.map(({ name, value }) => {
			let currentValue = value;
			if (name === 'first_air_date' || name === 'last_air_date') {
				currentValue = getLocalizedDate(value, lang);
			}
			return {
				name: t(`characteristics.${name}`),
				value: currentValue,
			}
		});

	const avaliableSeasonData = seasonsData.filter((season): season is TVSeriesSeasonDetails => season !== null);

	return (
		<main className='mt-[3.75rem] flex-grow'>
			<section className='py-5 md:py-8'>
				<Container>
					<Title
						className='text-neutral-900 dark:text-dark-neutral-800 mb-1 lg:mb-2'
						as='h1'
						level={2}
					>
						{t('mainTitle', { ns: 'tvSeriesSeasonsPage' })} / {name}
					</Title>

					<CharacteristicList
						className='mb-5 md:mb-6 lg:mb-8'
						data={characteristicData}
					/>

					{avaliableSeasonData.length > 0 && avaliableSeasonData.map(({
						id,
						name,
						air_date,
						episodes,
					}) => (
						<section
							key={id}
							className='mb-6 md:mb-8 lg:mb-10 last:mb-0'
						>
							<Title
								className='flex flex-wrap items-center gap-3 text-neutral-900 dark:text-dark-neutral-800 mb-2 lg:mb-4'
								as='h2'
								level={3}
							>
								{name}({air_date?.slice(0, 4)})
							</Title>

							<ul>
								{episodes.map(({
									id,
									air_date,
									name,
									overview,
									runtime,
									vote_average,
								}, index) => (
									<li
										className='pb-4 last:pb-0 pt-4 first:pt-0 text-neutral-1000 dark:text-dark-neutral-900 border-b-1 border-neutral-300 dark:border-dark-neutral-350 last:border-none'
										key={id}
									>
										<div>
											<Title
												level={4}
												as='h3'
											>
												{index < 9 ? `0${index + 1}` : index + 1}. {name}

												<p className='mt-1 flex flex-wrap gap-y-2 text-200'>
													<span
														className='flex items-center font-medium after:content-["/"] after:font-regular after:ml-2 after:mr-2 last:after:hidden'
														aria-label={t('ratingLabel')}
													>
														<svg
															className='w-4 h-4 text-neutral-600 dark:text-dark-neutral-600 mr-2'
															viewBox='0 0 20 20'
														>
															<use href={'/assets/icons/star.svg#star'}></use>
														</svg>
														{vote_average}
													</span>

													{runtime && (
														<span
															className='flex font-regular after:content-["/"] after:ml-2 after:mr-2 last:after:hidden'
															aria-label={t('ratingLabel')}
														>
															{t('duration', { time: runtime })}
														</span>)}

													<span className='font-regular'>
														{getLocalizedDate(air_date, lang)}
													</span>
												</p>
											</Title>

											{overview.length > 0 && (
												<ExpandableText className='mt-3'>
													{overview}
												</ExpandableText>
											)}
										</div>
									</li>
								))}
							</ul>
						</section>
					))}
				</Container>
			</section>
		</main>
	);
}