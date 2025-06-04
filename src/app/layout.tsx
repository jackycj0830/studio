
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppLayout } from '@/components/layout/app-layout';
import { I18nProviderClient } from '@/locales/client';
import { i18nConfig, type Locale } from '@/locales/config';
import { getI18n } from '@/locales/server';
import React from 'react';

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  // next-international automatically sets the locale for server components based on the path
  const t = await getI18n();
  return {
    title: t('app.title'),
    description: t('app.description'),
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map(l => ({ locale: l }));
}

export default function RootLayout({
  children,
  params // Access params directly
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string }; // locale can be undefined
}>) {
  const localeFromParams = params.locale;

  // Determine the resolved locale, falling back to default if necessary
  const resolvedLocale: Locale = (localeFromParams && i18nConfig.locales.includes(localeFromParams as Locale))
    ? localeFromParams as Locale
    : i18nConfig.defaultLocale;

  return (
    <html lang={resolvedLocale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <I18nProviderClient locale={resolvedLocale} key={resolvedLocale}>
          <AppLayout>{children}</AppLayout>
          <Toaster />
        </I18nProviderClient>
      </body>
    </html>
  );
}
