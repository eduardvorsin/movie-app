'use client';

import { useState } from 'react';
import { GeneralProps } from '@/types/shared';
import Button from '../Button/Button';
import PersonCard from '../PersonCard/PersonCard';
import { useParams } from 'next/navigation';
import { Locales, fallbackLng } from '@/i18n/settings';
import { imgPath } from '@/constants';
import { ListsResponse, PopularPerson } from '@/services/types';
import Banner from '../Banner/Banner';

type Props = {
	initialData: ListsResponse<PopularPerson>,
	dictionary: {
		errorTitle: string,
		errorText: string,
		loadMoreButton: string,
		personCard: Record<'rating', string>,
	}
} & GeneralProps;

export default function InfinitePersonFeed({
	className,
	initialData,
	testId,
	dictionary,
	...props
}: Props) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const [page, setPage] = useState<number>(1);
	const [items, setItems] = useState<PopularPerson[]>(initialData.results);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const loadMore = async (page: number) => {
		const res = await fetch(`/api/popularPersons?page=${page}&lang=${lang}`);
		const data = (await res.json()) as ListsResponse<PopularPerson> | null;
		if (data?.results) {
			setItems(prevItems => [...prevItems, ...data.results]);
		} else {
			setError(true);
		}

		setLoading(false);
	}

	const clickHandler = () => {
		setLoading(true);
		loadMore(page + 1);
		setPage((prevPage) => prevPage + 1);
	};

	const classes = [
		'flex flex-col',
		className
	].join(' ');

	const containerClasses = [
		'mx-auto sm:mx-0 max-w-[480px] sm:max-w-full justify-items-center sm:justify-stretch grid grid-cols-1 2xs:grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] grid-rows-[repeat(1,1fr)] gap-5 duration-150 transition-opacity',
		loading ? 'opacity-50 pointer-events-none' : 'opacity-100'
	].join(' ');

	return (
		<div
			className={classes}
			data-testid={testId}
			{...props}
		>
			{!error && (
				<div className={containerClasses}>
					{items.map(({
						id,
						profile_path,
						popularity,
						name,
						known_for,
					}) => (
						<PersonCard
							personId={id}
							key={id}
							src={profile_path ? `${imgPath['profileCard']}${profile_path}` : ''}
							alt={name}
							title={name}
							titleElement='h4'
							titleLevel={6}
							showRating
							appearance='secondary'
							rating={popularity}
							dictionary={dictionary.personCard}
						>
							{known_for.map(credit => credit.title).filter(Boolean).join(', ')}
						</PersonCard>
					))}
				</div>
			)}

			{error && (
				<Banner
					title={dictionary.errorTitle}
					appearance='danger'
					closeButton={false}
				>
					{dictionary.errorText}
				</Banner>
			)}

			{!error && page < initialData.total_pages && (
				<Button
					className='mt-5 text-200 md:text-[1.125rem] max-w-[300px] md:max-w-[25rem] w-full justify-center self-center'
					isLoading={loading}
					onClick={clickHandler}
				>
					{dictionary.loadMoreButton}
				</Button>
			)}
		</div>
	);
};