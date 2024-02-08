import { cookies, headers } from "next/headers";
import { fallbackLng, Locales } from "@/i18n/settings";
import Button from '@/components/Button/Button';
import Title from '@/components/Title/Title';
import { fetchTranslation } from '@/i18n/server';
import { routes } from "@/constants";
import Container from "@/components/Container/Container";
import { Metadata } from "next";

export async function generateMetadata(
	{ params }: { params: { lang: Locales } },
): Promise<Metadata> {
	const { t } = await fetchTranslation(params.lang, 'notFoundPage');
	return {
		title: t('metaPageName'),
		description: t('metaPageDescription'),
	}
}

export default async function NotFound() {
	const langFromCookie = cookies().get('i18next')?.value;
	const langFromHeaders = headers().get('accept-language')?.slice(0, 2);
	const currentLang = langFromCookie ?? langFromHeaders ?? fallbackLng;
	const { t } = await fetchTranslation(currentLang as Locales, 'notFoundPage');

	return (
		<Container
			component='main'
			className='mt-[5rem] mb-[1.25rem] h-[calc(100%-100px)] min-h-[25.625rem] flex items-center justify-center'
		>
			<div className='max-w-[28.25rem] flex flex-col items-center'>
				<svg className='w-[9.375rem] h-[9.375rem] mb-2 sm:mb-4 md:mb-6 lg:mb10 shrink-0 fill-dark-neutral-300 dark:fill-neutral-300 lg:w-[12.5rem] lg:h-[12.5rem] transition-colors duration-150' viewBox='0 0 32 32'>
					<use href={'/assets/icons/404.svg#404'}></use>
				</svg>
				<Title
					className='font-regular text-center text-dark-neutral-300 dark:text-neutral-300 mb-1 md:mb-2'
					level={1}
					as='h1'
				>
					{t('mainTitle')}
				</Title>
				<p className='text-center text-dark-neutral-400 dark:text-neutral-400 mb-4 sm:mb-5 md:mb-6 lg:mb-8 transition-colors duration-150'>
					{t('description')}
				</p>
				<Button
					className='w-full justify-center'
					href={routes.home}
					size='large'
				>
					{t('linkText')}
				</Button>
			</div>
		</Container>
	);
}
