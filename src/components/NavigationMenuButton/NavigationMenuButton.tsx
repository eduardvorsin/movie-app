'use client';

import { MouseEventHandler } from 'react';
import Button from '@/components/Button/Button';
import { GeneralProps } from '@/types/shared';

export type Props = {
	isActive: boolean,
	onClick: MouseEventHandler<HTMLButtonElement>,
	dictionary: Record<'active' | 'inactive', string>,
} & GeneralProps;

export default function NavigationMenuButton({
	isActive,
	onClick,
	className,
	testId,
	dictionary,
	...props
}: Props) {
	const topLineClasses = `origin-center transition-transform duration-150 ${isActive ? 'translate-y-[5.5px] translate-x-[5.8px] -rotate-45 scale-90' : ' translate-x-0 translate-y-0 rotate-0 scale-100'}`;

	const middleLineClasses = `origin-center transition-opacity duration-150 ${isActive ? 'opacity-0' : ' opacity-100'}`;

	const bottomLineClasses = `origin-center transition-transform duration-150 ${isActive ? '-translate-y-[5.5px] translate-x-[5.8px] rotate-45 scale-90' : ' translate-x-0 translate-y-0 rotate-0 scale-100'}`;

	return (
		<Button
			className={`relative z-100 ${className}`}
			appearance='secondary'
			iconButton
			onClick={onClick}
			testId={testId}
			{...props}
		>
			<svg
				className='p-2 w-[2.25rem] h-[2.25rem]'
				viewBox="0 0 32 32"
				fill="none"
			>
				<path
					className={topLineClasses}
					d="M2 7H30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
				/>
				<path
					className={middleLineClasses}
					d="M2 15.6667H30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
				/>
				<path
					className={bottomLineClasses}
					d="M2 24.3333H30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
			</svg>

			{dictionary[isActive ? 'active' : 'inactive']}
		</Button>
	);
}