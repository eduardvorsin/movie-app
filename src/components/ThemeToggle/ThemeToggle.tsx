'use client';
import { ThemeContext } from '@/context/ThemeProvider/ThemeProvider';
import { ChangeEventHandler, useContext, useState } from 'react';
import Toggle from '@/components/Toggle/Toggle';
import MoonIcon from '../../assets/icons/moon.svg';
import SunIcon from '../../assets/icons/sun.svg';
import { GeneralProps } from '@/types/shared';
import dynamic from 'next/dynamic';
import { SkeletonImage } from '../Skeleton/Skeleton';

export type Props = {
	dictionary: Record<'label', string>,
} & GeneralProps;

const ThemeToggle = ({
	className,
	testId,
	dictionary,
	...props
}: Props) => {
	const theme = useContext(ThemeContext);
	const [isChecked, setIsChecked] = useState<boolean>(theme.value === 'dark');

	const changeThemeHandler: ChangeEventHandler<HTMLInputElement> = () => {
		setIsChecked(!isChecked);
		theme.toggleTheme();
	};

	return (
		<Toggle
			className={className}
			name='theme-toggle'
			id='theme-toggle'
			appearance='secondary'
			labelHidden
			label={dictionary.label}
			value={theme.value}
			isChecked={isChecked}
			onChange={changeThemeHandler}
			checkedIcon={<MoonIcon />}
			uncheckedIcon={<SunIcon />}
			testId={testId}
			{...props}
		/>
	);
};

export default dynamic(() => Promise.resolve(ThemeToggle), {
	ssr: false,
	loading: () => <SkeletonImage className='w-[60px] h-[30px]' />
});