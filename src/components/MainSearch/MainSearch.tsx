'use client';

import { GeneralProps } from '@/types/shared';
import { ChangeEventHandler, FormEventHandler, useReducer, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { fallbackLng, Locales } from '@/i18n/settings';
import { MultiSearchData, ListsResponse } from '@/services/types';
import Button from '@/components/Button/Button';
import AutocompleteSearch, { AutocompleteOption, Props as AutocompleteSearchProps } from '@/components/AutocompleteSearch/AutocompleteSearch';
import { routes } from '@/constants';

export type MainSearchDictionary = {
	label: string,
	placeholder: string,
	openSearch: string,
	closeSearch: string,
	autocompleteSearch: AutocompleteSearchProps['dictionary'],
};

type Props = {
	id: string,
	onSearchClose: () => void,
	onSearchOpen: () => void,
	isSearchVisible: boolean,
	dictionary: MainSearchDictionary
} & GeneralProps;


type State = {
	status: 'loading' | 'successful' | 'error' | 'idle',
	items: AutocompleteOption[],
	error: string,
};

type Action = {
	type: 'set_loading'
} | {
	type: 'set_error',
	payload: string
} | {
	type: 'set_data',
	payload: AutocompleteOption[],
};

const createInitialState = (): State => {
	return {
		status: 'idle' as const,
		items: [],
		error: '',
	};
}

type Reducer = (state: State, action: Action) => State;

const reducer: Reducer = (state, action) => {
	if (action.type === 'set_loading') {
		return {
			status: 'loading' as const,
			error: '',
			items: [],
		};
	} else if (action.type === 'set_error') {
		return {
			status: 'error' as const,
			error: action.payload,
			items: [],
		}
	} else if (action.type === 'set_data') {
		return {
			status: 'successful' as const,
			error: '',
			items: action.payload,
		}
	}
	return state;
}

const transformToSearchResults = (data: MultiSearchData[]): AutocompleteOption[] => {
	if (!data) return [];

	const baseRoutes = {
		person: routes.persons,
		tv: routes.tv,
		movie: routes.movies,
	} as const;

	return data.slice(10).map((value) => {
		const { id, media_type } = value;

		return ({
			href: `${baseRoutes[media_type]}${id}`,
			label: value.media_type === 'movie' ? value.title : value.name,
			iconType: media_type,
		})
	});
};

export default function MainSearch({
	id,
	className,
	testId,
	isSearchVisible,
	onSearchClose,
	onSearchOpen,
	dictionary,
	...props
}: Props) {
	const [state, dispatch] = useReducer<Reducer, null>(reducer, null, createInitialState);
	const [value, setValue] = useState<string>('');
	const pathname = usePathname();
	const router = useRouter();

	const search = async (query: string, page: number, options?: {
		language: Locales
	}): Promise<void> => {
		const baseURL = '/api/multiSearchData';
		const searchParams = new URLSearchParams();
		searchParams.append('query', query);
		searchParams.append('page', page.toString());
		searchParams.append('lang', options?.language ?? fallbackLng);

		dispatch({ type: 'set_loading' });

		const res = await fetch(`${baseURL}?${searchParams}`);
		const data = (await res.json()) as ListsResponse<MultiSearchData> | null;

		if (data !== null && data?.results) {
			dispatch({
				type: 'set_data',
				payload: transformToSearchResults(data.results),
			});
		} else {
			dispatch({
				type: 'set_error',
				payload: 'Error receiving data from the server',
			});
		}
	};

	const clearSearchResults = (): void => setValue('');

	const onSearchChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
		setValue(e.target.value);
		search(e.target.value, 1, { language: fallbackLng });
	};

	const onSearchSubmit: FormEventHandler<HTMLFormElement> = (e): void => {
		e.preventDefault();
		router.push(`${pathname.slice(0, 3)}/search?query=${value}`);
	};

	const classes = [
		className,
		'flex items-center justify-end flex-grow ',
		isSearchVisible ? 'h-full w-full lg:w-auto top-0 left-0 absolute px-4 py-3 lg:static lg:p-0 bg-neutral-100 dark:bg-dark-neutral-100 lg:bg-transparent lg:dark:bg-transparent' : '',

	].join(' ');

	return (
		<search
			role='search'
			className={classes}
			data-testid={testId}
			{...props}
		>
			{isSearchVisible ? (
				<AutocompleteSearch
					className='z-100 w-full'
					id={id}
					options={state.items}
					name='main-search'
					label={dictionary.label}
					value={value}
					placeholder={dictionary.placeholder}
					labelHidden
					isLoading={state.status === 'loading'}
					onChange={onSearchChange}
					onSubmit={onSearchSubmit}
					onClear={onSearchClose}
					onOptionLinkClick={clearSearchResults}
					dictionary={dictionary.autocompleteSearch}
				/>
			) : (
				<Button
					className='mr-1'
					appearance='secondary'
					iconButton
					onClick={onSearchOpen}
				>
					<svg
						className='p-2 w-[2.25rem] h-[2.25rem]'
						viewBox='0 0 32 32'
					>
						<use href={'/assets/icons/search.svg#search'} />
					</svg>
					{dictionary.openSearch}
				</Button>
			)}
		</search>
	);
}