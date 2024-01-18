'use client';

import { GeneralProps } from '@/types/shared';
import Button from '../Button/Button';
import { MouseEventHandler, useId, useState } from 'react';
import Popup from '../Popup/Popup';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Title from '../Title/Title';
import { useParams } from 'next/navigation';
import { Locales, fallbackLng } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';
import LanguageSelect from '../LanguageSelect/LanguageSelect';

export default function UserSettingsButton({
	className,
	testId,
}: GeneralProps) {
	const lang = useParams()?.lang as Locales ?? fallbackLng;
	const { t } = useTranslation(lang);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const id = useId();
	const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
		setIsOpen((prevState) => !prevState);
	};

	return (
		<Popup
			className='w-[2.25rem] h-[2.25rem]'
			id={id}
			isOpen={isOpen}
			placement='bottom-end'
			offsetX={10}
			offsetY={10}
			lockScroll
			trigger={
				<Button
					className={className}
					iconButton
					appearance='secondary'
					onClick={clickHandler}
					aria-haspopup='menu'
					aria-expanded={isOpen}
					aria-controls={id}
					aria-owns={id}
					testId={testId}
				>
					<svg className='p-2 w-[2.25rem] h-[2.25rem] fill-current' viewBox='0 0 32 32'>
						<use href={'/assets/icons/settings.svg#settings'}></use>
					</svg>
					{t('userSettingsButton.button')}
				</Button>
			}
		>
			<section className='mb-5'>
				<Title
					className='mb-2'
					weight={500}
					as='h2'
					level={6}
				>
					{t('userSettingsButton.themeTitle')}
				</Title>
				<ThemeToggle />
			</section>

			<section>
				<Title
					className='mb-2'
					weight={500}
					as='h2'
					level={6}
				>
					{t('userSettingsButton.languageTitle')}
				</Title>
				<LanguageSelect />
			</section>
		</Popup>
	);
};