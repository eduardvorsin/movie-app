import { useLayoutEffect, useState } from 'react';

export const useScreenWidth = (): number => {
	const [screenWidth, setScreenWidth] = useState<number>(0);

	useLayoutEffect(() => {
		setScreenWidth(window.screen.width);
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