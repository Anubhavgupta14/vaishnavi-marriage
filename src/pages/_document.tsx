import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Join us for the wedding celebration of Vaishnavi & Sumeet on May 8th, 2026 at Sanskar Banquet Hall, Pune."
        />
        <meta property="og:title" content="Vaishnavi & Sumeet — Wedding Celebration" />
        <meta
          property="og:description"
          content="We cordially invite you to join our wedding. May 8th, 2026 · Sanskar Banquet Hall, Pune."
        />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
