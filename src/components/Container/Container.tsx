import { ElementType, ReactNode } from 'react';
import { twMerge } from 'tailwind.config';

type Props = {
	className?: string,
	testId?: string,
	children: ReactNode,
	component?: ElementType,
};

export default function Container({
	className,
	testId,
	component,
	children,
}: Props) {
	const Container = component ?? 'div';
	const classes = twMerge(
		'max-w-[77rem] mx-auto px-4',
		className,
	);

	return (
		<Container
			className={classes}
			data-testid={testId}
		>
			{children}
		</Container>
	);
}