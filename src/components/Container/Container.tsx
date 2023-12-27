import { GeneralProps } from '@/types/shared';
import { ElementType, ReactNode } from 'react';

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
	const classes = [
		'max-w-[77rem] mx-auto px-4',
		className,
	].join(' ');

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