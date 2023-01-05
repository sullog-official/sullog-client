import type { AppProps } from 'next/app';

import '../assets/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
