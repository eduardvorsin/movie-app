import { GeneralProps } from "@/types/shared";

type Props = {
	data: Record<'name' | 'value', string>[],
} & GeneralProps;

export default function CharacteristicList({
	className,
	data,
	testId,
	...props
}: Props) {
	const characteristicListClasses = [
		className,
	].join(' ');

	return (
		<ul
			className={characteristicListClasses}
			data-testid={testId}
			{...props}
		>
			{data.map((characteristic) => (
				<li
					key={characteristic.name}
					className='text-100 flex break-all py-1 xs:py-2'
				>
					<span
						className='text-neutral-700 dark:text-dark-neutral-700 basis-[8rem] xs:basis-[11rem] shrink-0 grow-0 mr-2 transition-colors duration-150'
					>
						{characteristic.name}:
					</span>
					<span
						className='text-neutral-1000 dark:text-dark-neutral-900 flex-grow transition-colors duration-150'
					>
						{characteristic.value}
					</span>
				</li>
			))}
		</ul>
	);
};