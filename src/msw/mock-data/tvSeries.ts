import { TVSeriesSeasonDetails } from '@/services/fetchSeasonsForTVSeries/fetchSeasonsForTVSeries';
import { TVSeriesDetails } from '@/services/fetchTVSeries/fetchTVSeries';
import { TVSeriesResponse, ListsResponse } from '@/services/types';

export const tvSeriesDetailsData: TVSeriesDetails = {
	backdrop_path: '/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg',
	episode_run_time: [],
	first_air_date: '2022-08-21',
	genres: [
		{
			id: '10765',
			name: 'Sci-Fi & Fantasy'
		},
		{
			id: '18',
			name: 'Drama'
		},
		{
			id: '10759',
			name: 'Action & Adventure'
		}
	],
	homepage: 'https://www.hbo.com/house-of-the-dragon',
	id: 94997,
	in_production: true,
	languages: [
		'en'
	],
	last_air_date: '2024-08-04',
	last_episode_to_air: {
		id: 5234730,
		name: 'The Queen Who Ever Was',
		overview: 'As Aemond becomes more volatile, Larys plots an escape, and Alicent grows more concerned about Helaena\'s safety. Flush with new power, Rhaenyra looks to press her advantage.',
		vote_average: 6.9,
		vote_count: 20,
		air_date: '2024-08-04',
		episode_number: 8,
		production_code: '',
		runtime: 70,
		season_number: 2,
		show_id: 94997,
		still_path: '/1XuMwNuO3BKUXFCQCOoC4qcdvKi.jpg'
	},
	next_episode_to_air: null,
	name: 'House of the Dragon',
	number_of_episodes: 18,
	number_of_seasons: 2,
	origin_country: [
		'US'
	],
	original_language: 'en',
	original_name: 'House of the Dragon',
	overview: 'The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.',
	poster_path: '/oxmdHR5Ka28HAJuMmS2hk5K6QQY.jpg',
	production_companies: [
		{
			id: '3268',
			logo_path: '/tuomPhY2UtuPTqqFnKMVHvSb724.png',
			name: 'HBO',
			origin_country: 'US'
		},
	],
	production_countries: [
		{
			iso_3166_1: 'US',
			name: 'United States of America'
		}
	],
	seasons: [
		{
			air_date: '2022-08-21',
			episode_count: 53,
			id: 309556,
			name: 'Specials',
			overview: '',
			poster_path: '/qVU4112Ob2ikHBu4VRC50MdWZcM.jpg',
			season_number: 0,
			vote_average: 0
		},
		{
			air_date: '2022-08-20',
			episode_count: 10,
			id: 134965,
			name: 'Season 1',
			overview: '',
			poster_path: '/m7ta0kNg2ONvnBFF76miVvbWK1V.jpg',
			season_number: 1,
			vote_average: 8
		},
		{
			air_date: '2024-06-16',
			episode_count: 8,
			id: 368014,
			name: 'Season 2',
			overview: '',
			poster_path: '/xhjADf5sslq7lbRjc50FgvIYIkT.jpg',
			season_number: 2,
			vote_average: 7.9
		}
	],
	status: 'Returning Series',
	tagline: 'All must choose.',
	type: 'Scripted',
	vote_average: 8.403,
	vote_count: 4748,
	external_ids: {
		imdb_id: 'tt11198330',
		facebook_id: 'houseofthedragon',
		instagram_id: 'houseofthedragonhbo',
		twitter_id: 'HouseofDragon',
		youtube_id: '',
		tiktok_id: '',
	},
	aggregate_credits: {
		cast: [
			{
				adult: false,
				gender: 2,
				id: 136532,
				known_for_department: 'Acting',
				name: 'Matt Smith',
				original_name: 'Matt Smith',
				popularity: 40.532,
				profile_path: '/b3AYe7kkImkB35CoYwlUqHnJGF8.jpg',
				roles: [
					{
						credit_id: '6352ee17a843c10091b281ff',
						character: 'Prince Daemon Targaryen',
						episode_count: 18
					}
				],
			},
			{
				adult: false,
				gender: 2,
				id: 2583704,
				known_for_department: 'Acting',
				name: 'Fabien Frankel',
				original_name: 'Fabien Frankel',
				popularity: 22.812,
				profile_path: '/wuNnl8PNlC74jkEeX5TZzL4v83r.jpg',
				roles: [
					{
						credit_id: '633a98a5481382007aa0011d',
						character: 'Ser Criston Cole',
						episode_count: 16
					}
				],
			},
		],
		crew: [
			{
				adult: false,
				gender: 2,
				id: 1253,
				known_for_department: 'Art',
				name: 'Jim Clay',
				original_name: 'Jim Clay',
				popularity: 4.264,
				profile_path: null,
				jobs: [
					{
						credit_id: '6301d2a9839d93008b6138d7',
						job: 'Production Design',
						episode_count: 18
					}
				],
				department: 'Art',
			},
			{
				adult: false,
				gender: 2,
				id: 2230759,
				known_for_department: 'Art',
				name: 'Rob Bliss',
				original_name: 'Rob Bliss',
				popularity: 3.192,
				profile_path: null,
				jobs: [
					{
						credit_id: '65b315c696386401850f37b0',
						job: 'Concept Artist',
						episode_count: 10
					}
				],
				department: 'Art',
			},
		]
	},
	similar: {
		page: 1,
		results: [
			{
				backdrop_path: '/JrBiUtR2CwxZR5GMK5Z9dU7Wr4.jpg',
				genre_ids: [
					10765,
					10759,
					18
				],
				id: 19,
				origin_country: [
					'US'
				],
				original_language: 'en',
				original_name: 'Planet of the Apes',
				overview: 'Two astronauts and a sympathetic chimp friend are fugitives in a future Earth dominated by a civilization of humanoid apes. \n\nBased on the 1968 Planet of the Apes film and its sequels, which were inspired by the novel of the same name by Pierre Boulle.',
				popularity: 42.794,
				poster_path: '/zxo5Vrd0oXgm9ZCz4r7Q3L8veWg.jpg',
				first_air_date: '1974-09-13',
				name: 'Planet of the Apes',
				vote_average: 7,
				vote_count: 76
			},
			{

				backdrop_path: '/aL61AksMPai6JdRdvwrOZ77n7pT.jpg',
				genre_ids: [
					18,
					10765
				],
				id: 210596,
				origin_country: [
					'CN'
				],
				original_language: 'zh',
				original_name: '重紫',
				overview: 'About the romance between Chong Zi, a pure and kind girl cursed with an ill fate; and her teacher Luo Yinfan, an immortal who takes it upon himself to protect the world.',
				popularity: 74.466,
				poster_path: '/4qvIp4Yxl8DDNR4Nce2uSlfole5.jpg',
				first_air_date: '2023-02-15',
				name: 'The Journey of Chongzi',
				vote_average: 6.4,
				vote_count: 5
			},
		],
		total_pages: 2260,
		total_results: 45187
	},
	recommendations: {
		page: 1,
		results: [
			{
				backdrop_path: '/qBppESpY8e97WfPWVZiU0JdRXw.jpg',
				id: 84773,
				name: 'The Lord of the Ring: The Rings of Power',
				original_name: 'The Lord of the Ring: The Rings of Power',
				overview: 'Beginning in a time of relative peace, we follow an ensemble cast of characters as they confront the re-emergence of evil to Middle-earth. From the darkest depths of the Misty Mountains, to the majestic forests of Lindon, to the breathtaking island kingdom of Númenor, to the furthest reaches of the map, these kingdoms and characters will carve out legacies that live on long after they are gone.',
				poster_path: '/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg',
				original_language: 'en',
				genre_ids: [
					10759,
					10765,
					18
				],
				popularity: 250.382,
				first_air_date: '2022-09-01',
				vote_average: 7.35,
				vote_count: 2584,
				origin_country: [
					'US'
				]
			},
			{
				backdrop_path: '/ajztm40qDPqMONaSJhQ2PaNe2Xd.jpg',
				id: 83867,
				name: 'Star War: Andor',
				original_name: 'Star War: Andor',
				overview: 'In an era filled with danger, deception and intrigue, Cassian Andor will discover the difference he can make in the struggle against the tyrannical Galactic Empire. He embarks on a path that is destined to turn him into a rebel hero.',
				poster_path: '/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg',
				original_language: 'en',
				genre_ids: [
					10765,
					10759,
					18
				],
				popularity: 89.296,
				first_air_date: '2022-09-21',
				vote_average: 8.233,
				vote_count: 1139,
				origin_country: [
					'US'
				]
			},
		],
		total_pages: 2,
		total_results: 40
	},
	reviews: {
		page: 1,
		results: [
			{
				author: 'Zugifilmofil',
				author_details: {
					name: '',
					username: 'Zugifilmofil',
					avatar_path: null,
					rating: 5
				},
				content: 'Far cry from original series. Studios are squeezing money as much as they can I guess. Worse script, worse acting...\r\nIt\'s just OK to watch and in my opinion it has far better rating than it deserves.',
				created_at: '2022-10-17T18:35:29.424Z',
				id: '634da071d6dbba007aa73f39',
				updated_at: '2022-10-20T17:22:42.307Z',
				url: 'https://www.themoviedb.org/review/634da071d6dbba007aa73f39'
			},
			{
				author: 'rsanek',
				author_details: {
					name: '',
					username: 'rsanek',
					avatar_path: null,
					rating: 7
				},
				content: 'I do think it\'s a good show, but I didn\'t find myself drawn to it, even as a big Game of Thrones fan back in the day. Maybe I\'m just over fantasy right now.',
				created_at: '2024-08-09T14:05:12.946Z',
				id: '66b62218ecc808bbc9c5ee54',
				updated_at: '2024-08-09T14:05:13.024Z',
				url: 'https://www.themoviedb.org/review/66b62218ecc808bbc9c5ee54'
			}
		],
		total_pages: 1,
		total_results: 2
	},
	content_ratings: {
		id: 123,
		results: [
			{
				descriptors: [],
				iso_3166_1: 'US',
				rating: 'TV-MA'
			},
		]
	}
};

