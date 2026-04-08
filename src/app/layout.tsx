import type { Metadata } from 'next';
import Script from 'next/script';

import { Providers } from '@/providers';

import 'primereact/resources/themes/lara-dark-blue/theme.css';
import './main.scss';

export const metadata: Metadata = {
  title: 'Date Calculator',
  description: 'Date Calculator scaffold',
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
