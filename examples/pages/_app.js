import { useEffect } from 'react';
import setScrollbarWidth from 'set-scrollbar-width';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setScrollbarWidth();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
