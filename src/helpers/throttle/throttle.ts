export const throttle = <T extends (...args: unknown[]) => void>(callback: T, delay: number) => {
	let isThrottled = false;
	let savedArgs: Parameters<T> | null = null;
	let savedThis: ThisParameterType<T> | null = null;

	return function wrapper(this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (isThrottled) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			savedThis = this;
			savedArgs = args;
			return;
		}

		callback.apply(this, args);
		isThrottled = true;

		setTimeout(() => {
			isThrottled = false;
			if (savedThis && savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedThis = null;
				savedArgs = null;
			}
		}, delay);
	}
};