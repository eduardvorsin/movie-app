import { MovieDetails } from "@/services/fetchMovie/fetchMovie";
import { MovieResponse, ListsResponse } from "@/services/types";

export const movieDetailsData: MovieDetails = {
	adult: false,
	backdrop_path: '/9l1eZiJHmhr5jIlthMdJN5WYoff.jpg',
	budget: 200000000,
	genres: [
		{ id: '28', name: 'боевик' },
		{ id: '35', name: 'комедия' },
		{ id: '878', name: 'фантастика' }
	],
	homepage: '',
	id: 533535,
	imdb_id: 'tt6263850',
	original_language: 'en',
	original_title: 'Deadpool & Wolverine',
	overview: 'Уэйд Уилсон попадает в организацию «Управление временными изменениями», что вынуждает его вернуться к своему альтер-эго Дэдпулу и изменить историю с помощью Росомахи.',
	poster_path: '/wALEGObmsvzh03C3nw81RxAMf96.jpg',
	production_companies: [
		{
			id: '420',
			logo_path: '/hUzeosd33nzE5MCNsZxCGEKTXaQ.png',
			name: 'Marvel Studios',
			origin_country: 'US'
		},
		{
			id: '104228',
			logo_path: '/hx0C1XcSxGgat8N62GpxoJGTkCk.png',
			name: 'Maximum Effort',
			origin_country: 'US'
		},
	],
	production_countries: [{ iso_3166_1: 'US', name: 'United States of America' }],
	release_date: '2024-07-24',
	revenue: 590629906,
	runtime: 128,
	status: 'Released',
	tagline: '',
	title: 'Дэдпул и Росомаха',
	video: false,
	vote_average: 7.958,
	vote_count: 1201,
	external_ids: {
		imdb_id: 'tt6263850',
		facebook_id: 'DeadpoolMovie',
		instagram_id: 'deadpoolmovie',
		twitter_id: 'deadpoolmovie',
		tiktok_id: '',
		youtube_id: ''
	},
	credits: {
		cast: [
			{
				id: 10859,
				adult: true,
				gender: 2,
				known_for_department: 'Acting',
				name: 'Райан Рейнольдс',
				popularity: 135.301,
				profile_path: '/2Orm6l3z3zukF1q0AgIOUqvwLeB.jpg',
				character: 'Wade Wilson / Deadpool / Nicepool',
				original_name: 'Ryan Reynolds'
			},
			{
				id: 6968,
				known_for_department: 'Acting',
				name: 'Хью Джекман',
				adult: true,
				gender: 2,
				popularity: 108.131,
				profile_path: '/oX6CpXmnXCHLyqsa4NEed1DZAKx.jpg',
				character: 'Logan / Wolverine',
				original_name: 'Hugh Jackman',
			},
		],
		crew: [
			{
				id: 17825,
				known_for_department: 'Directing',
				name: 'Shawn Levy',
				adult: true,
				gender: 2,
				popularity: 42.002,
				profile_path: '/j1CXZgmfvFeD7S3PYtsEk8H3ebB.jpg',
				department: 'Writing',
				job: 'Writer',
				original_name: 'Shawn Levy',
			},
			{
				id: 1017789,
				known_for_department: 'Camera',
				name: 'George Richmond',
				adult: true,
				gender: 2,
				popularity: 4.804,
				profile_path: '/xxDOdxyiwf89xE5OULLoERKW6oG.jpg',
				department: 'Camera',
				job: 'Director of Photography',
				original_name: 'George Richmond',
			}
		]
	},
	similar: {
		page: 1,
		results: [{
			adult: false,
			backdrop_path: null,
			genre_ids: [35, 80],
			id: 1185202,
			original_language: 'en',
			original_title: "High Card's Bluff",
			overview: '',
			popularity: 2.335,
			poster_path: null,
			release_date: '2023-09-29',
			title: "High Card's Bluff",
			video: false,
			vote_average: 0,
			vote_count: 0
		},
		{
			adult: false,
			backdrop_path: '/8n9dYsTbXTykzm2Nuy7R2ftapXQ.jpg',
			genre_ids: [35, 18, 10749],
			id: 703,
			original_language: 'en',
			original_title: 'Annie Hall',
			overview: 'Главный герой фильма, работающий комиком, с юмором и иронией рассказывает о своей жизни, о людях, которые его окружают. Он скептически анализирует свои неудачи в личной жизни, в которой было несколько любимых женщин…',
			popularity: 22.718,
			poster_path: '/jj46Biz1WYQZoVZfXxeT9u4XRrS.jpg',
			release_date: '1977-04-19',
			title: 'Энни Холл',
			video: false,
			vote_average: 7.751,
			vote_count: 3806
		},
		],
		total_pages: 9463,
		total_results: 189241
	},
	recommendations: {
		page: 1,
		results: [
			{
				backdrop_path: '/5qfAg7HVX1ZUZCObYCisSI3yz0h.jpg',
				id: 617126,
				title: 'Фантастическая четверка: Первые шаги',
				original_title: 'The Fantastic Four: First Steps',
				overview: 'Действие происходит в кинематографической вселенной Marvel (MCU) и основано на одноименных персонажах комиксов Marvel.',
				poster_path: '/zOiVyH3hJ4e7rEUBLGuinhOonh1.jpg',
				adult: false,
				original_language: 'en',
				genre_ids: [878, 12],
				popularity: 48.521,
				release_date: '2025-07-23',
				video: false,
				vote_average: 0,
				vote_count: 0
			},
			{
				backdrop_path: '/3XVszQSkt1CayHRoDJ0jPPInrku.jpg',
				id: 995775,
				title: 'Presque légal',
				original_title: 'Presque légal',
				overview: '',
				poster_path: '/1ptIHKkLqHSAgGOmlKETodHgDIM.jpg',
				adult: false,
				original_language: 'fr',
				genre_ids: [35],
				popularity: 6.007,
				release_date: '2024-07-17',
				video: false,
				vote_average: 4.3,
				vote_count: 3
			},
		],
		total_pages: 2,
		total_results: 40
	},
	release_dates: {
		results: [
			{
				iso_3166_1: 'AE',
				release_dates: [{
					certification: '',
					descriptors: [],
					iso_639_1: '',
					note: '',
					release_date: '2024-07-25T00:00:00.000Z',
					type: 3
				}]
			},
			{
				iso_3166_1: 'AR',
				release_dates: [{
					certification: '+13',
					descriptors: [],
					iso_639_1: '',
					note: '',
					release_date: '2024-07-25T00:00:00.000Z',
					type: 3
				}]
			}
		]
	},
	reviews: { page: 1, results: [], total_pages: 0, total_results: 0 },
};

export const moviesData: ListsResponse<MovieResponse> = {
	page: 1,
	total_pages: 100,
	total_results: 16487,
	results: [{
		adult: false,
		backdrop_path: '/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg',
		id: 1022789,
		original_language: 'en',
		original_title: 'Inside Out 2',
		overview: 'Головной отдел мозга Райли внезапно подвергается капитальному ремонту в тот момент, когда необходимо освободить место для чего-то совершенно неожиданного: новых эмоций.\r Радость, Печаль, Гнев, Страх и Брезгливость, которые уже давно успешно руководят эмоциональными процессами, не знают, что и чувствовать, когда появляется некая… Тревожность. И похоже, не только она.',
		poster_path: '/5fXrqBIvatwSuph7nTuSETBQYxm.jpg',
		popularity: 100,
		genre_ids: [35, 80],
		release_date: '2024-06-11',
		title: 'Головоломка 2',
		video: false,
		vote_average: 7.63,
		vote_count: 2255
	}]
}