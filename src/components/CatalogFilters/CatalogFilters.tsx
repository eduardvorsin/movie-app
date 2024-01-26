'use client';

import { GeneralProps, MovieGenres } from '@/types/shared';
import Select from '../Select/Select';
import { MouseEventHandler, useId, useMemo, useState } from 'react';
import { SortOptions } from '@/services/types';
import Button from '../Button/Button';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Countries } from '@/helpers/getCountryCodeFromName/getCountryCodeFromName';
import { Locales, fallbackLng } from '@/i18n/settings';
import { useTranslation } from 'react-i18next';

const movieGenres: MovieGenres[] = ['animation', 'comedy', 'crime', 'documentary', 'family', 'mystery', 'western', 'adventure', 'romance', 'history', 'music', 'war', 'thriller', 'fantasy', 'horror', 'tv movie', 'action', 'science fiction'];

const countries: Countries[] = ['australia', 'argentina', 'armenia', 'belarus', 'belgium', 'brazil', 'uk', 'hungary', 'germany', 'denmark', 'india', 'ireland', 'spain', 'italy', 'kazakhstan', 'canada', 'china', 'colombia', 'mexico', 'latvia', 'netherlands', 'new zealand', 'norway', 'poland', 'russia', 'usa', 'thailand', 'turkey', 'ukraine', 'finland', 'france', 'switzerland', 'sweden', 'south africa', 'south korea', 'japan'
];

const timePeriods = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2000-2009', '1990-1999', '1980-1989', '1970-1979', '1960-1969', '1950-1959',
] as const;

export type CatalogSortOptions = Extract<
	SortOptions,
	'popularity.desc' | 'primary_release_date.desc' | 'vote_average.desc' | 'revenue.desc'
>;

const sortValues: CatalogSortOptions[] = ['popularity.desc', 'primary_release_date.desc', 'vote_average.desc', 'revenue.desc'];

type Props = {
	onSearchButtonClick?: () => void,
} & GeneralProps;

export default function CatalogFilters({
	className,
	testId,
	onSearchButtonClick,
}: Props) {

	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);
	const id = useId();
	const [genre, setGenre] = useState<MovieGenres | null>(null);
	const [country, setCountry] = useState<Countries | null>(null);
	const [timePeriod, setTimePeriod] = useState<string | null>(null);
	const [sortBy, setSortBy] = useState<CatalogSortOptions>('vote_average.desc');
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const genreOptions = useMemo(() => {
		return movieGenres.map((value) => ({
			label: t(`catalogFilters.genreSelect.${value}`),
			value,
		}));
	}, [t]);

	const countryOptions = useMemo(() => {
		return countries.map((value) => ({
			label: t(`catalogFilters.countrySelect.${value}`),
			value,
		}));
	}, [t]);

	const timePeriodOptions = useMemo(() => {
		return timePeriods.map((value) => ({
			label: value,
			value,
		}));
	}, []);

	const sortOptions = useMemo(() => {
		return sortValues.map((value) => ({
			label: t(`catalogFilters.sortBySelect.${value}`),
			value,
		}));
	}, [t]);

	const genreChangeHandler = (value: string) => {
		setGenre(value as MovieGenres);
	};

	const countryChangeHandler = (value: string) => {
		setCountry(value as Countries);
	};

	const timePeriodChangeHandler = (value: string) => {
		setTimePeriod(value);
	};

	const sortByChangeHandler = (value: string) => {
		setSortBy(value as CatalogSortOptions);
	};

	const resetButtonClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
		setGenre(null);
		setCountry(null);
		setTimePeriod(null);
		setSortBy('vote_average.desc');
		router.push(pathname);
	}

	const searchButtonClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
		if (!genre && !country && !timePeriod) return;

		const params = new URLSearchParams(searchParams.toString());
		params.set('genre', genre ?? 'any');
		params.set('country', country ?? '');
		params.set('timePeriod', timePeriod ?? '');
		params.set('sortBy', sortBy);
		router.push(`${pathname}?${params.toString()}`);

		if (onSearchButtonClick) onSearchButtonClick();
	};

	const classes = [
		'p-2 xs:p-3 md:p-4 bg-neutral-300 dark:bg-dark-neutral-250 transition-colors duration-150',
		className
	].join(' ');

	return (
		<div
			className={classes}
			data-testid={testId}
		>
			<div className='flex gap-2 xs:gap-3 mb-2 xs:mb-3 flex-wrap md:flex-nowrap'>
				<Select
					className='flex-shrink flex-grow-0 basis-full xs:basis-[calc(50%-12px)] md:basis-1/4'
					id={`${id}-genre`}
					labelHidden
					label={t('catalogFilters.genreSelectLabel')}
					placeholder={t('catalogFilters.genreSelectLabel')}
					name='genre'
					options={genreOptions}
					value={genre}
					closeMenuOnScroll
					closeMenuOnSelect
					openMenuOnFocus
					onChange={genreChangeHandler}

				/>
				<Select
					className='flex-shrink flex-grow-0 basis-full xs:basis-[calc(50%-12px)] md:basis-1/4'
					id={`${id}-country`}
					labelHidden
					label={t('catalogFilters.countrySelectLabel')}
					placeholder={t('catalogFilters.countrySelectLabel')}
					name='country'
					options={countryOptions}
					value={country}
					closeMenuOnScroll
					closeMenuOnSelect
					openMenuOnFocus
					onChange={countryChangeHandler}

				/>
				<Select
					className='flex-shrink flex-grow-0 basis-full xs:basis-[calc(50%-12px)] md:basis-1/4'
					id={`${id}-timePeriod`}
					labelHidden
					label={t('catalogFilters.timePeriodSelectLabel')}
					placeholder={t('catalogFilters.timePeriodSelectLabel')}
					name='timePeriod'
					options={timePeriodOptions}
					value={timePeriod}
					closeMenuOnScroll
					closeMenuOnSelect
					openMenuOnFocus
					onChange={timePeriodChangeHandler}
				/>
				<Select
					className='flex-shrink flex-grow-0 basis-full xs:basis-[calc(50%-12px)] md:basis-1/4'
					id={`${id}-sort-by`}
					labelHidden
					label={t('catalogFilters.sortBySelectLabel')}
					placeholder={t('catalogFilters.sortBySelectLabel')}
					name='sorting'
					options={sortOptions}
					value={sortBy}
					closeMenuOnScroll
					closeMenuOnSelect
					openMenuOnFocus
					onChange={sortByChangeHandler}
				/>
			</div>

			<div className='flex flex-wrap gap-y-1 gap-x-3 items-center'>
				<Button
					className='[&]:px-0'
					appearance='ghost'
					onClick={resetButtonClickHandler}
				>
					<svg
						className='w-6 h-6 mr-0.5 fill-current'
						viewBox='0 0 32 32'
					>
						<use href={'/assets/icons/cancel.svg#cancel'}></use>
					</svg>

					{t('catalogFilters.resetButton')}
				</Button>

				<Button
					appearance='primary'
					onClick={searchButtonClickHandler}
				>
					{t('catalogFilters.searchButton')}
				</Button>
			</div>
		</div>
	);
}