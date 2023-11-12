export type KeyWithoutId<T> = T extends `${infer Name}_id` ? Name : never;
