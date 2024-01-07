'use client';

import Search, { Props as SearchProps } from '@/components/Search/Search';
import Link from "@/components/Link/Link";
import Spinner from '@/components/Spinner/Spinner';
import Title from '@/components/Title/Title';
import { FocusEventHandler, useState } from 'react';

export type AutocompleteOption = {
	href: string,
	label: string,
}

type Props = {
	isLoading?: boolean,
	options: AutocompleteOption[],
	initialOptions: AutocompleteOption[],
} & SearchProps;

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
	initialOptions,
	label,
	labelHidden,
	error,
	name,
	value,
	onChange,
	onFocus,
	onBlur,
	onSubmit,
}: Props) {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const currentOptions = value.length === 0 ? initialOptions : options;

	const blurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
		setIsFocused(false);
		if (onBlur) onBlur(e);
	};

	const focusHandler: FocusEventHandler<HTMLInputElement> = (e) => {
		setIsFocused(true);
		if (onFocus) onFocus(e);
	};

	const autocompleteClasses = [
		'mt-2 rounded-[0.1875rem] border-2 shadow-sm absolute w-full bg-neutral-0 dark:bg-dark-neutral-200 border-neutral-300 dark:border-dark-neutral-350',
		isLoading ? 'relative min-h-[12.5rem]' : '',
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
				onChange={onChange}
				onFocus={focusHandler}
				onBlur={blurHandler}
				onSubmit={onSubmit}
				error={error}
			/>
			{isFocused && (
				<div
					className={autocompleteClasses}
				>
					{!isLoading && currentOptions.length === 0 && (
						<div
							className='p-[0.625rem] flex items-center justify-center flex-col text-neutral-1000 dark:text-dark-neutral-800'
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
								We can&apos;t find anything for {`"${value}"`}
							</Title>

							<p className='text-neutral-900 dark:text-dark-neutral-700'>
								Try a different term or name.
							</p>
						</div>
					)}

					{!isLoading && currentOptions.length !== 0 && (
						<ul>
							{currentOptions.map((option) => (
								<li
									key={option.label}
									className='border-b-2 last:border-none border-neutral-300 dark:border-dark-neutral-350'
								>
									<Link
										className='w-full h-full block px-[0.625rem] py-[0.375rem] [&]:bg-neutral-0 hover:[&]:bg-neutral-100 active:[&]:bg-neutral-200 dark:[&]:bg-dark-neutral-200 dark:hover:[&]:bg-dark-neutral-250 dark:active:[&]:bg-dark-neutral-300'
										href={option.href}
									>
										{option.label}
									</Link>
								</li>
							))}
						</ul>
					)}

					{isLoading && (
						<Spinner
							className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
							size='xlarge'
						/>
					)}
				</div>
			)}

		</div>
	);
}