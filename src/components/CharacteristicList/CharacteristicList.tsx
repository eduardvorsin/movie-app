import { CharacteristicItem } from 'src/helpers/helpers';

type Props = {
	className?: string,
	data: CharacteristicItem[],
	testId?: string,
};

export default function CharacteristicList({
	className,
	data,
}: Props) {
	const characteristicListClasses = [
		className,
	].join(' ');

	return (
		<ul
			className={characteristicListClasses}
		>
			{data.map((characteristic) => (
				<li
					key={characteristic.name}
					className='text-100 flex py-2 break-all'
				>
					<span
						className='text-neutral-700 dark:text-dark-neutral-700 basis-[8rem] xs:basis-[10rem] shrink-0 grow-0 mr-2'
					>
						{characteristic.name}:
					</span>
					<span
						className='text-neutral-1000 dark:text-dark-neutral-900 flex-grow'
					>
						{characteristic.value}
					</span>
				</li>
			))}
		</ul>
	);
};