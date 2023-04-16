import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import { queryClient } from '@/shared/configs/reactQuery';
import '@/assets/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
