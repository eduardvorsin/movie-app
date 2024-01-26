import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-styling';
import '../src/app/globals.css';
import i18next from '../src/i18n/client';
import { Suspense, useEffect } from 'react';
import React from 'react';
import { I18nextProvider } from 'react-i18next';

const withI18next = (Story, context) => {
  const { locale } = context.globals;

  useEffect(() => {
    i18next.changeLanguage(locale);
  }, [locale]);

  console.log('i18next.language', i18next.language);

  return (
    <Suspense fallback={<div> Loading....</div>}>
      <I18nextProvider i18n={i18next}>
        <Story />
      </I18nextProvider>
    </Suspense>
  )
};

const preview: Preview = {
  globalTypes: {
    locale: {
      defaultValue: 'en',
      description: 'Internationalization locale',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ru', title: 'Russian' },
        ],
        dynamicTitle: true,
      }
    },
  },
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
    withI18next,
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

