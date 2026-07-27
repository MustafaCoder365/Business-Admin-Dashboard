import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { CurrencyProvider } from './context/CurrencyContext';
import Layout from './components/Layout';

export default function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <ToastProvider>
          <HashRouter>
            <Layout />
          </HashRouter>
        </ToastProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
