import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-styling';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1d2125',
        }
      ],
    },
    nextjs: {
      appDirectory: true,
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;

//! задать потом basePath для мока next router https://storybook.js.org/blog/integrate-nextjs-and-storybook-automatically/#:~:text=all%20available%20parameters.-,next/router,-Within%20the
