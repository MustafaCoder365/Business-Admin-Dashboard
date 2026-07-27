import { useEffect, useMemo, useState } from 'react';
import { CurrencyContext } from './currency-context';
import { CURRENCIES } from '../data/currencies';

const STORAGE_KEY = 'dashboard-currency';

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'USD';
    } catch {
      return 'USD';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, currency);
    } catch {
      // ignore storage errors
    }
  }, [currency]);

  const format = useMemo(() => {
    const meta = CURRENCIES[currency] || CURRENCIES.USD;
    return (amount) => {
      try {
        return new Intl.NumberFormat(meta.locale, {
          style: 'currency',
          currency,
          maximumFractionDigits: 2,
        }).format(amount);
      } catch {
        return `${meta.symbol}${Number(amount).toFixed(2)}`;
      }
    };
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}
