import type { IncomingMessage, ServerResponse } from 'http';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from 'next/app';
import type { AppContext, AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { refreshAccessToken } from '@/shared/apis/auth/refreshAccessToken';
import ConfirmProvider from '@/shared/components/ConfirmProvider';
import CustomHead from '@/shared/components/CustomHead';
import { queryClient as sullogQueryClient } from '@/shared/configs/reactQuery';
import '@/assets/styles/index.scss';
import { usePageLoading } from '@/shared/hooks/usePageLoading';
import * as gtag from '@/shared/libs/gtags';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from '@/shared/utils/auth';

const Loading = dynamic(() => import('@/shared/components/Loading'));

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
  const { isPageLoading } = usePageLoading();
  gtag.useGtag();

  useEffect(() => {
    if (tokens?.accessToken) {
      setAccessToken(tokens.accessToken);
    }
  }, [tokens]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
        }}
      />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ConfirmProvider>
            <CustomHead />
            {isPageLoading ? <Loading /> : <Component {...pageProps} />}
          </ConfirmProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
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
  console.log('2', refreshToken);

  if (pathname !== '/login' && !refreshToken) {
    console.log('3');
    goToLogin(res);
    return {};
  }

  let tokens: SullogAppProps['tokens'];
  if (refreshToken) {
    console.log('4', tokens);
    try {
      await refreshAccessToken(ctx);
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken({ req, res });
      console.log('5', accessToken, refreshToken);

      if (!accessToken || !refreshToken) {
        console.log('6');
        goToLogin(res);
        return {};
      }

      tokens = {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log('7', error);
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
