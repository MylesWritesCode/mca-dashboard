import { AppProps } from 'next/app';
import { MENU_ITEMS } from "../config";

import { Layout } from "ui";

// @todo Hacky for now. Layout children type is wrong. The args for this 
//       component is of type AppProps. 
export default function App({ Component, pageProps }: any) {
  return (
    <Layout menuItems={MENU_ITEMS} sx={{ background: "var(--pewter-blue)" }}>
      <Component {...pageProps} />
    </Layout>
  );
}
