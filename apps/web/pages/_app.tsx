import { AppProps } from "next/app";
import { MENU_ITEMS } from "../config";
import { SessionProvider } from "next-auth/react";

import { Layout } from "ui";

// @todo Hacky for now. Layout children type is wrong. The args for this
//       component is of type AppProps.
export default function App({ Component, pageProps, session }: any) {
  return (
    <SessionProvider session={session}>
      <Layout menuItems={MENU_ITEMS} sx={{ background: "var(--pewter-blue)" }}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
