import { KeyboardEventHandler, MouseEventHandler, ReactElement, useRef, useState } from 'react';
import TabButton from './TabButton/TabButton';
import { Props as TabPanelProps } from './TabPanel/TabPanel';

type Props = {
	children: ReactElement<TabPanelProps>[],
	id: string,
	onSelect: (index: number) => void,
	defaultSelected?: number,
	className?: string,
	testId?: string,
	isDisabled?: boolean,
	fitted?: boolean,
};

export default function Tabs({
	children,
	id,
	onSelect,
	defaultSelected = 0,
	className,
	testId,
	isDisabled,
	fitted,
}: Props) {
	const tabsGroupRef = useRef<HTMLDivElement>(null);
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(defaultSelected);

	const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
		const { index } = e.currentTarget.dataset;
		if (!index) return;
		setSelectedTabIndex(+index);
		onSelect(+index);
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
		'mr-1 last:mr-0 ',
		fitted ? 'grow' : '',
	].join(' ');

	return (
		<div
			className={classes}
			id={id}
			data-testid={testId}
		>
			<div
				role='tablist'
				className='flex p-2 overflow-hidden'
				ref={tabsGroupRef}
			>
				{children.map((child, index) => (
					<TabButton
						className={tabButtonClasses}
						key={child.props.label}
						label={child.props.label}
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
			<div
				className='flex min-h-[5rem] text-neutral-1000 dark:text-dark-neutral-900 p-2 rounded-b-[0.1875rem] border-t-2 border-neutral-300 dark:border-dark-neutral-350'
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
