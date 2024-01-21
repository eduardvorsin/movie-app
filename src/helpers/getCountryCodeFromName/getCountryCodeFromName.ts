const countryCodes = {
	australia: 'AU',
	argentina: 'AR',
	armenia: 'AM',
	belarus: 'BY',
	belgium: 'BE',
	brazil: 'BR',
	uk: 'GB',
	hungary: 'HU',
	germany: 'DE',
	denmark: 'DK',
	india: 'IN',
	ireland: 'IE',
	spain: 'ES',
	italy: 'IT',
	kazakhstan: 'KZ',
	canada: 'CA',
	china: 'CN',
	colombia: 'CO',
	mexico: 'MX',
	latvia: 'LV',
	netherlands: 'NL',
	'new zealand': 'NZ',
	norway: 'NO',
	poland: 'PL',
	russia: 'RU',
	usa: 'US',
	thailand: 'TH',
	turkey: 'TR',
	ukraine: 'UA',
	finland: 'FI',
	france: 'FR',
	switzerland: 'CH',
	sweden: 'SE',
	'south africa': 'ZA',
	'south korea': 'KR',
	japan: 'JP'
} as const;

export type Countries = keyof typeof countryCodes;
export type CountryCodes = (typeof countryCodes)[Countries];

export const getCountryCodeFromName = (country: string): CountryCodes => {
	return countryCodes[country as Countries] ?? '';
}