export const nameToInitials = (fullName: string) => {
	if (fullName.length === 0) return '';

	const initials = fullName
		.split(' ')
		.slice(0, 2)
		.map((word) => word[0].toUpperCase())
		.join('');

	return initials;
}