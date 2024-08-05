'use client';

import { GeneralProps } from '@/types/shared';
import Button from '../Button/Button';
import { MouseEventHandler, useId, useState } from 'react';
import Popup from '../Popup/Popup';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Title from '../Title/Title';
import LanguageSelect from '../LanguageSelect/LanguageSelect';

export type Props = {
	dictionary: {
		button: string,
		themeTitle: string,
		languageTitle: string,
		languageSelect: Record<'label', string>,
		themeToggle: Record<'label', string>,
	},
} & GeneralProps;

export default function UserSettingsButton({
	className,
	testId,
	dictionary,
}: Props) {
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
			testId={testId}
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
				>
					<svg className='p-2 w-[2.25rem] h-[2.25rem] fill-current' viewBox='0 0 32 32'>
						<use href={'/assets/icons/settings.svg#settings'}></use>
					</svg>
					{dictionary.button}
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
					{dictionary.themeTitle}
				</Title>
				<ThemeToggle dictionary={dictionary.themeToggle} />
			</section>

			<section>
				<Title
					className='mb-2'
					weight={500}
					as='h2'
					level={6}
				>
					{dictionary.languageTitle}
				</Title>
				<LanguageSelect dictionary={dictionary.languageSelect} />
			</section>
		</Popup>
	);
};