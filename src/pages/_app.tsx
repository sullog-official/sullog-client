import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextPageContext } from 'next';
import App from 'next/app';
import type { AppContext, AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import ConfirmProvider from '@/shared/components/ConfirmProvider';
import CustomHead from '@/shared/components/CustomHead';
import { queryClient as sullogQueryClient } from '@/shared/configs/reactQuery';
import '@/assets/styles/index.scss';
import { NEXT_PUBLIC_TEST_USER_TOKEN } from '@/shared/constants';
import { usePageLoading } from '@/shared/hooks/usePageLoading';
import * as gtag from '@/shared/libs/gtags';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/shared/utils/auth';

const Loading = dynamic(() => import('@/shared/components/Loading'));

type SullogAppProps = AppProps & {
  accessToken?: string;
};

export default function SullogApp({
  Component,
  pageProps,
  accessToken,
}: SullogAppProps) {
  const [queryClient] = useState(() => sullogQueryClient);
  const { isPageLoading } = usePageLoading();
  gtag.useGtag();

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [accessToken]);

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

const setTestUserTokens = ({ req, res }: NextPageContext) => {
  if (process.env.NODE_ENV === 'development' && NEXT_PUBLIC_TEST_USER_TOKEN) {
    setAccessToken(NEXT_PUBLIC_TEST_USER_TOKEN, { req, res });
    setRefreshToken(NEXT_PUBLIC_TEST_USER_TOKEN, { req, res });
  }
};

SullogApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const { req, res, pathname } = ctx;

  setTestUserTokens(ctx);

  const accessToken = getAccessToken({ req, res });
  const refreshToken = getRefreshToken({ req, res });

  if (pathname !== '/login' && !accessToken && !refreshToken) {
    res?.writeHead(307, { location: `/login` });
    res?.end();
    return {};
  }

  const pageProps = await App.getInitialProps(appContext);

  return {
    ...pageProps,
    accessToken,
  };
};
