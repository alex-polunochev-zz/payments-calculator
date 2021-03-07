import { useEffect } from 'react';

import '../styles/globals.css';
import { ContextProvider } from '../src/provider/ContextProvider';

function MyApp({ Component, pageProps }) {
  // see notes in _document.js regarding the SSR for Material-UI
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
