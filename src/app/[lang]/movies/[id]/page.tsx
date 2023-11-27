import CharacteristicList from '@/components/CharacteristicList/CharacteristicList';
import Container from '@/components/Container/Container';
import ExpandableText from '@/components/ExpandableText/ExpandableText';
import Link from '@/components/Link/Link';
import PieChart from '@/components/PieChart/PieChart';
import Title from '@/components/Title/Title';
import { createCharacteristicsArray } from '@/helpers/createCharacteristicsArray/createCharacteristicsArray';
import { fetchTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { formatCurrency } from '@/i18n/utils/formatCurrency/formatCurrency';
import { getLanguageNameFromLocale } from '@/i18n/utils/getLanguageNameFromLocale/getLanguageNameFromLocale';
import { getLocalizedDate } from '@/i18n/utils/getLocalizedDate/getLocalizedDate';
import { fetchMovie } from '@/services/fetchMovie/fetchMovie';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const characteristicFields = new Set([
	'production_countries',
	'genres',
	'original_title',
	'release_date',
	'runtime',
	'vote_average',
	'original_language',
	'budget',
	'revenue',
	'status'
]);

const chartBarColors = {
	'low': {
		dark: '#FF9C8F',
		light: '#AE2A19',
	},
	'medium': {
		dark: '#F5CD47',
		light: '#946F00',
	},
	'high': {
		dark: '#7EE2B8',
		light: '#216E4E',
	},
};

type Props = {
	params: {
		id: string,
		lang: Locales,
	}
}

export default async function Page({ params: { id, lang } }: Props) {
	const { t } = await fetchTranslation(lang, ['moviesPage', 'common']);
	const movie = await fetchMovie(id, { lang });

	if (movie instanceof Error) {
		notFound();
	}

	const {
		production_countries,
		runtime,
		backdrop_path,
		poster_path,
		release_date,
		genres,
		vote_average,
		tagline,
		overview,
		homepage,
	} = movie;

	const backdropUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;
	const posterUrl = `https://image.tmdb.org/t/p/w300${poster_path}`;
	const releaseYear = release_date.slice(0, 4) || '-';
	const allGenres = genres.map((genre) => genre.name.toLowerCase()).join(', ');
	const movieDuration = `${runtime}m | ${Math.floor(runtime / 60)}:${runtime % 60}`;
	const rating = Math.floor(vote_average * 10);

	const characteristicData = createCharacteristicsArray({
		...movie,
		production_countries: production_countries[0]?.name ?? '-',
	})
		.filter((charateristic) => characteristicFields.has(charateristic.name))
		.map(({ name, value }) => {
			let currentValue = value;
			if (name === 'genres') {
				currentValue = allGenres;
			} else if (name === 'release_date') {
				currentValue = getLocalizedDate(value, lang);
			} else if (name === 'original_language') {
				currentValue = getLanguageNameFromLocale(value, lang) ?? t('unknown', { ns: 'common' });
			} else if (name === 'vote_average') {
				currentValue = `${rating.toString()}%`;
			} else if (name === 'runtime') {
				currentValue = movieDuration;
			} else if (name === 'budget' || name === 'revenue') {
				currentValue = formatCurrency(+value, lang);
			}

			return {
				name: t(`movieCharacteristics.${name}`, { ns: 'moviesPage' }),
				value: currentValue,
			}
		});

	let ratingType: keyof typeof chartBarColors;
	if (rating >= 0 && rating <= 40) {
		ratingType = 'low';
	} else if (rating >= 40 && rating <= 70) {
		ratingType = 'medium';
	} else {
		ratingType = 'high';
	}

	return (
		<main>
			<section
				className='py-8 bg-blend-overlay bg-cover bg-no-repeat bg-neutral-300 dark:bg-dark-neutral-100'
				style={{
					backgroundImage: `url(${backdropUrl})`,
				}}
			>
				<Container className='flex'>
					<Image
						className='mr-10 object-cover rounded-2 max-w-[18.75rem] w-full shrink-0 grow-0 self-start bg-neutral-300 dark:bg-dark-neutral-300 justify-self-center border-1 border-neutral-300 dark:border-dark-neutral-300'
						width={300}
						height={450}
						src={posterUrl}
						alt='poster'
						priority
					/>
					<div>
						<div className='mb-6'>
							<Title
								className='mb-1'
								level={2}
								as='h1'
							>
								<Link
									className='no-underline'
									href={homepage}
									isExternal
									target='_blank'
								>
									{movie.title}
								</Link>
								<span
									className='text-neutral-900 dark:text-dark-neutral-800'
								>
									({releaseYear})
								</span>
							</Title>
							<ul
								className='flex text-neutral-900 dark:text-dark-neutral-900'
							>
								<li
									className='after:content-["/"] after:ml-2 after:mr-2'
								>
									{movie.release_date || '-'}
								</li>
								<li
									className='after:content-["/"] after:ml-2 after:mr-2'
								>
									{allGenres}
								</li>
								<li>
									{movieDuration}
								</li>
							</ul>
						</div>
						<div className='mb-5'>
							<span
								className='text-neutral-1000 dark:text-dark-neutral-900 font-medium mr-2'
							>
								{t('rating', { ns: 'moviesPage' })}
							</span>
							<PieChart
								size={60}
								value={rating}
								barColor={chartBarColors[ratingType]}
							/>
						</div>
						<div>
							<p
								className='text-neutral-900 dark:text-dark-neutral-700 italic mb-[0.625rem]'
							>
								{tagline}
							</p>
							<Title
								className='mb-2 text-neutral-900 dark:text-dark-neutral-800'
								level={3}
								as='h2'
							>
								{t('review', { ns: 'moviesPage' })}
							</Title>
							<ExpandableText className='mb-5'>
								{overview}
							</ExpandableText>
						</div>
					</div>
				</Container>
			</section>
			<section className='py-8'>
				<Container>
					<Title
						className='mb-5 text-neutral-900 dark:text-dark-neutral-800'
						as='h2'
						level={3}
					>
						{t('aboutMovie', { ns: 'moviesPage' })}
					</Title>
					<CharacteristicList
						data={characteristicData}
					/>
				</Container>
			</section>
		</main>
	);
}
