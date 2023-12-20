'use client';

import { KeyboardEventHandler, MouseEventHandler, ReactElement, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import TabButton from './TabButton/TabButton';
import { throttle } from '@/helpers/throttle/throttle';
import { GeneralProps } from '@/types/shared';

type TabPanelElement =
	{
		children: ReactNode
		label?: string,
		'data-label'?: string,
	} & (
		{ label: string, 'data-label'?: undefined } |
		{ 'data-label': string, label?: undefined }
	);

type Props = {
	children: ReactElement<TabPanelElement>[],
	id: string,
	onSelect?: (index: number) => void,
	defaultSelected?: number,
	isDisabled?: boolean,
	fitted?: boolean,
} & GeneralProps;

export default function Tabs({
	children,
	id,
	onSelect,
	defaultSelected = 0,
	className,
	testId,
	isDisabled,
	fitted,
	...props
}: Props) {
	const tabsGroupRef = useRef<HTMLDivElement>(null);
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(defaultSelected);
	const [isScrollable, setIsScrollable] = useState<boolean>(false);

	const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
		const { index } = e.currentTarget.dataset;
		if (!index) return;
		setSelectedTabIndex(+index);
		if (onSelect) onSelect(+index);
	}

	const keyDownHandler: KeyboardEventHandler<HTMLButtonElement> = (e) => {
		const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
		const { nextElementSibling, previousElementSibling } = e.currentTarget;
		if (!keys.includes(e.code)) return;

		let nextIndex = -1;
		if (e.code === 'ArrowLeft') {
			nextIndex = previousElementSibling ? selectedTabIndex - 1 : children.length - 1;
		} else if (e.code === 'ArrowRight') {
			nextIndex = nextElementSibling ? selectedTabIndex + 1 : 0;
		} else if (e.code === 'Home') {
			nextIndex = 0;
		} else if (e.code === 'End') {
			nextIndex = children.length - 1;
		}

		(tabsGroupRef.current?.children[nextIndex] as HTMLButtonElement).focus();
		setSelectedTabIndex(nextIndex);
	}

	const classes = [
		'w-full bg-neutral-100 dark:bg-dark-neutral-200 rounded-[0.1875rem] border-2 border-neutral-300 dark:border-dark-neutral-350',
		className,
	].join(' ');

	const tabButtonClasses = [
		'shrink-0 mr-1 last:mr-0 enabled:snap-start enabled:snap-always enabled:scroll-mx-2 break-all',
		fitted ? 'grow' : 'grow-0',
	].join(' ');

	const wheelHandler = throttle((e: React.WheelEvent<HTMLDivElement>) => {
		const containerNode = tabsGroupRef.current;
		if (!containerNode || isDisabled) return;

		const nextOffset = e.deltaY > 0 ? 100 : -100;
		containerNode.scrollTo({
			left: containerNode.scrollLeft + nextOffset,
			behavior: 'smooth',
		});
	}, 300);

	useLayoutEffect(() => {
		const containerNode = tabsGroupRef.current;
		if (!containerNode) return;
		setIsScrollable(containerNode.scrollWidth > containerNode.clientWidth);
	}, []);

	return (
		<div
			className={classes}
			id={id}
			data-testid={testId}
			{...props}
		>
			<div
				className={`${isScrollable ? 'relative after:w-16 after:h-full after:absolute after:top-0 after:right-0 after:bg-gradient-to-r after:from-transparent after:to-neutral-200 dark:after:to-dark-neutral-100 after:pointer-events-none' : ''}`}
			>
				<div
					role='tablist'
					className={`flex p-2 overflow-x-auto no-scrollbar ${isDisabled ? 'snap-mandatory snap-x' : ''}`}
					ref={tabsGroupRef}
					onWheel={wheelHandler}
				>
					{children.map((child, index) => (
						<TabButton
							className={tabButtonClasses}
							key={child.props['data-label'] ?? child.props.label}
							label={child.props['data-label'] ?? child.props.label}
							id={`${id}-tab-${index}`}
							onClick={clickHandler}
							onKeyDown={keyDownHandler}
							index={index}
							isActive={index === selectedTabIndex}
							ariaControls={`${id}-tabpanel-${index}`}
							isDisabled={isDisabled}
						/>
					))}
				</div>
			</div>

			<div
				className='flex min-h-[4rem] text-neutral-1000 dark:text-dark-neutral-900 rounded-b-[0.1875rem] border-t-2 border-neutral-300 dark:border-dark-neutral-350'
				id={`${id}-tabpanel-${selectedTabIndex}`}
				role='tabpanel'
				aria-labelledby={`${id}-tab-${selectedTabIndex}`}
				tabIndex={0}
			>
				{children[selectedTabIndex]}
			</div>
		</div>
	);
};