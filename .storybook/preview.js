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
        `}
      </style>
      <Story />
    </>
  ),
];
