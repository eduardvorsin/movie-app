import { ReactNode } from 'react';

export type Props = {
	label: string,
	className?: string,
	testId?: string,
	children: ReactNode,
};

export default function TabPanel({
	label,
	className,
	testId,
	children,
}: Props) {
	return (
		<div
			className={`w-full ${className}`}
			data-label={label}
			data-testid={testId}
		>
			{children}
		</div>

	);
}