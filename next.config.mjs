/** @type {import('next').NextConfig} */
import withPlaiceholder from '@plaiceholder/next';

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
				pathname: '/t/p/**',
			},
			{
				protocol: 'https',
				hostname: 'i.ytimg.com',
				pathname: '/vi_webp/**',
			},
		],
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.('.svg'),
		)

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				resourceQuery: { not: /url/ },
				use: ['@svgr/webpack'],
			},
		)
		fileLoaderRule.exclude = /\.svg$/i;
		return config;
	},
}

export default withPlaiceholder(nextConfig);