// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(callback: T, delay: number) => {
	let timer: ReturnType<typeof setTimeout> | null;

	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(this, args);
		}, delay);
	}
};