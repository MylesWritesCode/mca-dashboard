import { AppProps } from 'next/app';

import { MENU_ITEMS } from "../config";
import Layout from "ui/components/Layout";

export default function App({ Component, pageProps }: any) {
  

  return (
    <Layout menuItems={MENU_ITEMS}>
      <Component {...pageProps} />
    </Layout>
  );
}
