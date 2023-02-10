import { mapoFlowerIsland } from '@/assets/styles/fonts';
import type { AppProps } from 'next/app';

import '@/assets/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --mapo-flower-island-font: ${mapoFlowerIsland.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
