module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  async webpackFinal(config) {
    // 스토리북에서 svg import가 기본 file-loader로 설정되어있기 때문에 이 부분 제거
    const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
  docs: {
    autodocs: true
  }
};