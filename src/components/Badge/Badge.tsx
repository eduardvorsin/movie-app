import { GeneralProps } from "@/types/shared";
import { ReactNode } from "react";

export type Props = {
	appearance?: 'default' | 'info' | 'success' | 'warning' | 'danger',
	children: ReactNode,
} & GeneralProps;

const appearanceTypes = {
	default: 'bg-neutral-300',
	info: 'bg-blue-200',
	success: 'bg-green-200',
	warning: 'bg-yellow-200',
	danger: 'bg-red-200',
} as const;

export default function Badge({
	className,
	children,
	testId,
	appearance = 'default',
	...props
}: Props) {
	const classes = [
		'inline-flex rounded-5 text-75 text-center leading-1 py-0.5 px-2',
		appearanceTypes[appearance],
		className,
	].join(' ');
	return (
		<span
			className={classes}
			data-testid={testId}
			{...props}
		>
			{children}
		</span>
	);
}