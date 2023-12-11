export const toCapitalizeCase = (str: string): string => {
	if (str.length === 0) return '';
	return str
		.split(' ')
		.map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
		.join(' ');
};
