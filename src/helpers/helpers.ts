export type CharacteristicItem = {
	name: string,
	value: string,
};

export const createPersonCharacteristicsArray = (data:
	{ [key: string]: string | string[] | number | null | boolean | object }
): CharacteristicItem[] => {
	type PersonData = {
		known_for_department: string,
		place_of_birth: string,
		gender: number,
		birthday: string,
		deathday: string | null,
		popularity: number,
	};

	const characteristicFields = new Set<keyof PersonData>([
		'known_for_department',
		'place_of_birth',
		'gender',
		'birthday',
		'deathday',
		'popularity',
	]);

	const characteristics = [] as CharacteristicItem[];

	(Object.keys(data) as Array<keyof PersonData>).forEach((key) => {
		if (!characteristicFields.has(key) || data[key] === null || typeof data[key] === 'object') {
			return;
		}

		characteristics.push({
			name: key,
			value: String(data[key]),
		});
	});

	return characteristics;
}
