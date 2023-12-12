import { useLayoutEffect, useState } from 'react';

export const useScreenWidth = (): number => {
	const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);

	useLayoutEffect(() => {
		const resizeHandler = () => {
			setScreenWidth(window.screen.width);
		}

		window.addEventListener('resize', resizeHandler);
		return () => {
			window.removeEventListener('resize', resizeHandler);
		}
	}, []);

	return screenWidth;
};