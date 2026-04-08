'use client';

import { PrimeReactProvider as Provider } from 'primereact/api';
import type { ReactNode } from 'react';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

interface PrimeReactProviderProps {
  children: ReactNode;
}

export const PrimeReactProvider = ({ children }: PrimeReactProviderProps) => {
  return <Provider>{children}</Provider>;
};
