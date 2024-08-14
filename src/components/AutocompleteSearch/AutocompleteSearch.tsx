'use client';

import Search, { Props as SearchProps } from '@/components/Search/Search';
import Link from "@/components/Link/Link";
import Spinner from '@/components/Spinner/Spinner';
import Title from '@/components/Title/Title';
import { ChangeEventHandler, FocusEventHandler, useState } from 'react';
import { MediaTypes } from '@/types/shared';

const iconAssets = {
	person: '/assets/icons/user.svg#user',
	tv: '/assets/icons/series.svg#series',
	movie: '/assets/icons/animation.svg#animation',
} as const;

export type AutocompleteOption = {
	href: string,
	label: string,
	iconType?: MediaTypes
}

export type Props = {
	isLoading?: boolean,
	onOptionLinkClick?: () => void,
	options: AutocompleteOption[],
	initialOptions?: AutocompleteOption[],
	dictionary: {
		emptyStateTitle: string,
		emptyStateText: string,
		search: Record<'button' | 'clearButton', string>,
	},
} & Omit<SearchProps, 'dictionary' | 'clearButton'>;

export default function AutocompleteSearch({
	id,
	className,
	testId,
	isDisabled,
	isReadOnly,
	isInvalid,
	isLoading,
	placeholder,
	options,
	initialOptions = [],
	label,
	labelHidden,
	error,
	name,
	value,
	onChange,
	onFocus,
	onBlur,
	onSubmit,
	onClear,
	onOptionLinkClick,
	dictionary,
}: Props) {
	const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
	const currentOptions = value.length === 0 ? initialOptions : options;

	const blurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
		setTimeout(() => setIsDropdownVisible(false), 100);
		if (onBlur) onBlur(e);
	};

	const focusHandler: FocusEventHandler<HTMLInputElement> = (e) => {
		if (initialOptions.length > 0 || value !== '') {
			setIsDropdownVisible(true);
		}

		if (onFocus) onFocus(e);
	};

	const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (!isDropdownVisible && e.target.value !== '') {
			setIsDropdownVisible(true);
		}
		onChange(e);
	};

	const autocompleteClasses = [
		'mt-2 rounded-[0.1875rem] border-2 shadow-sm absolute w-full bg-neutral-0 dark:bg-dark-neutral-200 border-neutral-300 dark:border-dark-neutral-350 transition-colors duration-150',
		isLoading ? 'min-h-[12.5rem]' : '',
	].join(' ');

	return (
		<div
			className={`relative ${className}`}
			data-testid={testId}
		>
			<Search
				id={id}
				name={name}
				isDisabled={isDisabled}
				isReadOnly={isReadOnly}
				isInvalid={isInvalid}
				placeholder={placeholder}
				label={label}
				labelHidden={labelHidden}
				value={value}
				onChange={changeHandler}
				onFocus={focusHandler}
				onBlur={blurHandler}
				onSubmit={onSubmit}
				onClear={onClear}
				clearButton={true}
				error={error}
				dictionary={dictionary.search}
			/>

			{isDropdownVisible && (
				<div
					className={autocompleteClasses}
				>
					{!isLoading && currentOptions.length === 0 && (
						<div
							className='p-[0.625rem] flex items-center justify-center flex-col text-neutral-1000 dark:text-dark-neutral-800 transition-colors duration-150'
						>
							<svg
								className='w-[5rem] h-[5rem] mb-5 fill-current'
								viewBox='0 0 32 32'
							>
								<use href={'/assets/icons/broken-loupe.svg#broken-loupe'}></use>
							</svg>

							<Title
								className='mb-3 break-all text-neutral-1000 dark:text-dark-neutral-800'
								level={5}
								as='h4'
								weight={400}
							>
								{dictionary.emptyStateTitle}
							</Title>

							<p className='text-neutral-900 dark:text-dark-neutral-700 transition-colors duration-150'>
								{dictionary.emptyStateText}
							</p>
						</div>
					)}

					{!isLoading && currentOptions.length !== 0 && (
						<ul>
							{currentOptions.map(({ label, iconType, href }) => (
								<li
									key={label}
									className='flex items-center px-1 border-b-2 last:border-none border-neutral-300 dark:border-dark-neutral-350 transition-colors duration-150'
								>
									{iconType && (
										<svg className='w-4 h-4 mr-2' viewBox='0 0 32 32'>
											<use href={iconAssets[iconType]}></use>
										</svg>
									)}

									<Link
										className='w-full h-full block px-[0.625rem] py-[0.375rem] [&]:bg-neutral-0 hover:[&]:bg-neutral-100 active:[&]:bg-neutral-200 dark:[&]:bg-dark-neutral-200 dark:hover:[&]:bg-dark-neutral-250 dark:active:[&]:bg-dark-neutral-300'
										href={href}
										onClick={onOptionLinkClick}
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					)}

					{isLoading && (
						<Spinner
							className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
							size='xlarge'
							testId={process.env.NODE_ENV === 'test' ? 'test-spinner' : undefined}
						/>
					)}
				</div>
			)}
		</div>
	);
}