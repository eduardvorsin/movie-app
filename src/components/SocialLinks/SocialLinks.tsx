import { SocialNetworksItem } from '@/types/shared';
import Link from '@/components/Link/Link';

const socialNetworkIcons = {
	imdb: '/assets/icons/imdb.svg#imdb',
	twitter: '/assets/icons/twitter.svg#twitter',
	youtube: '/assets/icons/youtube.svg#youtube',
	tiktok: '/assets/icons/tiktok.svg#tiktok',
	facebook: '/assets/icons/facebook.svg#facebook',
	instagram: '/assets/icons/instagram.svg#instagram',
} as const;

type Props = {
	className?: string,
	testId?: string,
	data: SocialNetworksItem[],
};

export default function SocialLinks({
	className,
	testId,
	data,
}: Props) {
	return (
		<div className='flex items-center flex-wrap -ml-[0.375rem]'>
			{data.map((item) => (
				<div
					className={`px-[0.375rem] py-[0.375rem] ${className}`}
					key={item.name}
					data-testid={testId}
				>
					<Link
						className='text-0 flex w-10 h-10 fill-neutral-300 text-dark-neutral-300 hover:fill-neutral-400 hover:text-dark-neutral-250 active:fill-dark-neutral-500 active:text-dark-neutral-200 dark:fill-dark-neutral-400 dark:text-neutral-300 dark:hover:fill-dark-neutral-500 dark:hover:text-neutral-200 dark:active:fill-dark-neutral-600 dark:active:text-neutral-100 transition-colors duration-150'
						href={item.url}
						isExternal
						target='_blank'
					>
						<svg viewBox='0 0 32 32'>
							<use href={socialNetworkIcons[item.name]}></use>
						</svg>
						{`${item.name[0].toUpperCase()}${item.name.slice(1)}`}
					</Link>
				</div>
			))}
		</div>
	);
}