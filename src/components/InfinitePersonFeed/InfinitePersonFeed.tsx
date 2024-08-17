'use client';

import { useReducer, useState } from 'react';
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

type State = {
	status: 'idle' | 'loading' | 'error' | 'successful',
	error: string,
	items: PopularPerson[]
};

type Action = {
	type: 'set_loading'
} | {
	type: 'set_error',
	payload: string
} | {
	type: 'set_data',
	payload: PopularPerson[],
};

const createInitialState = (initialData: PopularPerson[] | null): State => {
	return {
		status: 'idle' as const,
		error: '',
		items: initialData ?? [],
	};
}

type Reducer = (state: State, action: Action) => State;

const reducer: Reducer = (state, action) => {
	if (action.type === 'set_loading') {
		return {
			status: 'loading' as const,
			error: '',
			items: state.items,
		};
	} else if (action.type === 'set_error') {
		return {
			status: 'error' as const,
			error: action.payload,
			items: [],
		};
	} else if (action.type === 'set_data') {
		return {
			status: 'successful' as const,
			error: '',
			items: [...state.items, ...action.payload],
		};
	}
	return state;
};

export default function InfinitePersonFeed({
	className,
	initialData,
	testId,
	dictionary,
	...props
}: Props) {

	const [state, dispatch] = useReducer<Reducer, PopularPerson[]>(
		reducer,
		initialData.results,
		createInitialState
	);
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const [page, setPage] = useState<number>(1);

	const loadMore = async (page: number) => {
		dispatch({ type: 'set_loading' });

		const res = await fetch(`/api/popularPersons?page=${page}&lang=${lang}`);
		const data = (await res.json()) as ListsResponse<PopularPerson> | null;
		if (data?.results) {
			dispatch({ type: 'set_data', payload: data.results });
		} else {
			dispatch({ type: 'set_error', payload: dictionary.errorText });
		}
	}

	const clickHandler = () => {
		loadMore(page + 1);
		setPage((prevPage) => prevPage + 1);
	};

	const classes = [
		'flex flex-col',
		className
	].join(' ');

	const containerClasses = [
		'mx-auto sm:mx-0 max-w-[480px] sm:max-w-full justify-items-center sm:justify-stretch grid grid-cols-1 2xs:grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] grid-rows-[repeat(1,1fr)] gap-5 duration-150 transition-opacity',
		state.status === 'loading' ? 'opacity-50 pointer-events-none' : 'opacity-100'
	].join(' ');

	return (
		<div
			className={classes}
			data-testid={testId}
			{...props}
		>
			{state.status !== 'error' && (
				<div className={containerClasses}>
					{state.items.map(({
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
							{known_for.map(({ media_type, name, title }) => {
								const contentName = media_type === 'movie' ? title : name;
								return contentName;
							}).filter(Boolean).join(', ')}
						</PersonCard>
					))}
				</div>
			)}

			{state.status == 'error' && (
				<Banner
					title={dictionary.errorTitle}
					appearance='danger'
					closeButton={false}
				>
					{state.error}
				</Banner>
			)}

			{state.status !== 'error' && page < initialData.total_pages && (
				<Button
					className='mt-5 text-200 md:text-[1.125rem] max-w-[300px] md:max-w-[25rem] w-full justify-center self-center'
					isLoading={state.status === 'loading'}
					onClick={clickHandler}
				>
					{dictionary.loadMoreButton}
				</Button>
			)}
		</div>
	);
};