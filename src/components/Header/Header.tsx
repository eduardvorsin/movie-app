'use client';

import Container from '@/components/Container/Container';
import Logo from '@/components/Logo/Logo';
import Button from '../Button/Button';
import { useLayoutEffect, useState } from 'react';
import NavigationMenuButton from '../NavigationMenuButton/NavigationMenuButton';
import Navigation from '../Navigation/Navigation';
import { GeneralProps } from '@/types/shared';
import UserSettingsButton from '../UserSettingsButton/UserSettingsButton';

type Props = {
	dictionary: {
		searchButton: string,
		logo: Record<'altText' | 'linkText', string>,
		navigation: Record<'movies' | 'persons' | 'tv' | 'new' | 'collections', string>,
		userSettingsButton: {
			button: string,
			themeTitle: string,
			languageTitle: string,
			languageSelect: { label: string },
			themeToggle: { label: string },
		},
		navigationMenuButton: {
			active: string,
			inactive: string,
		},
	}
} & GeneralProps;

export default function Header({
	className,
	testId,
	dictionary,
	...props
}: Props) {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const menuOpenHandler = (): void => {
		setIsMenuOpen((prevState) => !prevState);
	};

	const closeMenu = (): void => {
		setIsMenuOpen(false);
	}

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
					className={`transition-transform duration-300 md:translate-x-0 ${isMenuOpen ? '' : '-translate-x-full'}`}
					dictionary={dictionary.navigation}
					onClick={closeMenu}
				/>

				<div className='flex ml-auto'>
					{!isMenuOpen && (
						<Button
							className='mr-1'
							appearance='secondary'
							iconButton
						>
							<svg
								className='p-2 w-[2.25rem] h-[2.25rem]'
								viewBox='0 0 32 32'
							>
								<use href={'/assets/icons/search.svg#search'} />
							</svg>
							{dictionary.searchButton}
						</Button>
					)}

					{!isMenuOpen && (
						<UserSettingsButton
							dictionary={dictionary.userSettingsButton}
						/>
					)}

					<NavigationMenuButton
						className='md:hidden'
						onClick={menuOpenHandler}
						isActive={isMenuOpen}
						dictionary={dictionary.navigationMenuButton}
					/>
				</div>
			</Container>
		</header>
	);
}
