import { ElementType, ReactNode } from 'react';

type Props = {
	className?: string,
	testId?: string,
	children: ReactNode,
	component?: ElementType,
	width?: number,
};

export default function Container({
	className,
	testId,
	component,
	width,
	children,
}: Props) {
	const Container = component ?? 'div';
	const classes = [
		'mx-auto px-4',
		className,
	].join(' ');
	return (
		<Container
			className={classes}
			style={{ maxWidth: width ? `${width}px` : '77rem', }}
			data-testid={testId}
		>
			{children}
		</Container>
	);
}