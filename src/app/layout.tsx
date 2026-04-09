import type { Metadata } from 'next';
import Script from 'next/script';

import { Providers } from '@/providers';

/* No global Prime theme: we drive colors via html[data-theme] + primereact-overrides.scss.
   A preset theme (e.g. lara-dark-blue) hardcodes dark dropdown overlays and :root color-scheme. */
import './main.scss';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cpt-date-calc.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CPT Date Calculator',
    template: '%s | CPT Date Calculator',
  },
  description: 'CPT Date Calculator for timezone-aware date differences and add/subtract planning.',
  applicationName: 'CPT Date Calculator',
  authors: [{ name: 'CPT Group' }],
  creator: 'CPT Group',
  publisher: 'CPT Group',
  openGraph: {
    type: 'website',
    siteName: 'CPT Date Calculator',
    title: 'CPT Date Calculator',
    description: 'Timezone-aware date calculations for planning and collaboration.',
    url: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/CPTGroupLogo.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.svg'],
    apple: [{ url: '/CPTGroupLogo.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark-synth">
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var valid = ['dark-synth', 'dark', 'light', 'ms-access-2010'];
                  var stored = localStorage.getItem('cpt-theme');
                  var theme = (stored && valid.indexOf(stored) >= 0) ? stored : 'dark-synth';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (stored !== theme) {
                    localStorage.setItem('cpt-theme', theme);
                  }
                } catch (error) {}
              })();
            `,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
