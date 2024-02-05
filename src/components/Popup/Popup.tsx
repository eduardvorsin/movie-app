'use client';

import { GeneralProps } from '@/types/shared';
import { CSSProperties, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';

export type Props = {
	children?: ReactNode,
	placement?: 'left-start' | 'left' | 'left-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-start' | 'bottom' | 'bottom-end',
	trigger: ReactElement,
	lockScroll?: boolean,
	id: string,
	isOpen: boolean,
	offsetX?: number,
	offsetY?: number,
} & GeneralProps;

const placementVariants = {
	'left-start': '-left-[var(--offset-x)] -translate-x-full top-0 before:-right-5 before:rotate-90 before:top-[var(--triangle-y-offset)]',
	left: '-left-[var(--offset-x)] -translate-x-full top-1/2 -translate-y-1/2 before:-right-5 before:rotate-90 before:top-1/2 before:-translate-y-1/2',
	'left-end': '-left-[var(--offset-x)] -translate-x-full bottom-0 before:-right-5 before:rotate-90 before:bottom-[var(--triangle-y-offset)]',

	'right-start': '-right-[var(--offset-x)] translate-x-full before:-left-5 top-0 before:-rotate-90 before:top-[var(--triangle-y-offset)]',
	right: '-right-[var(--offset-x)] translate-x-full before:-left-5 top-1/2 -translate-y-1/2 before:-rotate-90 before:top-1/2 before:-translate-y-1/2',
	'right-end': '-right-[var(--offset-x)] translate-x-full before:-left-5 bottom-0 before:-rotate-90 before:bottom-[var(--triangle-y-offset)]',

	'top-start': 'bottom-[calc(100%+var(--offset-y))] left-0 before:rotate-180 before:-bottom-5 before:left-[var(--triangle-x-offset)] before:-translate-x-0.5',
	top: 'bottom-[calc(100%+var(--offset-y))] left-1/2 -translate-x-1/2 before:rotate-180 before:-bottom-5 before:left-1/2 before:-translate-x-1/2',
	'top-end': 'bottom-[calc(100%+var(--offset-y))] right-0 before:rotate-180 before:-bottom-5 before:right-[var(--triangle-x-offset)] before:translate-x-0.5',

	'bottom-start': 'top-[calc(100%+var(--offset-y))] left-0 before:left-[var(--triangle-x-offset)] before:-translate-x-0.5 before:-top-5',
	bottom: 'top-[calc(100%+var(--offset-y))] left-1/2 -translate-x-1/2 before:left-1/2 before:-translate-x-1/2 before:-top-5',
	'bottom-end': 'top-[calc(100%+var(--offset-y))] right-0 before:right-[var(--triangle-x-offset)] before:translate-x-0.5 before:-top-5',
} as const;

export default function Popup({
	className,
	id,
	testId,
	children,
	trigger,
	placement = 'bottom',
	isOpen,
	offsetX = 20,
	offsetY = 20,
	lockScroll: captureOverscroll,

}: Props) {
	const [containerSizes, setContainerSizes] = useState<{
		width: number,
		height: number,
	}>({
		width: 0,
		height: 0,
	});
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;
		setContainerSizes({
			width: containerRef.current.clientWidth,
			height: containerRef.current.clientHeight,
		});
	}, []);

	useEffect(() => {
		const { documentElement } = document;
		const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
		if (captureOverscroll && isOpen) {
			documentElement.style.overflow = 'hidden';
			documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
		}

		return () => {
			documentElement.style.overflow = 'visible';
			documentElement.style.setProperty('--scrollbar-width', '0px');
		}
	}, [captureOverscroll, isOpen]);

	const wrapperClasses = [
		'relative',
		className
	].join(' ');

	const popupClasses = [
		'w-[200px] p-3 rounded-1 border-neutral-400 dark:border-dark-neutral-350 bg-neutral-100 dark:bg-dark-neutral-250 border-2 text-neutral-1000 dark:text-dark-neutral-1000 absolute z-300 before:pointer-events-none before:absolute before:w-5 before:h-5 before:[clip-path:polygon(50%_50%,0%_100%,100%_100%)] before:bg-neutral-400 dark:before:bg-dark-neutral-350 transition-colors duration-150',
		placementVariants[placement],
	].join(' ');

	return (
		<div
			id={id}
			ref={containerRef}
			className={wrapperClasses}
			data-testid={testId}
		>
			{trigger}

			{isOpen && (
				<div
					className={popupClasses}
					style={{
						'--triangle-x-offset': `${((containerSizes.width - 20) / 2).toFixed(2)}px`,
						'--triangle-y-offset': `${((containerSizes.height - 20) / 2).toFixed(2)}px`,
						'--offset-x': `${offsetX}px`,
						'--offset-y': `${offsetY}px`,
					} as CSSProperties}
				>
					{children}
				</div>
			)}
		</div>
	);
}