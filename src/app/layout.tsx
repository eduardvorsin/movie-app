import { inter } from '@/fonts';
import './globals.css';
import type { Metadata } from 'next';
import { dir } from 'i18next';
import { fallbackLng } from '@/i18n/settings';
import ThemeProvider from '@/context/ThemeProvider/ThemeProvider';
import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: Props) {
  return (
    <html
      lang={fallbackLng}
      dir={dir(fallbackLng)}
      className={`${inter.variable}`}
      suppressHydrationWarning
    >
      <body className='bg-neutral-200 dark:bg-dark-neutral-100'>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </body>
    </html>
  )
}
