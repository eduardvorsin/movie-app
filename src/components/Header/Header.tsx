'use client';

import Container from '@/components/Container/Container';
import Logo from '@/components/Logo/Logo';
import Button from '../Button/Button';
import { useLayoutEffect, useState } from 'react';
import NavigationMenuButton from '../NavigationMenuButton/NavigationMenuButton';
import Navigation from '../Navigation/Navigation';
import { Locales, fallbackLng } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';
import { useParams } from 'next/navigation';
import { GeneralProps } from '@/types/shared';

type Props = GeneralProps;

export default function Header({
	className,
	testId,
	...props
}: Props) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);
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
			className={`fixed z-500 top-0 left-0 w-full h-[60px] bg-neutral-300 dark:bg-dark-neutral-300 ${className}`}
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
				/>

				<Navigation
					className={`transition-transform duration-300 md:translate-x-0 ${isMenuOpen ? '' : '-translate-x-full'}`}
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
							{t('searchButton')}
						</Button>
					)}

					{!isMenuOpen && (
						<Button
							appearance='secondary'
							iconButton
						>
							<svg
								className='p-2 w-[2.25rem] h-[2.25rem]'
								viewBox='0 0 32 32'
							>
								<use href={'/assets/icons/account.svg#account'} />
							</svg>
							{t('accountButton')}
						</Button>
					)}

					<NavigationMenuButton
						className='md:hidden'
						onClick={menuOpenHandler}
						isActive={isMenuOpen}
					/>
				</div>
			</Container>
		</header>
	);
}
