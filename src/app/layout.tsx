import { inter } from '@/fonts';
import './globals.css';
import type { Metadata } from 'next';
import { dir } from 'i18next';
import { fallbackLng } from '@/i18n/settings';
import ThemeProvider from '@/context/ThemeProvider/ThemeProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { cookies, headers } from 'next/headers';

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
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: Props) {
  const langFromCookie = cookies().get('i18next')?.value;
  const langFromHeaders = headers().get('accept-language')?.slice(0, 2);
  const currentLang = langFromCookie ?? langFromHeaders ?? fallbackLng;

  return (
    <html
      lang={currentLang}
      dir={dir(currentLang)}
      className={`${inter.variable} h-full pr-[var(--scrollbar-width)]`}
      suppressHydrationWarning
    >
      <body className='bg-neutral-200 dark:bg-dark-neutral-100 h-full flex flex-col'>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
