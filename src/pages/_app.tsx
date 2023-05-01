import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';

import { queryClient as sullogQueryClient } from '@/shared/configs/reactQuery';

import '@/assets/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => sullogQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
