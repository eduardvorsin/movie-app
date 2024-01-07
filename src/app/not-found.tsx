import { headers } from "next/headers";
import { fallbackLng, Locales } from "@/i18n/settings";
import Button from '@/components/Button/Button';
import Title from '@/components/Title/Title';
import { fetchTranslation } from '@/i18n/server';
import { getLocalesFromString } from "@/i18n/utils/getLocalesFromString/getLocalesFromString";
import { routes } from "src/constants";
import Container from "@/components/Container/Container";

export default async function NotFound() {
	const lang = getLocalesFromString(headers().get('accept-language') ?? fallbackLng)[0] as Locales;
	const { t } = await fetchTranslation(lang);

	return (
		<Container className='mt-[5rem] mb-[1.25rem] h-[calc(100vh-100px)] min-h-[25.625rem] flex items-center justify-center'
		>
			<div className='max-w-[28.25rem] flex flex-col items-center'>
				<svg className='w-[9.375rem] h-[9.375rem] mb-2 sm:mb-4 md:mb-6 lg:mb10 shrink-0 fill-dark-neutral-300 dark:fill-neutral-300 lg:w-[12.5rem] lg:h-[12.5rem]' viewBox='0 0 32 32'>
					<use href={'/assets/icons/404.svg#404'}></use>
				</svg>
				<Title
					className='font-regular text-center text-dark-neutral-300 dark:text-neutral-300 mb-1 md:mb-2'
					level={1}
					as='h1'
				>
					{t('notFound.title')}
				</Title>
				<p className='text-center text-dark-neutral-400 dark:text-neutral-400 mb-4 sm:mb-5 md:mb-6 lg:mb-8'>
					{t('notFound.description')}
				</p>
				<Button
					href={routes.home}
					size='large'
					fullWidth
				>
					{t('notFound.linkText')}
				</Button>
			</div>
		</Container>
	);
}
