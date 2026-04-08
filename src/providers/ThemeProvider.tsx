'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'dark-synth' | 'dark' | 'light' | 'ms-access-2010';

const STORAGE_KEY = 'cpt-theme';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (nextTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const isValidTheme = (value: string | null): value is Theme =>
  value === 'dark-synth' || value === 'dark' || value === 'light' || value === 'ms-access-2010';

const parseStoredTheme = (value: string | null): Theme => {
  return isValidTheme(value) ? value : 'dark-synth';
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'dark-synth';
    }

    return parseStoredTheme(window.localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};

export const THEME_OPTIONS: Array<{ label: string; value: Theme }> = [
  { label: 'Dark Synth', value: 'dark-synth' },
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
  { label: 'MS Access 2010', value: 'ms-access-2010' },
];
