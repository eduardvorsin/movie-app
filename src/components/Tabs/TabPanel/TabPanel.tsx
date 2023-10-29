import { ReactNode } from 'react';

export type Props = {
	id: string,
	label: string,
	className?: string,
	testId?: string,
	children: ReactNode,
};

export default function TabPanel({
	id,
	label,
	className,
	testId,
	children,
}: Props) {
	return (
		<div
			id={id}
			className={className}
			data-label={label}
			data-testid={testId}
		>
			{children}
		</div>

	);
}