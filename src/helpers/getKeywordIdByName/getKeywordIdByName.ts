const keywords = {
	marvel: '180547',
	dc: '229266',
	biography: '5565',
	books: '818',
	avantgarde: '15216',
	cyberpunk: '12190',
	dystopia: '4565',
	espionage: '5265',
	fairytale: '3205',
	futuristic: '9685',
	idealism: '6987',
	investigation: '5340',
	mockumentary: '11800',
	neonoir: '207268',
	neorealism: '184345',
	postapocalypse: '272793',
	remakes: '9714',
	roadmovie: '167043',
	timetravel: '4379',
	vr: '4563',
	zombie: '12377',
	anime: '210024|287501',
	sports: '280150|6075|159290',
	teen: '193400',
	military: '2504|1956',
	historical: '192772',
	medical: '1279|11612|13005',
	love: '9673',
};
export type Keywords = keyof typeof keywords;


export const getKeywordIdByName = (name: Keywords): string => {
	if (!keywords[name]) return '';
	return keywords[name];
};