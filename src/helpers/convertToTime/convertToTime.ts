export const convertToTime = (num: number): string => {
	if (num <= 0) return '0:00';

	return `${Math.floor(num / 60)}:${num % 60}`;
}