export const tvSeriesSeasonsData: TVSeriesSeasonDetails = {
	_id: '5db952cca1d3320014e91171',
	air_date: '2022-08-20',
	episodes: [
		{
			air_date: '2022-08-21',
			episode_number: 1,
			episode_type: 'standard',
			id: 1971015,
			name: 'The Heirs of the Dragon',
			overview: 'Viserys hosts a tournament to celebrate the birth of his second child. Rhaenyra welcomes her uncle Daemon back to the Red Keep.',
			production_code: '',
			runtime: 66,
			season_number: 1,
			show_id: 94997,
			still_path: '/3oumSnkavc4pcMFvPbgWDUTclNb.jpg',
			vote_average: 7.9,
			vote_count: 152,
			crew: [{
				job: 'Writer',
				department: 'Writing',
				adult: false,
				gender: 2,
				id: 1167458,
				known_for_department: 'Writing',
				name: 'Ryan Condal',
				original_name: 'Ryan Condal',
				popularity: 8.782,
				profile_path: '/1TGRIEArYHB7TD40HHYiRkwTHLX.jpg'
			},
			{
				job: 'Director',
				department: 'Directing',
				adult: false,
				gender: 2,
				id: 114404,
				known_for_department: 'Directing',
				name: 'Miguel Sapochnik',
				original_name: 'Miguel Sapochnik',
				popularity: 13.825,
				profile_path: '/jlZGTjiifvvFDoEtlwrKz7QxuJS.jpg'
			}],
			guest_stars: [{
				character: 'Ser Harrold Westerling',
				adult: false,
				gender: 2,
				id: 95047,
				known_for_department: 'Acting',
				name: 'Graham McTavish',
				original_name: 'Graham McTavish',
				popularity: 19.881,
				profile_path: '/9IjPwv7Vb4QygA1cPSX179oqjsT.jpg'
			},
			{
				character: 'Queen Aemma Arryn',
				adult: false,
				gender: 1,
				id: 1237956,
				known_for_department: 'Acting',
				name: 'Sian Brooke',
				original_name: 'Sian Brooke',
				popularity: 16.711,
				profile_path: '/99mPsHpcFoUqhXNHsPVL5qD8nN2.jpg'
			}]
		},
	],
	name: 'Season 1',
	overview: '',
	id: 134965,
	poster_path: '/m7ta0kNg2ONvnBFF76miVvbWK1V.jpg',
	season_number: 1,
	vote_average: 8
};

