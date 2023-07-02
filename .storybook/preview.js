import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/shared/configs/reactQuery';
import ConfirmProvider from '@/shared/components/ConfirmProvider';
import '@styles/index.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <style>
        {`
          body {
            height: 100%;
            padding: 0 !important;
            background-color: white;
          }

          /** docs 스토리북 내부 폰트가 스토리북 기본 폰트인 'Nunito sans'로 덮어 씌워지는 문제로 인해 별도 선언 */
          .docs-story {
            font-family: 'Noto Sans KR', sans-serif;
          }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <ConfirmProvider>
          <Story />
        </ConfirmProvider>
      </QueryClientProvider>
    </>
  ),
];
