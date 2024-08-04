import { ExternalIDS } from '@/services/types';
import { AriaAttributes, CSSProperties } from 'react';

export type GeneralProps = {
	className?: string,
	testId?: string,
	style?: CSSProperties,
} & AriaAttributes;

export type KeyWithoutId<T> = T extends `${infer Name}_id` ? Name : never;
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type Department = 'Acting' | 'Production' | 'Crew' | 'Writing' | 'Directing' | 'Costume & Make-Up' | 'Visual Effects' | 'Editing' | 'Art' | 'Lighting' | 'Camera' | 'Creator' | 'Sound' | 'Actors';

type CommonGenres = 'animation' | 'comedy' | 'crime' | 'documentary' | 'drama' | 'family' | 'mystery' | 'western';

export type MovieGenres = CommonGenres | 'adventure' | 'romance' | 'history' | 'music' | 'war' | 'thriller' | 'fantasy' | 'horror' | 'tv movie' | 'action' | 'science fiction';

export type TVSeriesGenres = CommonGenres | 'action & adventure' | 'kids' | 'news' | 'reality' | 'sci-fi & fantasy' | 'soap' | 'talk' | 'war & politics';

export type Genres = MovieGenres | TVSeriesGenres;

export type SocialNetworksItem = {
	name: KeyWithoutId<keyof ExternalIDS>,
	url: string,
};

export type PlaceholderData = {
	img: {
		src: string;
		height: number;
		width: number;
	};
	color: {
		r: number;
		g: number;
		b: number;
		hex: string;
	};
	base64: string;
};

export type MediaTypes = 'person' | 'tv' | 'movie';