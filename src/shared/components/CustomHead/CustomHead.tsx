import Head from 'next/head';

const CustomHead = () => {
  return (
    <Head>
      {/* HTML Meta Tags */}
      <title>Sullog</title>
      <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content="https://sullog-client.vercel.app" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Sullog" />
      <meta property="og:description" content="전통주를 기록하다" />
      <meta property="og:image" content="og_image.png" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="og_image.png" />
      <meta
        property="twitter:domain"
        content="https://sullog-client.vercel.app"
      />
      <meta property="twitter:url" content="https://sullog-client.vercel.app" />
      <meta name="twitter:title" content="Sullog" />
      <meta name="twitter:description" content="전통주를 기록하다" />
      <meta name="twitter:image" content="og_image.png" />
    </Head>
  );
};

export default CustomHead;
