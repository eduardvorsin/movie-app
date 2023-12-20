import { GeneralProps } from '@/types/shared';
import { ElementType, ReactNode } from 'react';
import { twMerge } from 'tailwind.config';

type Props = {
	children: ReactNode,
	component?: ElementType,
} & GeneralProps;

export default function Container({
	className,
	testId,
	component,
	children,
	...props
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
			{...props}
		>
			{children}
		</Container>
	);
}