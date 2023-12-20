import { GeneralProps } from '@/types/shared';
import { ReactNode } from 'react';

export type Props = {
	label: string,
	children: ReactNode,
} & GeneralProps;

export default function TabPanel({
	label,
	className,
	testId,
	children,
	...props
}: Props) {
	return (
		<div
			className={`w-full ${className}`}
			data-label={label}
			data-testid={testId}
			{...props}
		>
			{children}
		</div>

	);
}