export const tvSeriesData: ListsResponse<TVSeriesResponse> = {
	page: 1,
	results: [
		{
			backdrop_path: '/uCY1j1YqfDWRbbS7hJwd9szX1sJ.jpg',
			genre_ids: [
				10766,
				18,
				35
			],
			id: 237480,
			origin_country: [
				'BR'
			],
			original_language: 'pt',
			original_name: 'No Rancho Fundo',
			overview: '',
			popularity: 3323.756,
			poster_path: '/eONkvEahSQJan1HTzWJKjvaMe29.jpg',
			first_air_date: '2024-04-15',
			name: 'No Rancho Fundo',
			vote_average: 4.9,
			vote_count: 17
		},
		{
			backdrop_path: '/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg',
			genre_ids: [
				10765,
				18,
				10759
			],
			id: 94997,
			origin_country: [
				'US'
			],
			original_language: 'en',
			original_name: 'House of the Dragon',
			overview: 'The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.',
			popularity: 2155.41,
			poster_path: '/oxmdHR5Ka28HAJuMmS2hk5K6QQY.jpg',
			first_air_date: '2022-08-21',
			name: 'House of the Dragon',
			vote_average: 8.403,
			vote_count: 4750
		},
	],
	total_pages: 8905,
	total_results: 178100
};