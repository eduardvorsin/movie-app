type SpacingData = { [key: string]: string };
type Spacing = {
	name: string,
	valueInPixels: string,
	valueInRems: string,
};

const createSpacingArray = (spacingData: SpacingData): Spacing[] => {
	return Object.keys(spacingData).map((key) => ({
		name: `theme.spacing.${key}`,
		valueInPixels: `${parseFloat(spacingData[key]) * 16}px`,
		valueInRems: spacingData[key],
	})).sort((a, b) => parseFloat(a.valueInRems) - parseFloat(b.valueInRems));
};

type Props = {
	className?: string,
	isVertical?: boolean,
	data: SpacingData,
};

export default function SpacingList({
	className,
	data,
	isVertical = false,
}: Props) {
	const spacingArray = createSpacingArray(data);

	return (
		<ul
			className={`${className} !pl-0 !mt-4`}
		>
			{spacingArray.map((spacing) => (
				<li
					key={spacing.name}
					className='!mt-0 !mb-3 !last:mb-0 grid gap-3 grid-cols-3 items-center'
				>
					<span
					>
						{spacing.name}
					</span>
					<span>
						{spacing.valueInRems} / {spacing.valueInPixels}
					</span>
					<div
						className={'bg-green-500'}
						style={{
							width: isVertical ? '12rem' : spacing.valueInRems,
							height: isVertical ? spacing.valueInRems : '2rem',
						}}
					/>
				</li>
			))}
		</ul>
	);
};
