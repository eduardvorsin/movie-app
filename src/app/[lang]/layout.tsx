import { inter } from '@/fonts';
import '../globals.css';
import type { Metadata } from 'next';
import { dir } from 'i18next';
import { Locales, locales } from '@/i18n/settings';
import ThemeProvider from '@/context/ThemeProvider/ThemeProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

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

export default function RootLayout({
  children,
  params: { lang },
}: Props) {
  return (
    <html
      lang={lang}
      dir={dir(lang)}
      className={`${inter.variable} h-full pr-[var(--scrollbar-width)]`}
      suppressHydrationWarning
    >
      <body className='bg-neutral-200 dark:bg-dark-neutral-100 h-full flex flex-col transition-colors duration-150'>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
