import React, { ReactNode } from 'react';
import i18next from '@/i18n/client';
import { I18nextProvider } from 'react-i18next';

type Props = {
	children: ReactNode,
}

const I18nextWrapper = ({
	children,
}: Props) => {
	return (
		<I18nextProvider i18n={i18next}>
			{children}
		</I18nextProvider>
	);
};

export default I18nextWrapper;