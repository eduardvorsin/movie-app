import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLocalesFromString } from 'src/helpers/helpers';
import { fallbackLng } from 'src/i18n/settings';

export default function RootPage() {
	const lang = getLocalesFromString(headers().get('accept-language') ?? fallbackLng)[0];
	redirect(`/${lang}`);
}