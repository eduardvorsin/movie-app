import Button from '@/components/Button/Button';
import NotFoundIcon from '../assets/icons/404.svg?url';
import Title from '@/components/Title/Title';

export default function NotFound() {
	return (
		<div className='max-w-[77rem] h-[100vh] min-h-[25.75rem] mx-auto my-0 py-0 px-4 flex items-center justify-center'
		>
			<div className='max-w-[28.25rem] flex flex-col items-center'>
				<svg className='w-[9.375rem] h-[9.375rem] mb-2 sm:mb-4 md:mb-6 lg:mb10 shrink-0 fill-dark-neutral-300 dark:fill-neutral-300 lg:w-[12.5rem] lg:h-[12.5rem]' viewBox='0 0 32 32'>
					<use href={`${NotFoundIcon.src}#404`}></use>
				</svg>
				<Title
					className='font-regular text-center text-dark-neutral-300 dark:text-neutral-300 mb-1 md:mb-2'
					level={1}
					as='h1'
				>
					Страница не найдена
				</Title>
				<p className='text-center text-dark-neutral-400 dark:text-neutral-400 mb-4 sm:mb-5 md:mb-6 lg:mb-8'>Попробуйте вернуться сюда позднее</p>
				<Button
					href='/'
					size='large'
					fullWidth
				>
					Перейти на главную
				</Button>
			</div>
		</div>
	);
}

//todo подумать нужно ли добавить что нибудь для адаптива