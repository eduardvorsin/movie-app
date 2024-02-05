'use client';
import { CSSProperties } from 'react';
import classes from './PieChart.module.css';
import { useTheme } from '@/context/ThemeProvider/ThemeProvider';
import { GeneralProps } from '@/types/shared';

const variants = {
	primary: {
		dark: '#85B8FF',
		light: '#0055CC',
	},
	rating: {
		'low': {
			dark: '#FF9C8F',
			light: '#AE2A19',
		},
		'medium': {
			dark: '#F5CD47',
			light: '#946F00',
		},
		'high': {
			dark: '#7EE2B8',
			light: '#216E4E',
		},
	},
}

export type Props = {
	size: number,
	value: number,
	barColor?: Record<'light' | 'dark', string>,
	trackColor?: Record<'light' | 'dark', string>,
	thickness?: number,
	appearance?: 'primary' | 'rating',
} & GeneralProps;

export default function PieChart({
	size,
	value,
	className,
	barColor,
	trackColor,
	thickness = 5,
	testId,
	appearance = 'primary',
	...props
}: Props) {
	const theme = useTheme();
	const themeTrackColor = theme === 'dark' ? '#38414A' : '#DCDFE4';

	let ratingType: keyof typeof variants['rating'];
	if (value >= 0 && value <= 40) {
		ratingType = 'low';
	} else if (value >= 40 && value <= 70) {
		ratingType = 'medium';
	} else {
		ratingType = 'high';
	}

	const themeBarColor = appearance === 'primary' ? variants['primary'][theme] : variants['rating'][ratingType][theme];

	const styles = {
		'--width': `${size}px`,
		'--height': `${size}px`,
		'--gradient': `conic-gradient(${barColor?.[theme] ?? themeBarColor} ${value}%, #0000 0)`,
		'--track-gradient': `conic-gradient(${trackColor?.[theme] ?? themeTrackColor} 100%, #0000 0)`,
		'--mask': `radial-gradient(farthest-side, #0000 calc(99% - ${thickness}px),#000 calc(100% - ${thickness}px))`,
	} as CSSProperties;

	const chartClasses = [
		className,
		'bg-neutral-0 dark:bg-dark-neutral-200 w-[--width] h-[--height] inline-flex items-center justify-center rounded-[50%] relative font-medium dark:text-dark-neutral-900 transition-colors duration-150'
	].join(' ');

	return (
		<div
			style={styles}
			className={chartClasses}
			data-testid={testId}
			{...props}
		>
			<div
				className={`${classes.mask}`}
			>
				<span
					className='flex items-center justify-center overflow-hidden'
					style={{
						'width': `${size - thickness * 2 - 5}px`,
						'height': `${size - thickness * 2 - 5}px`,
					}}
				>
					{value}%
				</span>
			</div>
		</div>
	);
};
