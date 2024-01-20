import { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-styling',
      options: {},
    },
    "@storybook/addon-mdx-gfm"
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  previewHead: (head) => `
  ${head}
  <style>
  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400 500 600 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2) format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400 500 600 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa0ZL7SUc.woff2) format("woff2");
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }

  :root{
    --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Helvetica Neue, sans-serif
  }
  </style>
`,

  webpackFinal: (config) => {
    //@ts-expect-error
    const fileLoaderRule = config.module.rules.find((rule) => {
      //@ts-expect-error
      return rule.test?.test?.('.svg');
    });
    //@ts-expect-error
    config.module.rules.push(
      {
        //@ts-expect-error
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
    //@ts-expect-error
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};
export default config;