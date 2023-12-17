export const convertToTime = (num: number): string => {
	if (num <= 0) return '0:00';

	const hours = Math.floor(num / 60);
	const minutes = num % 60 > 10 ? num % 60 : `0${num % 60}`;
	return `${hours}:${minutes}`;
}
