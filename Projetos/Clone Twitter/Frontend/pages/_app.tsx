import Layout from '~/components/layout';
import '~/css/tailwind.css';
import '~/css/main.css';
import Head from 'next/head';

import RouteGuard from '~/components/route-guard/route-guard.component';

export default function MyApp({ pageProps, Component }: any) {
  const { hideLayout } = Component;
  return (
    <Layout hideLayout={hideLayout}>
      <Head>
        <title>Twitter</title>
      </Head>

      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </Layout>
  );
}
