import localFont from '@next/font/local';

export const mapoFlowerIsland = localFont({
  src: [
    {
      path: './MapoFlowerIsland.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--mapo-flower-island-font',
});
