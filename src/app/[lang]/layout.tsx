import { inter } from '@/fonts';
import './globals.css';
import type { Metadata } from 'next';
import { dir } from 'i18next';
import { Locales, locales } from '@/i18n/settings';
import ThemeProvider from '@/context/ThemeProvider/ThemeProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { fetchTranslation } from '@/i18n/server';

export const metadata: Metadata = {
  title: {
    template: '%s | MovieWander',
    default: 'Page',
  },
  robots: {
    index: false,
  }
}

type Props = {
  children: React.ReactNode,
  params: { lang: Locales },
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: Props) {
  const { t } = await fetchTranslation(lang);

  const logoDictionary = {
    altText: t('logo.altText'),
    linkText: t('logo.linkText'),
  };

  const navigationDictionary = {
    movies: t('navigation.movies'),
    persons: t('navigation.persons'),
    tv: t('navigation.tv'),
    new: t('navigation.new'),
    collections: t('navigation.collections'),
  };

  return (
    <html
      lang={lang}
      dir={dir(lang)}
      className={`${inter.variable} h-full pr-[var(--scrollbar-width)]`}
      suppressHydrationWarning
    >
      <body className='bg-neutral-200 dark:bg-dark-neutral-100 h-full flex flex-col transition-colors duration-150'>
        <ThemeProvider>
          <Header
            dictionary={{
              logo: logoDictionary,
              navigation: navigationDictionary,
              mainSearch: {
                label: t('mainSearch.label'),
                placeholder: t('mainSearch.placeholder'),
                openSearch: t('mainSearch.openSearch'),
                closeSearch: t('mainSearch.closeSearch'),
                autocompleteSearch: {
                  emptyStateText: t('autocompleteSearch.emptyStateText'),
                  emptyStateTitle: t('autocompleteSearch.emptyStateTitle'),
                  search: {
                    button: t('search.button'),
                    clearButton: t('search.clearButton'),
                  }
                }
              },
              userSettingsButton: {
                button: t('userSettingsButton.button'),
                themeTitle: t('userSettingsButton.themeTitle'),
                languageTitle: t('userSettingsButton.languageTitle'),
                languageSelect: { label: t('languageSelect.label') },
                themeToggle: { label: t('themeToggle.label') },
              },
              navigationMenuButton: {
                active: t('navigationMenuButton.active'),
                inactive: t('navigationMenuButton.inactive'),
              }
            }}
          />
          {children}
          <Footer
            dictionary={{
              aboutTitle: t('footer.aboutTitle'),
              description: t('footer.description'),
              sectionsTitle: t('footer.sectionsTitle'),
              basedOnTitle: t('footer.basedOnTitle'),
              logo: logoDictionary,
              navigation: navigationDictionary,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
