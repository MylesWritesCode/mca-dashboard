import { SessionProvider } from "next-auth/react";

import { Layout } from "ui";

import { MENU_ITEMS } from "../config";
import "../styles/global.scss";

import { HEADER_CONFIG } from "@/config/HeaderConfig";

export default function App({ Component, pageProps, session }: any) {
  return (
    <SessionProvider session={session}>
      <Layout
        menuItems={MENU_ITEMS}
        headerItems={HEADER_CONFIG[session ? "signedIn" : "signedOut"]}
        sx={{ background: "var(--pewter-blue)" }}
      >
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
