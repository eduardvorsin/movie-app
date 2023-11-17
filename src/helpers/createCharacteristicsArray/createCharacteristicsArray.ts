export const createCharacteristicsArray = (data: { [key: string]: unknown },
): Record<'name' | 'value', string>[] => {

	const characteristics = [] as Record<'name' | 'value', string>[];

	Object.keys(data).forEach((key) => {
		if (data[key] === null || typeof data[key] === 'object') {
			return;
		}

		characteristics.push({
			name: key,
			value: String(data[key]),
		});
	});

	return characteristics;
}