import type { IncomingMessage, ServerResponse } from 'http';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from 'next/app';
import type { AppContext, AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import { refreshAccessToken } from '@/shared/apis/auth/refreshAccessToken';
import ConfirmProvider from '@/shared/components/ConfirmProvider';
import { queryClient as sullogQueryClient } from '@/shared/configs/reactQuery';
import '@/assets/styles/index.scss';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from '@/shared/utils/auth';

type SullogAppProps = AppProps & {
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
};

export default function SullogApp({
  Component,
  pageProps,
  tokens,
}: SullogAppProps) {
  const [queryClient] = useState(() => sullogQueryClient);

  useEffect(() => {
    if (tokens?.accessToken) {
      setAccessToken(tokens.accessToken);
    }
  }, [tokens]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ConfirmProvider>
          <Component {...pageProps} />
        </ConfirmProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

const goToLogin = (res: ServerResponse<IncomingMessage> | undefined) => {
  res?.writeHead(307, { location: `/login` });
  res?.end();
};

SullogApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const { req, res, pathname } = ctx;

  const refreshToken = getRefreshToken({ req, res });

  if (pathname !== '/login' && !refreshToken) {
    goToLogin(res);
    return {};
  }

  let tokens: SullogAppProps['tokens'];
  if (refreshToken) {
    try {
      await refreshAccessToken(ctx);
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken({ req, res });

      if (!accessToken || !refreshToken) {
        goToLogin(res);
        return {};
      }

      tokens = {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      goToLogin(res);
      return {};
    }
  }

  const pageProps = await App.getInitialProps(appContext);

  return {
    ...pageProps,
    tokens,
  };
};
