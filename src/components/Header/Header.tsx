'use client';

import Container from '@/components/Container/Container';
import Logo from '@/components/Logo/Logo';
import { useLayoutEffect, useState } from 'react';
import NavigationMenuButton from '../NavigationMenuButton/NavigationMenuButton';
import Navigation from '../Navigation/Navigation';
import { GeneralProps } from '@/types/shared';
import UserSettingsButton from '../UserSettingsButton/UserSettingsButton';
import MainSearch, { MainSearchDictionary } from '../MainSearch/MainSearch';

export type Props = {
	dictionary: {
		logo: Record<'altText' | 'linkText', string>,
		navigation: Record<'movies' | 'persons' | 'tv' | 'new' | 'collections', string>,
		userSettingsButton: {
			button: string,
			themeTitle: string,
			languageTitle: string,
			languageSelect: Record<'label', string>,
			themeToggle: Record<'label', string>,
		},
		navigationMenuButton: Record<'active' | 'inactive', string>,
		mainSearch: MainSearchDictionary,
	}
} & GeneralProps;

export default function Header({
	className,
	testId,
	dictionary,
	...props
}: Props) {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

	const menuOpenHandler = (): void => setIsMenuOpen((prevState) => !prevState);
	const closeMenu = (): void => setIsMenuOpen(false);

	const showSearchBar = (): void => setIsSearchVisible(true);
	const hideSearchBar = (): void => setIsSearchVisible(false);

	useLayoutEffect(() => {
		if (isMenuOpen) {
			document.documentElement.style.overflow = 'hidden';
		}

		return () => {
			document.documentElement.style.overflow = '';
		}
	}, [isMenuOpen])

	return (
		<header
			className={`pr-[var(--scrollbar-width)] fixed z-500 top-0 left-0 w-full h-[60px] bg-neutral-300 dark:bg-dark-neutral-300 transition-colors duration-150 ${className}`}
			data-testid={testId}
			{...props}
		>
			<Container
				className='flex items-center h-full'
			>
				<Logo
					className={`z-100 ${!isMenuOpen ? 'mr-10' : ''}`}
					onClick={closeMenu}
					size={'medium'}
					dictionary={dictionary.logo}
				/>

				<Navigation
					className='md:mr-10'
					isMenuOpen={isMenuOpen}
					dictionary={dictionary.navigation}
					onClick={closeMenu}
				/>

				<div className='flex flex-grow justify-end'>
					{!isMenuOpen && (
						<MainSearch
							id='header-search'
							isSearchVisible={isSearchVisible}
							onSearchClose={hideSearchBar}
							onSearchOpen={showSearchBar}
							dictionary={dictionary.mainSearch}
						/>
					)}

					{!isMenuOpen && (
						<UserSettingsButton
							dictionary={dictionary.userSettingsButton}
						/>
					)}

					{!isSearchVisible && (
						<NavigationMenuButton
							className='md:hidden'
							onClick={menuOpenHandler}
							isActive={isMenuOpen}
							dictionary={dictionary.navigationMenuButton}
						/>
					)}

				</div>
			</Container>
		</header>
	);
}
