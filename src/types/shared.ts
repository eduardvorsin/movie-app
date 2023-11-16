export type KeyWithoutId<T> = T extends `${infer Name}_id` ? Name : never;
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type CharacteristicItem = {
	name: string,
	value: string,
};
