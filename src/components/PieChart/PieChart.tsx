'use client';
import { CSSProperties } from 'react';
import classes from './PieChart.module.css';
import { useTheme } from '@/context/ThemeProvider/ThemeProvider';
import { GeneralProps } from '@/types/shared';

type Props = {
	size: number,
	value: number,
	barColor?: Record<'light' | 'dark', string>,
	trackColor?: Record<'light' | 'dark', string>,
	thickness?: number,
} & GeneralProps;

export default function PieChart({
	size,
	value,
	className,
	barColor,
	trackColor,
	thickness = 5,
	testId,
	...props
}: Props) {
	const theme = useTheme();
	const themeBarColor = theme === 'dark' ? '#85B8FF' : '#0055CC';
	const themeTrackColor = theme === 'dark' ? '#38414A' : '#DCDFE4';

	const styles = {
		'--width': `${size}px`,
		'--height': `${size}px`,
		'--gradient': `conic-gradient(${barColor?.[theme] ?? themeBarColor} ${value}%, #0000 0)`,
		'--track-gradient': `conic-gradient(${trackColor?.[theme] ?? themeTrackColor} 100%, #0000 0)`,
		'--mask': `radial-gradient(farthest-side, #0000 calc(99% - ${thickness}px),#000 calc(100% - ${thickness}px))`,
	} as CSSProperties;

	const chartClasses = [
		className,
		'bg-neutral-0 dark:bg-dark-neutral-200 w-[--width] h-[--height] inline-flex items-center justify-center rounded-[50%] relative font-medium dark:text-dark-neutral-900'
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
